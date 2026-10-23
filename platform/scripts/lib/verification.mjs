import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createServer } from 'node:net'
import { setTimeout as delay } from 'node:timers/promises'

export async function freePort() {
  const socket = createServer()
  socket.listen(0, '127.0.0.1')
  await once(socket, 'listening')
  const address = socket.address()
  if (!address || typeof address === 'string') throw new Error('Unable to allocate a local verification port.')
  await new Promise((resolve, reject) => socket.close(error => error ? reject(error) : resolve()))
  return address.port
}

export async function waitForStatus(url, expected, timeout = 25_000) {
  const deadline = Date.now() + timeout
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) })
      if (response.status === expected) return response
    }
    catch {
      // The server or database may still be starting.
    }
    await delay(200)
  }
  throw new Error(`Readiness did not reach HTTP ${expected} in time.`)
}

export function startNodeServer(entry, databaseUrl, port) {
  const child = spawn(process.execPath, [entry], {
    env: {
      ...process.env,
      NODE_ENV: 'production',
      NITRO_HOST: '127.0.0.1',
      NITRO_PORT: String(port),
      DATABASE_URL: databaseUrl,
      NUXT_DATABASE_URL: '',
    },
    stdio: ['ignore', 'ignore', 'ignore'],
  })
  child.on('error', () => {})
  return child
}

export async function stopNodeServer(child) {
  if (child?.pid && child.exitCode === null && child.signalCode === null) {
    const exited = once(child, 'exit')
    child.kill()
    await exited
  }
}
