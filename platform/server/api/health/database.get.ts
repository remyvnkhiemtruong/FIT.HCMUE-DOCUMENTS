import type { DatabaseHealthResponse } from '#shared/types/database-health'
import { checkDatabase } from '../../utils/database'

export default defineEventHandler(
  async (event): Promise<DatabaseHealthResponse> => {
    setResponseHeader(event, 'Cache-Control', 'no-store')
    const connectionString
      = useRuntimeConfig(event).databaseUrl || process.env.DATABASE_URL

    try {
      if (connectionString && (await checkDatabase(connectionString))) {
        return { status: 'ok', database: 'connected' }
      }
    }
    catch {
      // Return a stable failure contract without credentials, hostnames or driver errors.
    }

    setResponseStatus(event, 503)
    return { status: 'error', database: 'unavailable' }
  },
)
