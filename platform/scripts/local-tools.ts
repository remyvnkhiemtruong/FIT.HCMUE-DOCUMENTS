import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const profile = JSON.parse(
  readFileSync('.data/local-development/profile.json', 'utf8'),
) as { url: string, secret: string }
Object.assign(process.env, {
  DATABASE_URL: profile.url,
  NUXT_DATABASE_URL: '',
  BETTER_AUTH_SECRET: profile.secret,
  BETTER_AUTH_URL: `http://127.0.0.1:${process.env.PORTAL_LOCAL_PORT || 3100}`,
  FILE_STORAGE_PATH: resolve('.data/local-development/uploads'),
})
const operation = process.argv[2]
process.argv = [...process.argv.slice(0, 2), ...process.argv.slice(3)]
if (operation === 'admin') await import('./bootstrap-admin')
else if (operation === 'worker') await import('./worker')
else throw new Error('Choose admin or worker; start npm run local first.')
