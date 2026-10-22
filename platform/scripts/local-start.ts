import { randomBytes } from 'node:crypto'
import { spawn, spawnSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  openSync,
  closeSync,
} from 'node:fs'
import { resolve } from 'node:path'
import { once } from 'node:events'
import { createServer } from 'node:net'
import pg from 'pg'

// Native development only. Never reads or changes the existing PostgreSQL service.
const directory = resolve('.data/local-development'),
  profile = resolve(directory, 'profile.json')
const bin
  = process.env.PG_BIN
    || (process.platform === 'win32'
      ? 'C:/Program Files/PostgreSQL/16/bin'
      : '/usr/lib/postgresql/16/bin')
const suffix = process.platform === 'win32' ? '.exe' : '',
  control = resolve(bin, 'pg_ctl' + suffix)
if (!existsSync(control) || !existsSync('.output/server/index.mjs'))
  throw new Error(
    'Install native PostgreSQL 16, set PG_BIN if needed, and run npm run build first.',
  )
mkdirSync(directory, { recursive: true, mode: 0o700 })
async function freePort() {
  const server = createServer()
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const port = (server.address() as { port: number }).port
  await new Promise<void>(done => server.close(() => done()))
  return port
}
function binary(command: string, args: string[]) {
  const fd = openSync(resolve(directory, 'postgres.log'), 'a')
  try {
    const result = spawnSync(command, args, {
      stdio: ['ignore', fd, fd],
      timeout: 60000,
    })
    if (result.status !== 0)
      throw new Error(
        'Local PostgreSQL command failed. Inspect the local log without sharing credentials.',
      )
  }
  finally {
    closeSync(fd)
  }
}
let config: { url: string, port: number, secret: string }
if (existsSync(profile)) config = JSON.parse(readFileSync(profile, 'utf8'))
else {
  const port = await freePort(),
    password = randomBytes(32).toString('hex'),
    secret = randomBytes(48).toString('hex')
  writeFileSync(resolve(directory, 'password'), password, {
    mode: 0o600,
    flag: 'wx',
  })
  binary(resolve(bin, 'initdb' + suffix), [
    '-D',
    resolve(directory, 'cluster'),
    '-U',
    'hub_local',
    '--auth=scram-sha-256',
    '--pwfile=' + resolve(directory, 'password'),
    '--encoding=UTF8',
    '--locale=C',
  ])
  config = {
    port,
    url: `postgresql://hub_local:${password}@127.0.0.1:${port}/postgres`,
    secret,
  }
  writeFileSync(profile, JSON.stringify(config), { mode: 0o600, flag: 'wx' })
}
const probe = new pg.Client({
  connectionString: config.url,
  connectionTimeoutMillis: 1000,
})
let databaseRunning = false
try {
  await probe.connect()
  databaseRunning
    = (await probe.query('SHOW data_directory')).rows[0]?.data_directory
      .replaceAll('\\', '/')
      .toLowerCase()
      === resolve(directory, 'cluster').replaceAll('\\', '/').toLowerCase()
}
catch {
  /* Start only this development cluster. */
}
finally {
  await probe.end().catch(() => {})
}
if (!databaseRunning)
  binary(control, [
    '-D',
    resolve(directory, 'cluster'),
    '-l',
    resolve(directory, 'postgres-runtime.log'),
    '-o',
    `-h 127.0.0.1 -p ${config.port}`,
    '-w',
    'start',
  ])
const port = Number(process.env.PORTAL_LOCAL_PORT || 3100),
  base = `http://127.0.0.1:${port}`
const env = {
  ...process.env,
  NODE_ENV: 'production',
  DATABASE_URL: config.url,
  NUXT_DATABASE_URL: '',
  BETTER_AUTH_SECRET: config.secret,
  BETTER_AUTH_URL: base,
  NITRO_HOST: '127.0.0.1',
  NITRO_PORT: String(port),
  FILE_STORAGE_PATH: resolve(directory, 'uploads'),
}
mkdirSync(env.FILE_STORAGE_PATH, { recursive: true, mode: 0o700 })
for (const file of ['scripts/migrate.ts', 'scripts/import-content.ts']) {
  const result = spawnSync(
    process.execPath,
    [
      '--import',
      'tsx',
      file,
      ...(file.includes('import-content') ? ['--apply'] : []),
    ],
    { env, stdio: 'inherit', timeout: 120000 },
  )
  if (result.status !== 0) throw new Error('Local database setup failed')
}
const child = spawn(process.execPath, ['.output/server/index.mjs'], {
  env,
  stdio: 'inherit',
})
console.log(
  `Local platform: ${base}. No test students or verified accounts have been created.`,
)
process.on('SIGINT', () => child.kill())
process.on('SIGTERM', () => child.kill())
await once(child, 'exit')
if (!databaseRunning)
  binary(control, [
    '-D',
    resolve(directory, 'cluster'),
    '-m',
    'fast',
    '-w',
    'stop',
  ])
