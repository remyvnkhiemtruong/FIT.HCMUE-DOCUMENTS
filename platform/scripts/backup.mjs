import { spawn } from 'node:child_process'
import { mkdir, stat, writeFile, rename } from 'node:fs/promises'
import { resolve } from 'node:path'

const directory = resolve(
  process.env.BACKUP_WORK_PATH || '.data/backup-current',
)
if (
  !process.env.DATABASE_URL
  || !process.env.RESTIC_REPOSITORY
  || !process.env.RESTIC_PASSWORD
)
  throw new Error(
    'Database and encrypted offsite backup configuration required',
  )
const parsed = new URL(process.env.DATABASE_URL)
const databaseEnv = {
  ...process.env,
  PGHOST: parsed.hostname,
  PGPORT: parsed.port || '5432',
  PGUSER: decodeURIComponent(parsed.username),
  PGPASSWORD: decodeURIComponent(parsed.password),
  PGDATABASE: parsed.pathname.slice(1),
}
export async function command(file, args, env = process.env) {
  const result = await new Promise((resolve, reject) => {
    const child = spawn(file, args, {
      env,
      stdio: ['ignore', 'ignore', 'ignore'],
    })
    child.on('error', reject)
    child.on('exit', resolve)
  })
  if (result !== 0)
    throw new Error(
      'Backup command failed; no successful backup marker written',
    )
}
await mkdir(directory, { recursive: true, mode: 0o700 })
await command(
  'pg_dump',
  ['--format=custom', '--file=' + resolve(directory, 'database.dump.new')],
  databaseEnv,
)
await rename(
  resolve(directory, 'database.dump.new'),
  resolve(directory, 'database.dump'),
)
const uploads = resolve(process.env.FILE_STORAGE_PATH || '.data/uploads')
await stat(uploads)
await command('restic', [
  'backup',
  '--host',
  'fit-hcmue',
  '--tag',
  'daily',
  directory,
  uploads,
])
await command('restic', [
  'forget',
  '--host',
  'fit-hcmue',
  '--keep-daily',
  '14',
  '--keep-weekly',
  '8',
  '--prune',
])
if (new Date().getUTCDay() === 0)
  await command('restic', ['check', '--read-data-subset=10%'])
await writeFile(
  resolve(directory, 'last-success.json'),
  JSON.stringify({ at: new Date().toISOString() }),
  { mode: 0o600 },
)
console.log('Encrypted offsite backup completed.')
