import { statfs, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import pg from 'pg'

const issues = []
try {
  const response = await fetch(
    new URL('/api/health/database', process.env.BETTER_AUTH_URL),
    { signal: AbortSignal.timeout(10000) },
  )
  if (!response.ok) issues.push('application_unavailable')
}
catch {
  issues.push('application_unavailable')
}
try {
  const fs = await statfs(process.env.FILE_STORAGE_PATH || '.data/uploads')
  if (fs.bavail / fs.blocks < 0.15) issues.push('disk_space_low')
}
catch {
  issues.push('storage_unavailable')
}
try {
  const backup = JSON.parse(
    await readFile(
      resolve(
        process.env.BACKUP_WORK_PATH || '.data/backup-current',
        'last-success.json',
      ),
      'utf8',
    ),
  )
  if (Date.now() - Date.parse(backup.at) > 26 * 3600 * 1000)
    issues.push('backup_overdue')
}
catch {
  issues.push('backup_unverified')
}
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 3000,
})
try {
  await client.connect()
  const result = await client.query(
    'SELECT count(*)::int n FROM jobs WHERE state=\'failed\' OR (state=\'pending\' AND created_at<now()-interval \'30 minutes\')',
  )
  if (result.rows[0].n) issues.push('background_jobs_need_attention')
}
catch {
  issues.push('database_unavailable')
}
finally {
  await client.end().catch(() => {})
}
console.log(
  JSON.stringify({
    status: issues.length ? 'attention' : 'ok',
    issues,
    at: new Date().toISOString(),
  }),
)
if (issues.length && process.env.ALERT_WEBHOOK_URL) {
  if (!process.env.ALERT_WEBHOOK_URL.startsWith('https://'))
    throw new Error('Alert endpoint must use HTTPS')
  await fetch(process.env.ALERT_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ service: 'fit-hcmue', issues }),
    signal: AbortSignal.timeout(10000),
  })
}
process.exitCode = issues.length ? 1 : 0
