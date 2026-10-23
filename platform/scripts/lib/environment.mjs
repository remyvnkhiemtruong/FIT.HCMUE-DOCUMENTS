import { randomBytes } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parseEnv } from 'node:util'
import { resolve } from 'node:path'

export const platformRoot = fileURLToPath(new URL('../../', import.meta.url))

export function writeDockerEnvironment(file, { project = 'fit-hcmue-dev', port = 3001 } = {}) {
  if (existsSync(file)) return false
  const password = randomBytes(32).toString('hex')
  const values = {
    COMPOSE_PROJECT_NAME: project,
    APP_PORT: String(port),
    POSTGRES_DB: 'fit_hcmue',
    POSTGRES_USER: 'fit_hcmue',
    POSTGRES_PASSWORD: password,
    DATABASE_URL: `postgresql://fit_hcmue:${password}@postgres:5432/fit_hcmue`,
    NUXT_PUBLIC_LEGACY_URL: 'https://remyvnkhiemtruong.github.io/FIT.HCMUE-DOCUMENTS/',
  }
  writeFileSync(file, Object.entries(values).map(([key, value]) => `${key}=${value}`).join('\n') + '\n', { flag: 'wx', mode: 0o600 })
  return true
}

export function readDockerEnvironment(file) {
  const values = parseEnv(readFileSync(file, 'utf8'))
  try {
    const url = new URL(values.DATABASE_URL)
    if (!['postgres:', 'postgresql:'].includes(url.protocol)
      || url.hostname !== 'postgres' || url.port !== '5432'
      || decodeURIComponent(url.username) !== values.POSTGRES_USER
      || decodeURIComponent(url.password) !== values.POSTGRES_PASSWORD
      || decodeURIComponent(url.pathname.slice(1)) !== values.POSTGRES_DB
      || !/^[a-z_][a-z0-9_]*$/.test(values.POSTGRES_DB)
      || !/^[a-z_][a-z0-9_]*$/.test(values.POSTGRES_USER)
      || (values.POSTGRES_PASSWORD?.length ?? 0) < 16
      || !/^[a-z0-9][a-z0-9_-]*$/.test(values.COMPOSE_PROJECT_NAME)
      || !Number.isInteger(Number(values.APP_PORT))
      || Number(values.APP_PORT) < 1 || Number(values.APP_PORT) > 65535) {
      throw new Error('Invalid environment')
    }
  }
  catch {
    throw new Error('Docker environment is incomplete or inconsistent. Check .env.docker locally; credentials are not printed.')
  }
  return values
}

export function requireDocker() {
  const result = spawnSync('docker', ['info', '--format', '{{.ServerVersion}}'], { encoding: 'utf8', timeout: 10_000 })
  if (result.error || result.status !== 0) {
    throw new Error('Docker CLI/engine is unavailable. Install/start Docker Desktop or Docker Engine with Compose v2, then retry.')
  }
}

export function composeOptions({ file = resolve(platformRoot, '.env.docker'), development = true, project } = {}) {
  const args = ['compose', '--env-file', file]
  if (project) args.push('--project-name', project)
  args.push('-f', resolve(platformRoot, 'docker-compose.yml'))
  if (development) args.push('-f', resolve(platformRoot, 'docker-compose.dev.yml'))
  return args
}

export function runDocker(args, capture = false) {
  const result = spawnSync('docker', args, {
    cwd: platformRoot,
    encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  })
  if (result.error || result.status !== 0) throw new Error('Docker operation failed; environment values are not printed. Check Docker availability and container logs.')
  return capture ? result.stdout.trim() : ''
}
