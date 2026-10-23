import pg from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../db/schema'

let pool: pg.Pool | undefined
export function database() {
  const url = process.env.NUXT_DATABASE_URL || process.env.DATABASE_URL
  if (!url) throw new Error('Database is not configured')
  pool ??= new pg.Pool({
    connectionString: url,
    max: 10,
    connectionTimeoutMillis: 3000,
    statement_timeout: 10000,
  })
  if (!pool.listenerCount('error'))
    pool.on('error', () => console.error('Database connection interrupted, please try again'))
  return drizzle(pool, { schema })
}
export async function sql<T extends pg.QueryResultRow = pg.QueryResultRow>(
  query: string,
  values: unknown[] = [],
) {
  database()
  return (await pool!.query<T>(query, values)).rows
}
export async function transaction<T>(
  action: (client: pg.PoolClient) => Promise<T>,
) {
  database()
  const client = await pool!.connect()
  try {
    await client.query('BEGIN')
    const result = await action(client)
    await client.query('COMMIT')
    return result
  }
  catch (error) {
    await client.query('ROLLBACK')
    throw error
  }
  finally {
    client.release()
  }
}
export async function closeBusinessDatabase() {
  await pool?.end()
  pool = undefined
}
