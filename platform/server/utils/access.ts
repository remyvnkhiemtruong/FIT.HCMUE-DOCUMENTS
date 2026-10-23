import type { H3Event } from 'h3'
import { createError, getHeader, getRequestURL } from 'h3'
import { auth } from './auth'
import { sql } from './db'
import type { Viewer } from '../../shared/types/platform'

export function checkOrigin(event: H3Event) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(event.method)) return
  const expected = new URL(
    process.env.BETTER_AUTH_URL || getRequestURL(event).origin,
  ).origin
  if (getHeader(event, 'origin') !== expected)
    throw createError({ statusCode: 403, message: 'Yêu cầu không hợp lệ.' })
}
export async function viewer(event: H3Event): Promise<Viewer | null> {
  if (!process.env.DATABASE_URL && !process.env.NUXT_DATABASE_URL) return null
  const result = await auth().api.getSession({
    headers: new Headers(event.headers),
  })
  if (!result) return null
  const rows = await sql(
    'SELECT u.*, r.active FROM "user" u JOIN roster r ON lower(r.email)=lower(u.email) WHERE u.id=$1',
    [result.user.id],
  )
  const row = rows[0]
  if (!row || row.disabled || !row.active || !row.email_verified) return null
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    twoFactorEnabled: !!row.two_factor_enabled,
  }
}
export async function requireViewer(event: H3Event, role?: 'editor' | 'admin') {
  const user = await viewer(event)
  if (!user)
    throw createError({ statusCode: 401, message: 'Bạn cần đăng nhập.' })
  if (
    role
    && (role === 'admin'
      ? user.role !== 'admin'
      : !['admin', 'editor'].includes(user.role))
  )
    throw createError({
      statusCode: 403,
      message: 'Bạn không có quyền thực hiện.',
    })
  if (role && !user.twoFactorEnabled)
    throw createError({
      statusCode: 403,
      message: 'Bật xác thực hai bước trong tài khoản trước khi quản trị.',
    })
  return user
}
