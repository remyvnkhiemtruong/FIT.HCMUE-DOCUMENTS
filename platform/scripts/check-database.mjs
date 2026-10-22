import pg from 'pg'

const connectionString
  = process.env.NUXT_DATABASE_URL || process.env.DATABASE_URL
if (!connectionString) {
  console.error(
    'DATABASE_URL is missing. Configure it locally; never commit credentials.',
  )
  process.exitCode = 1
}
else {
  let client
  try {
    client = new pg.Client({
      connectionString,
      connectionTimeoutMillis: 3000,
      query_timeout: 3500,
    })
    await client.connect()
    await client.query('SELECT 1')
    console.log('PostgreSQL connection: OK')
  }
  catch {
    console.error(
      'PostgreSQL connection failed. Check local configuration and server availability.',
    )
    process.exitCode = 1
  }
  finally {
    await client?.end().catch(() => {})
  }
}
