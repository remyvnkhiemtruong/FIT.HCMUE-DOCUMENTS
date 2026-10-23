import { auth } from '../../utils/auth'
import { sql } from '../../utils/db'
import { normalizeStudentId } from '../../../shared/utils/identity'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store')
  const request = toWebRequest(event)
  if (
    getRequestURL(event).pathname.endsWith('/sign-in/email')
    && event.method === 'POST'
  ) {
    const body = await readBody<Record<string, unknown>>(event)
    if (typeof body.email === 'string' && !body.email.includes('@')) {
      const rows = await sql(
        'SELECT email FROM roster WHERE student_id=$1 AND active=true',
        [normalizeStudentId(body.email)],
      )
      body.email = rows[0]?.email || 'unknown@invalid.invalid'
    }
    return auth().handler(
      new Request(request.url, {
        method: 'POST',
        headers: request.headers,
        body: JSON.stringify(body),
      }),
    )
  }
  return auth().handler(request)
})
