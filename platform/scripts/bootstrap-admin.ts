import { parseArgs } from 'node:util'
import { randomUUID } from 'node:crypto'
import { sql, closeBusinessDatabase } from '../server/utils/db'

const { values } = parseArgs({
  options: { email: { type: 'string' }, name: { type: 'string' } },
})
if (!values.email || !values.name)
  throw new Error(
    'Supply --email and --name. No password is accepted by this script.',
  )
if ((await sql('SELECT 1 FROM roster WHERE role=\'admin\'')).length)
  throw new Error(
    'An administrator already exists. Use the authenticated invitation flow.',
  )
const email = values.email.trim().toLowerCase(),
  id = `staff${randomUUID().replaceAll('-', '')}`
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email')
await sql(
  'INSERT INTO roster(student_id,display_id,email,name,major,class_name,cohort,role) VALUES($1,$1,$2,$3,\'staff\',\'staff\',\'staff\',\'admin\')',
  [id, email, values.name],
)
const link = new URL('/dang-nhap', process.env.BETTER_AUTH_URL)
link.searchParams.set('invite', id)
link.searchParams.set('email', email)
await sql('INSERT INTO jobs(id,kind,payload) VALUES($1,\'email\',$2)', [
  randomUUID(),
  JSON.stringify({
    to: email,
    subject: 'Thiết lập quản trị học liệu',
    text: `Đăng ký tại ${link}. Xác thực email và bật xác thực hai bước trước khi quản trị.`,
  }),
])
console.log(
  'Administrator invitation queued. No account password or verification bypass was created.',
)
await closeBusinessDatabase()
