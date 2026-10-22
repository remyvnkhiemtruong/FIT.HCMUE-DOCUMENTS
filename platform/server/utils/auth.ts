import { betterAuth } from 'better-auth'
import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { twoFactor } from 'better-auth/plugins'
import { APIError, createAuthMiddleware } from 'better-auth/api'
import { randomUUID } from 'node:crypto'
import { database, sql } from './db'
import * as schema from '../db/schema'
import { normalizeStudentId } from '../../shared/utils/identity'

let instance: ReturnType<typeof makeAuth> | undefined
async function queueEmail(to: string, subject: string, url: string) {
  await sql('INSERT INTO jobs(id,kind,payload) VALUES($1,\'email\',$2)', [
    randomUUID(),
    JSON.stringify({ to, subject, text: `${subject}\n${url}` }),
  ])
}
function makeAuth() {
  if (
    !process.env.BETTER_AUTH_SECRET
    || process.env.BETTER_AUTH_SECRET.length < 32
    || !process.env.BETTER_AUTH_URL
  )
    throw new Error('Authentication is not configured')
  return betterAuth({
    appName: 'Kho học liệu FIT HCMUE',
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(database(), { provider: 'pg', schema }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      minPasswordLength: 12,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: async ({ user, url }) =>
        queueEmail(user.email, 'Đặt lại mật khẩu', url),
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: false,
      sendVerificationEmail: async ({ user, url }) =>
        queueEmail(user.email, 'Xác thực email', url),
    },
    user: {
      additionalFields: {
        role: { type: 'string', defaultValue: 'student', input: false },
        disabled: { type: 'boolean', defaultValue: false, input: false },
      },
    },
    session: { expiresIn: 60 * 60 * 24 * 7, cookieCache: { enabled: false } },
    advanced: {
      ipAddress: { ipAddressHeaders: ['x-forwarded-for'] },
      useSecureCookies: process.env.BETTER_AUTH_URL.startsWith('https:'),
      defaultCookieAttributes: { httpOnly: true, sameSite: 'lax' },
    },
    rateLimit: {
      enabled: true,
      storage: 'database',
      window: 60,
      max: 30,
      customRules: {
        '/sign-in/email': { window: 60, max: 5 },
        '/sign-up/email': { window: 60, max: 3 },
      },
    },
    plugins: [twoFactor({ issuer: 'FIT HCMUE' })],
    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        if (ctx.path === '/sign-up/email') {
          const body = ctx.body as Record<string, unknown>
          const email = String(body.email || '')
            .trim()
            .toLowerCase()
          const studentId = normalizeStudentId(String(body.studentId || ''))
          const rows = await sql(
            'SELECT name FROM roster WHERE email=$1 AND student_id=$2 AND active=true',
            [email, studentId],
          )
          if (!rows.length)
            throw new APIError('BAD_REQUEST', {
              message:
                'Không thể đăng ký với thông tin này. Liên hệ quản trị để đối chiếu.',
            })
          body.email = email
          body.name = rows[0]!.name
        }
        if (
          ['/change-email', '/delete-user', '/update-user'].includes(ctx.path)
        )
          throw new APIError('FORBIDDEN', {
            message: 'Liên hệ quản trị để cập nhật hồ sơ.',
          })
      }),
    },
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            const rows = await sql(
              'SELECT role,name FROM roster WHERE email=$1 AND active=true',
              [user.email.toLowerCase()],
            )
            if (!rows.length)
              throw new APIError('FORBIDDEN', {
                message: 'Tài khoản chưa được cấp quyền.',
              })
            return {
              data: { ...user, name: rows[0]!.name, role: rows[0]!.role },
            }
          },
        },
      },
      session: {
        create: {
          before: async (data) => {
            const rows = await sql(
              'SELECT u.disabled,r.active FROM "user" u JOIN roster r ON lower(r.email)=lower(u.email) WHERE u.id=$1',
              [data.userId],
            )
            if (!rows.length || rows[0]!.disabled || !rows[0]!.active)
              throw new APIError('FORBIDDEN', {
                message: 'Tài khoản không khả dụng.',
              })
            return { data }
          },
        },
      },
    },
  })
}
export function auth() {
  return (instance ??= makeAuth())
}
