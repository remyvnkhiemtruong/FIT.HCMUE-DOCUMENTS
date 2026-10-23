import { createHash } from 'node:crypto'
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises'
import { resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  majors,
  courses,
  placements,
  cohorts,
  resources,
  topics,
} from '../../docs/.vitepress/data/catalog.mts'
import { renderMarkdown } from '../server/utils/render'
import { transaction, closeBusinessDatabase } from '../server/utils/db'

const root = fileURLToPath(new URL('../../', import.meta.url)),
  docs = resolve(root, 'docs')
const dataIssues = JSON.parse(
  await readFile(resolve(root, 'content-archive/data-issues.json'), 'utf8'),
) as { course: string, major?: string, note: string }[]
const hash = (value: string) =>
  createHash('sha256').update(value).digest('hex')
const sourceFile = async (path: string) => {
  const clean = path
    .replace(/^\//, '')
    .replace(/\/$/, '/index')
    .replace(/\.html$/, '')
  for (const candidate of [clean + '.md', clean + '/index.md']) {
    try {
      return await readFile(resolve(docs, candidate), 'utf8')
    }
    catch {
      /* Try the index convention. */
    }
  }
  throw new Error(`Missing Markdown: ${path}`)
}
const pages = await Promise.all(
  resources.map(async (resource) => {
    const markdown = await sourceFile(resource.path),
      sourceHash = hash(markdown),
      html = renderMarkdown(markdown)
    if (!html || html.includes('data-mml-node="merror"'))
      throw new Error(`Rendering failed: ${resource.id}`)
    return {
      resource,
      markdown,
      html,
      sourceHash,
      revision: `import-${resource.id}-${sourceHash.slice(0, 16)}`,
    }
  }),
)
const aliases: { path: string, target: string }[] = []
const ancillary: { path: string, markdown: string }[] = []
async function walk(directory: string) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const file = resolve(directory, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== 'public') await walk(file)
      continue
    }
    if (!entry.name.endsWith('.md')) continue
    const source = await readFile(file, 'utf8'),
      target = /^redirect:\s*["']([^"']+)["']/m.exec(source)?.[1]
    const sourcePath
      = '/'
        + relative(docs, file)
          .replaceAll('\\', '/')
          .replace(/\.md$/, '')
          .replace(/\/index$/, '/')
    if (
      !sourcePath.includes('[')
      && !resources.some(
        r => r.path.replace(/\/$/, '') === sourcePath.replace(/\/$/, ''),
      )
    )
      ancillary.push({ path: sourcePath, markdown: source })
    const cohort = /^\/khoa\/khoa-(49|50|51|52)$/.exec(sourcePath)
    if (cohort)
      aliases.push({
        path: sourcePath,
        target: `/chuong-trinh/?cohort=K${cohort[1]}`,
      })
    if (target)
      aliases.push({
        path:
          '/'
          + relative(docs, file)
            .replaceAll('\\', '/')
            .replace(/\.md$/, '')
            .replace(/\/index$/, '/'),
        target,
      })
  }
}
await walk(docs)
const quiz = JSON.parse(
  await readFile(resolve(docs, '.vitepress/data/quiz.json'), 'utf8'),
) as { question: string, options: { text: string }[], explanation: string }[]
const renderedQuiz = quiz.map(q => ({
  ...q,
  question: renderMarkdown(q.question),
  options: q.options.map(o => ({ ...o, text: renderMarkdown(o.text) })),
  explanation: renderMarkdown(q.explanation),
}))
const roadmap = await readFile(resolve(docs, 'roadmap.md'), 'utf8')
const tasks = [
  ...roadmap.matchAll(/^- \[ \] <span data-task-key="([^"]+)"><\/span>(.*)$/gm),
].map((m, position) => ({ id: m[1]!, html: renderMarkdown(m[2]!), position }))
const expectedKeys = JSON.parse(
  await readFile(resolve(docs, '.vitepress/data/checklist-keys.json'), 'utf8'),
)
if (JSON.stringify(tasks.map(t => t.id)) !== JSON.stringify(expectedKeys))
  throw new Error('Checklist key mismatch')
const support = ancillary
  .filter(p => !/^redirect:/m.test(p.markdown))
  .map(p => ({
    ...p,
    html: renderMarkdown(p.markdown),
    hash: hash(p.markdown),
  }))
