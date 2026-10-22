import assert from 'node:assert/strict'
import { randomBytes, randomUUID } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import {
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  writeFileSync,
} from 'node:fs'
import { resolve } from 'node:path'
import { parseArgs } from 'node:util'
import pg from 'pg'
import { platformRoot } from './lib/environment.mjs'
import {
  freePort,
  startNodeServer,
  stopNodeServer,
  waitForStatus,
} from './lib/verification.mjs'

let child
let started = false
let pgControl
let dataDirectory
let runDirectory

function binary(command, args) {
  // On Windows, postgres may inherit pg_ctl pipe handles and keep spawnSync waiting.
  // A file descriptor avoids waiting for the long-lived server to close those pipes.
  const log = openSync(resolve(runDirectory, 'commands.log'), 'a', 0o600)
  try {
    const result = spawnSync(command, args, {
      stdio: ['ignore', log, log],
      timeout: 120_000,
    })
    if (result.error || result.status !== 0)
      throw new Error(
        'PostgreSQL validation command failed. Check binary access and the retained local cluster log; credentials are not printed.',
      )
  }
  finally {
    closeSync(log)
  }
}

try {
  const { values } = parseArgs({ options: { bin: { type: 'string' } } })
  if (!values.bin)
    throw new Error(
      'Supply --bin pointing to an installed PostgreSQL bin directory.',
    )
  const suffix = process.platform === 'win32' ? '.exe' : ''
  const initdb = resolve(values.bin, `initdb${suffix}`)
  pgControl = resolve(values.bin, `pg_ctl${suffix}`)
  const entry = resolve(platformRoot, '.output/server/index.mjs')
  if (![initdb, pgControl, entry].every(existsSync))
    throw new Error(
      'PostgreSQL binaries or built Nuxt output missing. Build the platform before verification.',
    )

  runDirectory = resolve(
    platformRoot,
    '.data/postgres-validation',
    randomUUID(),
  )
  dataDirectory = resolve(runDirectory, 'cluster')
  mkdirSync(runDirectory, { recursive: true, mode: 0o700 })
  const password = randomBytes(32).toString('hex')
  const passwordFile = resolve(runDirectory, 'password.txt')
  writeFileSync(passwordFile, password + '\n', { flag: 'wx', mode: 0o600 })
  const port = await freePort()
  const url = `postgresql://hub_validation:${password}@127.0.0.1:${port}/postgres`
  writeFileSync(
    resolve(runDirectory, 'connection.env'),
    `DATABASE_URL=${url}\n`,
    { flag: 'wx', mode: 0o600 },
  )
  binary(initdb, [
    '-D',
    dataDirectory,
    '-U',
    'hub_validation',
    '--auth=scram-sha-256',
    `--pwfile=${passwordFile}`,
    '--encoding=UTF8',
    '--locale=C',
  ])
  const start = () => {
    binary(pgControl, [
      '-D',
      dataDirectory,
      '-l',
      resolve(runDirectory, 'postgres.log'),
      '-o',
      `-h 127.0.0.1 -p ${port}${process.platform === 'win32' ? '' : ' -c unix_socket_directories='}`,
      '-w',
      'start',
    ])
    started = true
  }
  const stop = () => {
    binary(pgControl, ['-D', dataDirectory, '-m', 'fast', '-w', 'stop'])
    started = false
  }
  const query = async (sql, parameters = []) => {
    const client = new pg.Client({
      connectionString: url,
      connectionTimeoutMillis: 3000,
    })
    try {
      await client.connect()
      return await client.query(sql, parameters)
    }
    finally {
      await client.end().catch(() => {})
    }
  }
  start()
  console.log(
    `Native PostgreSQL version: ${(await query('SHOW server_version')).rows[0].server_version}`,
  )
  const marker = randomUUID()
  await query(
    'CREATE TABLE environment_persistence_probe (id uuid PRIMARY KEY)',
  )
  await query('INSERT INTO environment_persistence_probe (id) VALUES ($1)', [
    marker,
  ])

  const appPort = await freePort()
  child = startNodeServer(entry, url, appPort)
  const endpoint = `http://127.0.0.1:${appPort}/api/health/database`
  assert.deepEqual(await (await waitForStatus(endpoint, 200)).json(), {
    status: 'ok',
    database: 'connected',
  })
  const page = await (
    await fetch(`http://127.0.0.1:${appPort}/`, {
      headers: { Accept: 'text/html' },
    })
  ).text()
  assert.ok(!page.includes(password) && !page.includes(url))
  const checkScript = resolve(platformRoot, 'scripts/check-database.mjs')
  const checkFromCli = () =>
    spawnSync(process.execPath, [checkScript], {
      env: { ...process.env, DATABASE_URL: url, NUXT_DATABASE_URL: '' },
      encoding: 'utf8',
      timeout: 10_000,
    })
  assert.equal(checkFromCli().status, 0)
  console.log(
    'PASS: built Nuxt connected to PostgreSQL using SCRAM credentials.',
  )
  stop()
  const unavailable = await (await waitForStatus(endpoint, 503)).text()
  assert.deepEqual(JSON.parse(unavailable), {
    status: 'error',
    database: 'unavailable',
  })
  assert.ok(!unavailable.includes(password) && !unavailable.includes(url))
  assert.equal(
    (await fetch(`http://127.0.0.1:${appPort}/api/health`)).status,
    200,
  )
  const failedCheck = checkFromCli()
  assert.equal(failedCheck.status, 1)
  assert.ok(
    !failedCheck.stderr.includes(password) && !failedCheck.stderr.includes(url),
  )
  console.log(
    'PASS: database outage gives safe HTTP 503; application liveness remains HTTP 200.',
  )
  start()
  await waitForStatus(endpoint, 200)
  assert.equal(
    (
      await query(
        'SELECT id FROM environment_persistence_probe WHERE id = $1',
        [marker],
      )
    ).rows[0]?.id,
    marker,
  )
  console.log(
    'PASS: marker survived PostgreSQL stop/start; Nuxt pool reconnected.',
  )
}
catch (error) {
  // Assertions deliberately avoid printing connection strings or process environments.
  console.error(
    error instanceof assert.AssertionError
      ? 'FAIL: PostgreSQL verification assertion failed.'
      : error.message,
  )
  process.exitCode = 1
}
finally {
  await stopNodeServer(child)
  if (started) {
    try {
      binary(pgControl, ['-D', dataDirectory, '-m', 'fast', '-w', 'stop'])
    }
    catch {
      console.error(
        'Could not stop the isolated validation cluster; check its local log.',
      )
      process.exitCode = 1
    }
  }
  if (runDirectory)
    console.log(`Validation files retained (ignored by Git): ${runDirectory}`)
}
