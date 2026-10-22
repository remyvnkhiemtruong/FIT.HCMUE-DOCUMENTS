import { spawn, type ChildProcess } from 'node:child_process'
import { once } from 'node:events'
import { existsSync } from 'node:fs'
import { createServer } from 'node:net'
import { fileURLToPath } from 'node:url'
import { setTimeout as delay } from 'node:timers/promises'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let server: ChildProcess | undefined
let baseUrl: string

beforeAll(async () => {
  const entry = fileURLToPath(new URL('../../.output/server/index.mjs', import.meta.url))
  if (!existsSync(entry)) {
    throw new Error('Build the platform first: npm run test:integration')
  }

  const reservation = createServer()
  reservation.listen(0, '127.0.0.1')
  await once(reservation, 'listening')
  const address = reservation.address()
  if (!address || typeof address === 'string') {
    throw new Error('Could not select a local test port')
  }
  const port = address.port
  await new Promise<void>((resolve, reject) => reservation.close(error => error ? reject(error) : resolve()))
  baseUrl = `http://127.0.0.1:${port}`

  server = spawn(process.execPath, [entry], {
    env: {
      ...process.env,
      NITRO_HOST: '127.0.0.1',
      NITRO_PORT: String(port),
      NODE_ENV: 'production',
      NUXT_PUBLIC_LEGACY_URL: 'https://example.org/legacy/',
      DATABASE_URL: '',
      NUXT_DATABASE_URL: '',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  let output = ''
  let startupError: Error | undefined
  server.on('error', error => startupError = error)
  server.stdout?.on('data', chunk => output = (output + String(chunk)).slice(-10_000))
  server.stderr?.on('data', chunk => output = (output + String(chunk)).slice(-10_000))
  const deadline = Date.now() + 20_000

  while (Date.now() < deadline) {
    if (startupError || server.exitCode !== null) {
      throw startupError ?? new Error(`Node server exited during startup: ${output}`)
    }
    try {
      const response = await fetch(`${baseUrl}/api/health`, { signal: AbortSignal.timeout(1000) })
      if (response.ok) return
    }
    catch {
      // Connection refusal is expected until Nitro starts listening.
    }
    await delay(100)
  }
  throw new Error(`Timed out waiting for the platform: ${output}`)
})

afterAll(async () => {
  if (server?.pid && server.exitCode === null && server.signalCode === null) {
    const exited = once(server, 'exit')
    server.kill()
    await exited
  }
})

describe('built Nuxt application over HTTP', () => {
  it('serves the health contract without cache or internal configuration', async () => {
    const response = await fetch(`${baseUrl}/api/health`)
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('application/json')
    expect(response.headers.get('cache-control')).toBe('no-store')
    expect(await response.json()).toEqual({ status: 'ok', service: 'fit-hcmue-learning-hub' })
  })

  it('server-renders the student portal without exposing protected content', async () => {
    const response = await fetch(baseUrl, { headers: { Accept: 'text/html' } })
    expect(response.status).toBe(200)
    const html = await response.text()
    expect(html).toContain('Kho học liệu Khoa Công nghệ Thông tin')
    expect(html).toContain('Đăng nhập')
    expect(html).toContain('lang="vi"')
    expect(html).toContain('name="robots" content="noindex, nofollow"')
  })

  it('returns a safe, non-cacheable 503 when database configuration is absent', async () => {
    const response = await fetch(`${baseUrl}/api/health/database`)
    expect(response.status).toBe(503)
    expect(response.headers.get('cache-control')).toBe('no-store')
    expect(await response.json()).toEqual({ status: 'error', database: 'unavailable' })
  })

  it('returns a real HTTP 404 with a safe custom error page', async () => {
    const response = await fetch(`${baseUrl}/trang-khong-ton-tai`, { headers: { Accept: 'text/html' } })
    expect(response.status).toBe(404)
    const html = await response.text()
    expect(html).toContain('Không tìm thấy trang')
    expect(html).toContain('Về trang chủ')
  })

  it.each(['/content-archive/original-pages.json', '/.env'])('does not serve repository-only file %s', async (path) => {
    const response = await fetch(`${baseUrl}${path}`)
    expect(response.status).toBe(404)
  })
})
