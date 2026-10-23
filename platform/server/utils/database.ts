import pg from 'pg'

let pool: pg.Pool | undefined

export async function checkDatabase(
  connectionString: string,
): Promise<boolean> {
  if (!pool) {
    pool = new pg.Pool({
      connectionString,
      max: 5,
      connectionTimeoutMillis: 3000,
      idleTimeoutMillis: 30_000,
      statement_timeout: 3000,
      query_timeout: 3500,
      application_name: 'fit-hcmue-learning-hub',
    })
    // pg requires an idle-client error listener. Never log errors containing DSNs.
    pool.on('error', () =>
      console.warn(
        'Database connection interrupted; readiness will be checked again.',
      ),
    )
  }

  const result = await pool.query<{ connected: number }>(
    'SELECT 1 AS connected',
  )
  return result.rows[0]?.connected === 1
}

export async function closeDatabase(): Promise<void> {
  const previous = pool
  pool = undefined
  await previous?.end()
}
