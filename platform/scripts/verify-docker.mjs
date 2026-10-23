import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  composeOptions,
  platformRoot,
  requireDocker,
  runDocker,
  writeDockerEnvironment,
} from './lib/environment.mjs'
import { freePort, waitForStatus } from './lib/verification.mjs'

let options
let cleanupOptions
let runDirectory

try {
  requireDocker()
  const project = `fit-hcmue-verify-${randomUUID()}`
  runDirectory = resolve(platformRoot, '.data/compose-validation', project)
  mkdirSync(runDirectory, { recursive: true, mode: 0o700 })
  const file = resolve(runDirectory, '.env.docker')
  const port = await freePort()
  writeDockerEnvironment(file, { project, port })
  options = composeOptions({ file, project, development: false })
  cleanupOptions = options
  runDocker([...options, 'config', '--quiet'])
  runDocker([
    ...options,
    'up',
    '--build',
    '--detach',
    '--wait',
    '--wait-timeout',
    '180',
  ])
  const endpoint = `http://127.0.0.1:${port}/api/health/database`
  assert.deepEqual(await (await waitForStatus(endpoint, 200)).json(), {
    status: 'ok',
    database: 'connected',
  })
  const marker = randomUUID()
  const sql = statement =>
    runDocker(
      [
        ...options,
        'exec',
        '-T',
        'postgres',
        'psql',
        '-U',
        'fit_hcmue',
        '-d',
        'fit_hcmue',
        '-v',
        'ON_ERROR_STOP=1',
        '-tAc',
        statement,
      ],
      true,
    )
  sql('CREATE TABLE environment_persistence_probe (id uuid PRIMARY KEY)')
  sql(`INSERT INTO environment_persistence_probe VALUES ('${marker}')`)
  runDocker([...options, 'restart', 'postgres'])
  await waitForStatus(endpoint, 200)
  assert.equal(
    sql(`SELECT id FROM environment_persistence_probe WHERE id = '${marker}'`),
    marker,
  )
  console.log(
    'PASS: production container connects and marker survives PostgreSQL restart.',
  )
  runDocker([...options, 'down'])
  runDocker([...options, 'up', '--detach', '--wait', '--wait-timeout', '180'])
  await waitForStatus(endpoint, 200)
  assert.equal(
    sql(`SELECT id FROM environment_persistence_probe WHERE id = '${marker}'`),
    marker,
  )
  console.log(
    'PASS: marker survives container removal/recreation using the named volume.',
  )

  const development = composeOptions({ file, project, development: true })
  cleanupOptions = development
  runDocker([
    ...development,
    'up',
    '--build',
    '--detach',
    '--wait',
    '--wait-timeout',
    '180',
  ])
  await waitForStatus(endpoint, 200)
  assert.equal(
    sql(`SELECT id FROM environment_persistence_probe WHERE id = '${marker}'`),
    marker,
  )
  console.log(
    'PASS: development image connects to the same retained database.',
  )
}
catch (error) {
  console.error(
    error instanceof assert.AssertionError
      ? 'FAIL: Docker persistence verification assertion failed.'
      : error.message,
  )
  process.exitCode = 1
}
finally {
  if (cleanupOptions) {
    try {
      runDocker([...cleanupOptions, 'down'])
    }
    catch {
      console.error(
        'Could not stop validation containers; inspect the isolated verification project.',
      )
      process.exitCode = 1
    }
  }
  if (runDirectory)
    console.log(
      `Verification environment retained at ${runDirectory}; the isolated named volume was not deleted.`,
    )
}
