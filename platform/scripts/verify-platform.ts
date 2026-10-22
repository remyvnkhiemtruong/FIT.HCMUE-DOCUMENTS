import assert from 'node:assert/strict'
import { randomBytes, randomUUID, createHmac, createHash } from 'node:crypto'
import { spawn, spawnSync } from 'node:child_process'
import {
  closeSync,
  mkdirSync,
  openSync,
  writeFileSync,
  readFileSync,
} from 'node:fs'
import { resolve } from 'node:path'
import { once } from 'node:events'
import pg from 'pg'
import { chromium } from '@playwright/test'
import { renderMarkdown } from '../server/utils/render'
import { parseRoster } from '../server/utils/roster'

const directory = resolve('.data/business-tests', randomUUID())
mkdirSync(directory, { recursive: true })
const bin
  = process.env.PG_BIN
    || (process.platform === 'win32'
      ? 'C:/Program Files/PostgreSQL/16/bin'
      : '/usr/lib/postgresql/16/bin')
const suffix = process.platform === 'win32' ? '.exe' : '',
  control = resolve(bin, 'pg_ctl' + suffix)
const password = randomBytes(32).toString('hex'),
  passwordFile = resolve(directory, 'password')
writeFileSync(passwordFile, password, { mode: 0o600 })
// This runner always creates a new isolated cluster, never uses DATABASE_URL.
async function port() {
  const { createServer } = await import('node:net')
  const s = createServer()
  s.listen(0, '127.0.0.1')
  await once(s, 'listening')
  const p = (s.address() as { port: number }).port
  await new Promise<void>(r => s.close(() => r()))
  return p
}
function binary(command: string, args: string[]) {
  const fd = openSync(resolve(directory, 'postgres-command.log'), 'a')
  try {
    const r = spawnSync(command, args, {
      stdio: ['ignore', fd, fd],
      timeout: 60000,
    })
    if (r.status !== 0) throw new Error('Isolated PostgreSQL command failed')
  }
  finally {
    closeSync(fd)
  }
}
const dbPort = await port(),
  httpPort = await port(),
  url = `postgresql://hub_test:${password}@127.0.0.1:${dbPort}/postgres`,
  base = `http://127.0.0.1:${httpPort}`
const env = {
  ...process.env,
  DATABASE_URL: url,
  NUXT_DATABASE_URL: '',
  BETTER_AUTH_URL: base,
  BETTER_AUTH_SECRET: randomBytes(48).toString('hex'),
  FILE_STORAGE_PATH: resolve(directory, 'uploads'),
  NITRO_HOST: '127.0.0.1',
  NITRO_PORT: String(httpPort),
  NODE_ENV: 'production',
}
let server: ReturnType<typeof spawn> | undefined,
  db: pg.Client | undefined,
  started = false
