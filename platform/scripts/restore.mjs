import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import pg from 'pg'

const url = process.env.RESTORE_DATABASE_URL,
  dump = process.argv[2]
if (!url || !dump || !existsSync(dump) || url === process.env.DATABASE_URL)
  throw new Error('Supply a backup and a separate, empty RESTORE_DATABASE_URL')
const client = new pg.Client({ connectionString: url })
try {
  await client.connect()
  const tables = await client.query(
    'SELECT count(*)::int n FROM information_schema.tables WHERE table_schema=\'public\'',
  )
  if (tables.rows[0].n)
    throw new Error(
      'Restore destination must be empty; no database is dropped by this script',
    )
  const parsed = new URL(url)
  const result = spawnSync(
    'pg_restore',
    [
      '--no-owner',
      '--single-transaction',
      '--exit-on-error',
      '--dbname=' + parsed.pathname.slice(1),
      dump,
    ],
    {
      env: {
        ...process.env,
        PGHOST: parsed.hostname,
        PGPORT: parsed.port || '5432',
        PGUSER: decodeURIComponent(parsed.username),
        PGPASSWORD: decodeURIComponent(parsed.password),
      },
      stdio: 'ignore',
    },
  )
  if (result.status !== 0) throw new Error('Restore failed')
  console.log(
    'Database restored. Verify migration, resource counts, file checksums and protected reads before switching traffic.',
  )
}
finally {
  await client.end()
}