const editorial = JSON.parse(
  await readFile(
    resolve(root, 'content-archive/editorial-anchors.json'),
    'utf8',
  ),
) as Record<string, string[]>
const anchorEntries: { path: string, id: string }[] = []
for (const [source, ids] of Object.entries(editorial)) {
  if (source.includes('[')) continue
  let path
    = '/'
      + source
        .replace(/\.md$/, '')
        .replace(/^index$/, '')
        .replace(/\/index$/, '/')
  for (let i = 0; i < 8; i++) {
    const alias = aliases.find(
      a => a.path.replace(/\/$/, '') === path.replace(/\/$/, ''),
    )
    if (!alias) break
    path = alias.target
  }
  path
    = new URL(path, 'https://local.invalid').pathname.replace(/\/$/, '') || '/'
  const resource = pages.find(
    p => p.resource.path.replace(/\/$/, '') === path,
  )
  const supporting = support.find(p => p.path.replace(/\/$/, '') === path)
  const isCustom
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
  const body = resource?.html || (!isCustom ? supporting?.html : '') || ''
  for (const id of ids)
    if (
      !body.includes(`id="${id}"`)
      && !(
        path === '/huong-dan'
        && ['huong-dan-đong-gop', 'nguon-tai-lieu'].includes(id)
      )
    )
      anchorEntries.push({ path, id })
}
const manifest = {
  schema: 1,
  counts: {
    majors: majors.length,
    courses: courses.length,
    placements: placements.length,
    resources: pages.length,
    tasks: tasks.length,
    quiz: quiz.length,
    aliases: aliases.length,
  },
  resources: pages.map(p => ({
    id: p.resource.id,
    path: p.resource.path,
    hash: p.sourceHash,
    revision: p.revision,
    anchors: [...p.html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]),
  })),
}
await mkdir('.data/migration', { recursive: true })
await writeFile(
  '.data/migration/manifest.json',
  JSON.stringify(manifest, null, 2),
)
if (process.argv.includes('--apply')) {
  await transaction(async (client) => {
    await client.query('SELECT pg_advisory_xact_lock(778803)')
    for (const major of majors) {
      await client.query(
        'INSERT INTO majors(id,data) VALUES($1,$2) ON CONFLICT DO NOTHING',
        [major.id, JSON.stringify(major)],
      )
      await client.query(
        'INSERT INTO programs(id,major,version) VALUES($1,$2,$3) ON CONFLICT DO NOTHING',
        [`${major.id}:${major.version}`, major.id, major.version],
      )
    }
    for (const course of courses)
      await client.query(
        'INSERT INTO courses(code,name,data) VALUES($1,$2,$3) ON CONFLICT(code) DO UPDATE SET data=jsonb_set(courses.data,\'{importedIssues}\',excluded.data->\'importedIssues\')',
        [
          course.code,
          course.name,
          JSON.stringify({
            ...course,
            importedIssues: dataIssues.filter(
              issue => issue.course === course.code,
            ),
          }),
        ],
      )
    for (const p of placements)
      await client.query(
        'INSERT INTO placements(program,course,term,credits,requirement,data) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING',
        [
          `${p.major}:${p.version}`,
          p.course,
          p.term,
          p.credits,
          p.requirement,
          JSON.stringify(p),
        ],
      )
    for (const cohort of cohorts)
      await client.query(
        'INSERT INTO cohorts(id,data) VALUES($1,$2) ON CONFLICT DO NOTHING',
        [cohort.id, JSON.stringify(cohort)],
      )
    for (const topic of topics)
      await client.query(
        'INSERT INTO topics(id,name) VALUES($1,$2) ON CONFLICT DO NOTHING',
        [topic.id, topic.name],
      )
    for (const p of pages) {
      const r = p.resource
      await client.query(
        'INSERT INTO resources(id,course,topic,title,path,kind,year,position,data) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT DO NOTHING',
        [
          r.id,
          r.course || null,
          r.topic || null,
          r.title,
          r.path,
          r.kind,
          r.year || null,
          r.order,
          JSON.stringify(r),
        ],
      )
      await client.query(
        'INSERT INTO revisions(id,resource,title,markdown,html,source_hash,source,state) VALUES($1,$2,$3,$4,$5,$6,$7,\'draft\') ON CONFLICT DO NOTHING',
        [p.revision, r.id, r.title, p.markdown, p.html, p.sourceHash, r.source],
      )
    }
    for (const alias of aliases)
      await client.query(
        'INSERT INTO aliases(path,target) VALUES($1,$2) ON CONFLICT DO NOTHING',
        [alias.path, alias.target],
      )
    for (const page of support)
      await client.query(
        'INSERT INTO support_pages(path,markdown,html,source_hash) VALUES($1,$2,$3,$4) ON CONFLICT DO NOTHING',
        [page.path, page.markdown, page.html, page.hash],
      )
    for (const a of anchorEntries)
      await client.query(
        'INSERT INTO legacy_anchors(path,id) VALUES($1,$2) ON CONFLICT DO NOTHING',
        [a.path, a.id],
      )
    for (const task of tasks)
      await client.query(
        'INSERT INTO tasks(id,position,html) VALUES($1,$2,$3) ON CONFLICT DO NOTHING',
        [task.id, task.position, task.html],
      )
    await client.query(
      'INSERT INTO quizzes(id,revision,data) VALUES($1,$2,$3) ON CONFLICT DO NOTHING',
      ['math-review', hash(JSON.stringify(quiz)), JSON.stringify(renderedQuiz)],
    )
  })
  await closeBusinessDatabase()
}
console.log(
  JSON.stringify({
    ...manifest.counts,
    applied: process.argv.includes('--apply'),
    publication: 'draft; review required',
  }),
)