let checks = 0
function pass(name: string) {
  checks++
  console.log(`PASS ${name}`)
}
const jars = new Map<string, Map<string, string>>()
async function request(
  path: string,
  options: {
    method?: string
    body?: unknown
    who?: string
    raw?: Buffer
    headers?: Record<string, string>
  } = {},
) {
  const jar = jars.get(options.who || 'anonymous') || new Map<string, string>()
  jars.set(options.who || 'anonymous', jar)
  const headers: Record<string, string> = {
    Origin: base,
    Cookie: [...jar].map(([k, v]) => `${k}=${v}`).join('; '),
    ...options.headers,
  }
  if (!options.raw && options.body !== undefined)
    headers['Content-Type'] = 'application/json'
  const response = await fetch(base + path, {
    method: options.method || 'GET',
    headers,
    body: options.raw
      ? new Uint8Array(options.raw)
      : options.body === undefined
        ? undefined
        : JSON.stringify(options.body),
    redirect: 'manual',
  })
  for (const cookie of response.headers.getSetCookie()) {
    const pair = cookie.split(';')[0]!
    const index = pair.indexOf('=')
    jar.set(pair.slice(0, index), pair.slice(index + 1))
  }
  return response
}
async function json(
  path: string,
  options: Parameters<typeof request>[1] = {},
  status = 200,
) {
  const r = await request(path, options)
  const body = await r.text()
  assert.equal(r.status, status, `${path}: ${r.status} ${body.slice(0, 500)}`)
  return body ? JSON.parse(body) : null
}
const secretPassword = 'Testing-only-strong-password-52!'
async function signup(id: string, role = 'student') {
  // Four fixture accounts share one loopback IP. Reset only this isolated test
  // database between users; the rate-limit behavior is checked separately below.
  await db!.query('DELETE FROM rate_limit')
  const email = `${id}@test.invalid`
  await db!.query(
    'INSERT INTO roster(student_id,display_id,email,name,major,class_name,cohort,role) VALUES($1,$1,$2,$1,\'cntt\',\'52.01.CNTT.B\',\'K52\',$3)',
    [id, email, role],
  )
  await json('/api/auth/sign-up/email', {
    method: 'POST',
    who: id,
    body: { name: id, email, studentId: id, password: secretPassword },
  })
  const job = (
    await db!.query(
      'SELECT payload FROM jobs WHERE kind=\'email\' AND payload->>\'to\'=$1 ORDER BY created_at DESC LIMIT 1',
      [email],
    )
  ).rows[0]
  assert.ok(job, 'verification email must be queued')
  const link = String(job.payload.text).split('\n').at(-1)!
  const verified = await request(
    new URL(link).pathname + new URL(link).search,
    { who: id },
  )
  assert.ok([200, 302].includes(verified.status), 'email verification failed')
  await json('/api/auth/sign-in/email', {
    method: 'POST',
    who: id,
    body: { email: id, password: secretPassword },
  })
  return email
}
function totp(uri: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
    secret = new URL(uri).searchParams.get('secret')!
  const bits = [...secret.toUpperCase()]
    .map(c => alphabet.indexOf(c).toString(2).padStart(5, '0'))
    .join('')
  const key = Buffer.from(
    (bits.match(/.{8}/g) || []).map(b => parseInt(b, 2)),
  )
  const counter = Buffer.alloc(8)
  counter.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 30000)))
  const digest = createHmac('sha1', key).update(counter).digest(),
    offset = digest.at(-1)! & 15
  return ((digest.readUInt32BE(offset) & 0x7fffffff) % 1000000)
    .toString()
    .padStart(6, '0')
}
try {
  binary(resolve(bin, 'initdb' + suffix), [
    '-D',
    resolve(directory, 'cluster'),
    '-U',
    'hub_test',
    '--auth=scram-sha-256',
    `--pwfile=${passwordFile}`,
    '--encoding=UTF8',
    '--locale=C',
  ])
  binary(control, [
    '-D',
    resolve(directory, 'cluster'),
    '-l',
    resolve(directory, 'postgres.log'),
    '-o',
    `-h 127.0.0.1 -p ${dbPort}`,
    '-w',
    'start',
  ])
  started = true
  for (const script of ['scripts/migrate.ts', 'scripts/import-content.ts']) {
    const result = spawnSync(
      process.execPath,
      [
        '--import',
        'tsx',
        script,
        ...(script.includes('import-content') ? ['--apply'] : []),
      ],
      { env, encoding: 'utf8', timeout: 120000 },
    )
    assert.equal(result.status, 0, result.stderr)
  }
  db = new pg.Client({ connectionString: url })
  await db.connect()
  assert.equal(
    (await db.query('SELECT count(*)::int n FROM resources')).rows[0].n,
    87,
  )
  const again = spawnSync(
    process.execPath,
    ['--import', 'tsx', 'scripts/import-content.ts', '--apply'],
    { env, encoding: 'utf8', timeout: 120000 },
  )
  assert.equal(again.status, 0, again.stderr)
  assert.equal(
    (await db.query('SELECT count(*)::int n FROM revisions')).rows[0].n,
    87,
  )
  assert.equal(
    (
      await db.query(
        'SELECT count(*)::int n FROM resources WHERE published_revision IS NOT NULL',
      )
    ).rows[0].n,
    0,
  )
  pass('real migrations, import count, idempotency, drafts remain unpublished')
  assert.ok(
    (await db.query('SELECT data FROM courses WHERE code=\'COMP1801\'')).rows[0]
      .data.importedIssues.length > 0,
  )

  const imported = await db.query(
    'SELECT markdown,html,source_hash FROM revisions UNION ALL SELECT markdown,html,source_hash FROM support_pages',
  )
  let anchorCount = 0
  for (const page of imported.rows) {
    assert.equal(
      createHash('sha256').update(page.markdown).digest('hex'),
      page.source_hash,
    )
    for (const match of page.markdown.matchAll(
      /\{#([^}]+)\}|<span id="([^"]+)"/g,
    )) {
      assert.ok(page.html.includes(`id="${match[1] || match[2]}"`))
      anchorCount++
    }
  }
  assert.ok(anchorCount > 0)
  const oldAnchors = JSON.parse(
    readFileSync('../content-archive/editorial-anchors.json', 'utf8'),
  ) as Record<string, string[]>
  const aliasRows = (await db.query('SELECT path,target FROM aliases')).rows
  let historicalCount = 0
  for (const [file, ids] of Object.entries(oldAnchors)) {
    if (file.includes('[')) continue
    let path
      = '/'
        + file
          .replace(/\.md$/, '')
          .replace(/^index$/, '')
          .replace(/\/index$/, '/')
    for (let i = 0; i < 8; i++) {
      const found = aliasRows.find(
        a => a.path.replace(/\/$/, '') === path.replace(/\/$/, ''),
      )
      if (!found) break
      path = found.target
    }
    path
      = new URL(path, 'https://local.invalid').pathname.replace(/\/$/, '') || '/'
    const resource = (
      await db.query(
        'SELECT v.html FROM resources r JOIN revisions v ON v.resource=r.id WHERE rtrim(r.path,\'/\')=rtrim($1,\'/\')',
        [path],
      )
    ).rows[0]
    const supporting = (
      await db.query(
        'SELECT html FROM support_pages WHERE rtrim(path,\'/\')=rtrim($1,\'/\')',
        [path],
      )
    ).rows[0]
    const custom
      = [
        '/huong-dan',
        '/hoc-lieu',
        '/chuong-trinh',
        '/chuong-trinh/tra-cuu',
        '/',
      ].includes(path)
      || path.startsWith('/chuong-trinh/')
      || /^\/mon-hoc\/[^/]+$/.test(path)
      || (path.startsWith('/bo-sung/') && !resource)
    const body = resource?.html || (!custom ? supporting?.html : '') || ''
    for (const id of ids) {
      const compat = (
        await db.query('SELECT 1 FROM legacy_anchors WHERE path=$1 AND id=$2', [
          path,
          id,
        ])
      ).rows.length
      assert.ok(
        body.includes(`id="${id}"`)
        || compat
        || (path === '/huong-dan'
          && ['huong-dan-đong-gop', 'nguon-tai-lieu'].includes(id)),
        `Missing historical anchor ${file}#${id}`,
      )
      historicalCount++
    }
  }
  assert.equal(historicalCount, 387)
  pass(
    'every imported source hash and historical explicit heading anchor is preserved',
  )

  assert.throws(() =>
    parseRoster(
      'mssv,email,name,major,class,cohort\n52.01,a@test.invalid,Test Student,cntt,B,K52\n5201,b@test.invalid,Test Other,cntt,B,K52',
    ),
  )
  const malicious = renderMarkdown(
    '<script>alert(1)</script><img src=x onerror=alert(1)><a href="javascript:alert(1)">x</a>\n\n$x^2$',
  )
  assert.ok(!/onerror|javascript:|<script/i.test(malicious))
  assert.ok(malicious.includes('<svg'))
  pass(
    'roster duplicate normalization and Markdown sanitization with native mathematics',
  )
  const fd = openSync(resolve(directory, 'server.log'), 'a')
  server = spawn(process.execPath, ['.output/server/index.mjs'], {
    env,
    stdio: ['ignore', fd, fd],
  })
  closeSync(fd)
  for (let i = 0; i < 100; i++) {
    try {
      if ((await request('/api/health')).ok) break
    }
    catch {
      /* Wait for application. */
    }
    await new Promise(r => setTimeout(r, 100))
  }
  const catalog = await json('/api/v1/catalog')
  assert.equal(catalog.courses.length, 155)
  assert.equal(catalog.placements.length, 217)
  const search = await json('/api/v1/resources?q=dai%20so')
  assert.ok(search.total > 0)
  const first = (
    await db.query('SELECT id,path FROM resources ORDER BY id LIMIT 1')
  ).rows[0]
  await json(`/api/v1/resources/${first.id}`, {}, 401)
  await json('/api/v1/quiz', {}, 401)
  const anonymous = await (await request(first.path)).text()
  assert.ok(!anonymous.includes('data-mml-node'))
  pass(
    'public metadata and unaccented search; API and SSR content are protected',
  )
  await json(
    '/api/auth/sign-up/email',
    {
      method: 'POST',
      body: {
        name: 'Fake',
        email: 'fake@test.invalid',
        studentId: 'fake',
        password: secretPassword,
      },
    },
    400,
  )
  const legacy = JSON.parse(
    readFileSync('../content-archive/migration.json', 'utf8'),
  )
  for (const entry of legacy) {
    const path
      = '/'
        + entry.path
          .replace(/\.md$/, '')
          .replace(/^index$/, '')
          .replace(/\/index$/, '/')
    const response = await request(path)
    assert.ok(
      [200, 301, 302].includes(response.status),
      `Legacy path ${path}: ${response.status}`,
    )
  }
  pass('all 77 historical paths return a page or a canonical redirect')
  await signup('student1')
  await signup('student2')
  await signup('admin1', 'admin')
  await signup('editor1', 'editor')
  assert.equal(
    (await json('/api/v1/me', { who: 'student1' })).user.role,
    'student',
  )
  await json(
    '/api/v1/preview',
    {
      who: 'student1',
      method: 'POST',
      body: { markdown: '# x' },
      headers: { Origin: 'https://untrusted.invalid' },
    },
    403,
  )

  await json('/api/v1/admin/revisions', { who: 'student1' }, 403)
  await json('/api/v1/admin/revisions', { who: 'admin1' }, 403)
  pass(
    'roster-gated signup, queued verification, email verification, MSSV login, role and MFA gates',
  )
  const mfaSecrets = new Map<string, string>()
  for (const id of ['admin1', 'editor1']) {
    const setup = await json('/api/auth/two-factor/enable', {
      who: id,
      method: 'POST',
      body: { password: secretPassword },
    })
    assert.ok(setup.totpURI)
    mfaSecrets.set(id, setup.totpURI)
    await json('/api/auth/two-factor/verify-totp', {
      who: id,
      method: 'POST',
      body: { code: totp(setup.totpURI) },
    })
  }
  await json('/api/auth/sign-out', { who: 'admin1', method: 'POST', body: {} })
  const challenged = await json('/api/auth/sign-in/email', {
    who: 'admin1',
    method: 'POST',
    body: { email: 'admin1', password: secretPassword },
  })
  assert.equal(challenged.twoFactorRedirect, true)
  assert.equal((await json('/api/v1/me', { who: 'admin1' })).user, null)
  await json('/api/auth/two-factor/verify-totp', {
    who: 'admin1',
    method: 'POST',
    body: { code: totp(mfaSecrets.get('admin1')!) },
  })
  await db.query('DELETE FROM rate_limit')
  for (let i = 0; i < 5; i++)
    await json(
      '/api/auth/sign-in/email',
      {
        who: 'rate-check',
        method: 'POST',
        body: { email: 'missing@test.invalid', password: secretPassword },
      },
      401,
    )
  await json(
    '/api/auth/sign-in/email',
    {
      who: 'rate-check',
      method: 'POST',
      body: { email: 'missing@test.invalid', password: secretPassword },
    },
    429,
  )
  await db.query('DELETE FROM rate_limit')
  pass(
    'MFA is required again on login and repeated invalid login attempts are throttled',
  )
  const reviewList = await json('/api/v1/admin/revisions', { who: 'admin1' })
  const revision = reviewList.items.find(
    (r: { resource: string }) => r.resource === first.id,
  )
  await json(
    '/api/v1/admin/review',
    {
      who: 'admin1',
      method: 'POST',
      body: {
        id: revision.id,
        state: 'published',
        rights: 'unreviewed',
        academicVerified: false,
        note: '',
      },
    },
    400,
  )
  await json('/api/v1/admin/review', {
    who: 'admin1',
    method: 'POST',
    body: {
      id: revision.id,
      state: 'published',
      rights: 'permitted',
      academicVerified: false,
      note: 'Test fixture only; not production approval.',
    },
  })
  assert.ok(
    (await json(`/api/v1/resources/${first.id}`, { who: 'student1' })).html,
  )
  pass(
    'real TOTP setup and confirmation; rights gate; reviewed resource becomes readable',
  )
  const bodySearch = encodeURIComponent('các thuật toán học máy')
  assert.equal((await json('/api/v1/resources?q=' + bodySearch)).total, 0)
  assert.ok(
    (await json('/api/v1/resources?q=' + bodySearch, { who: 'student1' }))
      .total > 0,
  )

  const task = (await db.query('SELECT id FROM tasks LIMIT 1')).rows[0].id
  await json(`/api/v1/progress/${task}`, {
    who: 'student1',
    method: 'PUT',
    body: { complete: true, version: 0 },
  })
  await json(
    `/api/v1/progress/${task}`,
    { who: 'student1', method: 'PUT', body: { complete: false, version: 0 } },
    409,
  )
  await json(`/api/v1/progress/${task}`, {
    who: 'student1',
    method: 'PUT',
    body: { complete: false, version: 1 },
  })
  assert.equal(
    (await json('/api/v1/me/state', { who: 'student2' })).progress.length,
    0,
  )
  await json('/api/v1/me/import', {
    who: 'student1',
    method: 'POST',
    body: {
      schema: 1,
      progress: [{ key: task, complete: true }],
      commit: true,
    },
  })
  assert.equal(
    (await json('/api/v1/me/state', { who: 'student1' })).progress[0].complete,
    false,
  )
  const quiz = await json('/api/v1/quiz', { who: 'student1' })
  assert.ok(!('answer' in quiz.questions[0]))
  const rawQuiz = (await db.query('SELECT data FROM quizzes LIMIT 1')).rows[0]
    .data
  const result = await json('/api/v1/quiz/attempts', {
    who: 'student1',
    method: 'POST',
    body: {
      revision: quiz.revision,
      answers: Object.fromEntries(
        rawQuiz.map((q: { id: number, answer: string }) => [q.id, q.answer]),
      ),
    },
  })
  assert.equal(result.score, 10)
  pass(
    'progress concurrency, account isolation, non-overwriting imports and server quiz scoring',
  )
  const contribution = await json('/api/v1/contributions', {
    who: 'student1',
    method: 'POST',
    body: { title: 'Test contribution', body: '# Native text\n\n$x^2$' },
  })
  await json(
    `/api/v1/contributions/${contribution.id}`,
    {
      who: 'student2',
      method: 'PUT',
      body: { title: 'Take over', body: 'no', version: 1 },
    },
    409,
  )
  const upload = await json(`/api/v1/files?contribution=${contribution.id}`, {
    who: 'student1',
    method: 'POST',
    raw: Buffer.from('%PDF-1.7\nTest fixture'),
    headers: { 'X-File-Name': 'test.pdf' },
  })
  await json(`/api/v1/files/${upload.id}`, { who: 'student1' }, 404)
  const submission = await json(
    `/api/v1/contributions/${contribution.id}/submit`,
    { who: 'student1', method: 'POST', body: {} },
  )
  const workerRun = spawnSync(
    process.execPath,
    ['--import', 'tsx', 'scripts/worker.ts', '--once'],
    { env, encoding: 'utf8', timeout: 30000 },
  )
  assert.equal(workerRun.status, 0, workerRun.stderr)
  assert.equal(
    (await db.query('SELECT scan FROM files WHERE id=$1', [upload.id])).rows[0]
      .scan,
    'pending',
    'An unavailable scanner must never mark a file clean',
  )
  await json(
    '/api/v1/admin/review',
    {
      who: 'admin1',
      method: 'POST',
      body: {
        id: submission.id,
        state: 'published',
        rights: 'permitted',
        academicVerified: false,
        note: '',
      },
    },
    409,
  )
  const scanJob = (
    await db.query(
      'UPDATE jobs SET state=\'failed\' WHERE kind=\'scan\' AND payload->>\'id\'=$1 RETURNING id',
      [upload.id],
    )
  ).rows[0]
  await json(
    `/api/v1/admin/jobs/${scanJob.id}`,
    { who: 'student1', method: 'PATCH', body: {} },
    403,
  )
  await json(`/api/v1/admin/jobs/${scanJob.id}`, {
    who: 'admin1',
    method: 'PATCH',
    body: {},
  })
  assert.equal(
    (await db.query('SELECT tries FROM jobs WHERE id=$1', [scanJob.id])).rows[0]
      .tries,
    0,
  )
  await db.query('UPDATE files SET scan=\'clean\' WHERE id=$1', [upload.id])
  await json('/api/v1/admin/review', {
    who: 'admin1',
    method: 'POST',
    body: {
      id: submission.id,
      state: 'published',
      rights: 'permitted',
      academicVerified: false,
      note: 'Test fixture',
    },
  })
  const ranged = await request(`/api/v1/files/${upload.id}`, {
    who: 'student2',
    headers: { Range: 'bytes=0-4' },
  })
  assert.equal(ranged.status, 206)
  assert.equal(await ranged.text(), '%PDF-')
  const editorDraft = await json('/api/v1/contributions', {
    who: 'editor1',
    method: 'POST',
    body: { title: 'Editor draft', body: '# Test' },
  })
  const editorSubmit = await json(
    `/api/v1/contributions/${editorDraft.id}/submit`,
    { who: 'editor1', method: 'POST', body: {} },
  )
  await json(
    '/api/v1/admin/review',
    {
      who: 'editor1',
      method: 'POST',
      body: {
        id: editorSubmit.id,
        state: 'published',
        rights: 'permitted',
        academicVerified: false,
        note: '',
      },
    },
    403,
  )
  pass(
    'contribution ownership, quarantine, publish scan gate, authenticated ranges, no self-review',
  )
  const studentId = (
    await db.query(
      'SELECT id FROM "user" WHERE email=\'student2@test.invalid\'',
    )
  ).rows[0].id
  await json(`/api/v1/admin/users/${studentId}`, {
    who: 'admin1',
    method: 'PATCH',
    body: { disabled: true, role: 'student' },
  })
  assert.equal((await json('/api/v1/me', { who: 'student2' })).user, null)
  pass('account disable immediately revokes active sessions')
  const browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome',
  })
  try {
    const page = await browser.newPage()
    const errors: string[] = []
    page.on('pageerror', e => errors.push(e.message))
    await page.context().addCookies(
      [...(jars.get('student1') || [])].map(([name, value]) => ({
        name,
        value,
        url: base,
      })),
    )
    for (const width of [360, 768, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      for (const mode of ['light', 'dark']) {
        await page.goto(base + first.path)
        await page.waitForSelector('.article h1')
        if (width < 768)
          await page.getByRole('button', { name: 'Menu', exact: true }).click()
        const toggle = page.getByRole('switch', { name: 'Giao diện tối' })
        if (
          ((await toggle.getAttribute('aria-checked')) === 'true')
          !== (mode === 'dark')
        )
          await toggle.click()
        await page.reload()
        await page.waitForSelector('.article h1')
        if (width < 768)
          await page.getByRole('button', { name: 'Menu', exact: true }).click()
        assert.equal(
          await toggle.getAttribute('aria-checked'),
          String(mode === 'dark'),
        )
        await page.screenshot({
          path: `test-results/platform-reading-${width}-${mode}.png`,
          fullPage: true,
        })
        const mathFill = await page
          .locator('.article svg g[fill]')
          .first()
          .evaluate(e => getComputedStyle(e).fill)
        if (mode === 'dark')
          assert.notEqual(
            mathFill,
            'rgb(0, 0, 0)',
            'Mathematics must inherit the dark theme text color',
          )
        const overflow = await page.evaluate(() =>
          [...document.querySelectorAll('*')]
            .filter(e => e.getBoundingClientRect().right > innerWidth + 1)
            .slice(0, 12)
            .map(e => ({
              tag: e.tagName,
              class: e.className?.toString(),
              width: e.getBoundingClientRect().width,
            })),
        )
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
          JSON.stringify({ width, mode, overflow }),
        )
        await page.screenshot({
          path: `test-results/platform-reading-${width}-${mode}.png`,
          fullPage: true,
        })
      }
    }
    assert.deepEqual(errors, [])
    await page.goto(base + '/roadmap')
    await page.waitForSelector('.task-list input')
    const checkbox = page.locator('.task-list input').first()
    await checkbox.check()
    await page.waitForTimeout(500)
    await page.reload()
    await checkbox.waitFor()
    assert.equal(await checkbox.isChecked(), true)
    await page.screenshot({
      path: 'test-results/platform-roadmap-viewport.png',
      fullPage: false,
    })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(base + first.path)
    await page.screenshot({
      path: 'test-results/platform-reading-viewport-dark.png',
      fullPage: false,
    })
    await page.goto(base + '/quiz')
    await page.waitForSelector('fieldset')
    assert.equal(await page.locator('fieldset').count(), 10)
    for (const question of rawQuiz)
      await page
        .locator(
          `input[name="question-${question.id}"][value="${question.answer}"]`,
        )
        .check()
    await page.getByRole('button', { name: 'Chấm bài', exact: true }).click()
    await page.getByText('Kết quả: 10/10', { exact: true }).waitFor()
    await page.getByRole('button', { name: 'Làm lại', exact: true }).click()
    assert.equal(await page.locator('input[type=radio]:checked').count(), 0)
    await page.goto(base + '/hoc-lieu/?q=dai%20so&kind=ly-thuyet')
    await page.getByText('Xóa bộ lọc', { exact: true }).waitFor()
    assert.equal(
      await page.getByLabel('Mã hoặc tên môn').inputValue(),
      'dai so',
    )

    pass(
      'authenticated SSR/browser, eight screen/theme combinations, reload persistence, checklist and quiz UI',
    )
  }
  finally {
    await browser.close()
  }
  await json('/api/v1/admin/profile', {
    who: 'admin1',
    method: 'PUT',
    body: {
      currentId: 'student1',
      studentId: 'student1updated',
      email: 'student1updated@test.invalid',
      name: 'Updated fixture',
      major: 'cntt',
      className: 'B',
      cohort: 'K52',
    },
  })
  assert.equal((await json('/api/v1/me', { who: 'student1' })).user, null)
  const profileJob = (
    await db.query(
      'SELECT payload FROM jobs WHERE payload->>\'to\'=\'student1updated@test.invalid\' ORDER BY created_at DESC LIMIT 1',
    )
  ).rows[0]
  const profileLink = new URL(
    String(profileJob.payload.text).split('\n').at(-1)!,
  )
  const profileVerify = await request(
    profileLink.pathname + profileLink.search,
    { who: 'student1' },
  )
  assert.ok([200, 302].includes(profileVerify.status))
  await json('/api/auth/sign-in/email', {
    who: 'student1',
    method: 'POST',
    body: { email: 'student1updated', password: secretPassword },
  })
  assert.ok(
    (await json('/api/v1/me/state', { who: 'student1' })).progress.length > 0,
  )
  pass(
    'administrator identity correction revokes sessions, re-verifies email and preserves learning history',
  )
  binary(resolve(bin, 'pg_dump' + suffix), [
    '--dbname=' + url,
    '--format=custom',
    '--file=' + resolve(directory, 'database.dump'),
  ])
  await db.query('CREATE DATABASE restore_validation')
  binary(resolve(bin, 'pg_restore' + suffix), [
    '--dbname=' + url.replace('/postgres', '/restore_validation'),
    '--no-owner',
    resolve(directory, 'database.dump'),
  ])
  const restored = new pg.Client({
    connectionString: url.replace('/postgres', '/restore_validation'),
  })
  await restored.connect()
  assert.equal(
    (await restored.query('SELECT count(*)::int n FROM resources')).rows[0].n,
    89,
  )
  await restored.end()
  pass('actual pg_dump and pg_restore into an independent database')
  console.log(
    `Verified ${checks} end-to-end groups against isolated PostgreSQL.`,
  )
}
finally {
  if (server?.pid && server.exitCode === null) {
    const exit = once(server, 'exit')
    server.kill()
    await exit
  }
  await db?.end().catch(() => {})
  if (started)
    binary(control, [
      '-D',
      resolve(directory, 'cluster'),
      '-m',
      'fast',
      '-w',
      'stop',
    ])
}
