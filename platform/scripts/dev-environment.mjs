import { resolve } from 'node:path'
import {
  composeOptions,
  platformRoot,
  readDockerEnvironment,
  requireDocker,
  runDocker,
  writeDockerEnvironment,
} from './lib/environment.mjs'

try {
  const action = process.argv[2] || 'up'
  if (!['init', 'up', 'down', 'logs'].includes(action))
    throw new Error('Use init, up, down or logs.')
  const file = resolve(platformRoot, '.env.docker')
  const created = writeDockerEnvironment(file)
  const values = readDockerEnvironment(file)
  if (action === 'init') {
    console.log(
      created
        ? 'Created private .env.docker with random development credentials.'
        : 'Kept existing .env.docker unchanged.',
    )
  }
  else {
    requireDocker()
    const base = composeOptions({ file })
    runDocker([...base, 'config', '--quiet'])
    if (action === 'up') {
      runDocker([
        ...base,
        'up',
        '--build',
        '--detach',
        '--wait',
        '--wait-timeout',
        '180',
      ])
      console.log(
        `Development environment ready: http://127.0.0.1:${values.APP_PORT}`,
      )
    }
    else if (action === 'down') {
      runDocker([...base, 'down'])
      console.log(
        'Containers stopped/removed; the PostgreSQL named volume is retained.',
      )
    }
    else {
      runDocker([...base, 'logs', '--follow', '--tail', '100'])
    }
  }
}
catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
