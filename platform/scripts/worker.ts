import { randomUUID } from 'node:crypto'
import { createConnection } from 'node:net'
import { createReadStream } from 'node:fs'
import { setTimeout as delay } from 'node:timers/promises'
import nodemailer from 'nodemailer'
import { sql, transaction, closeBusinessDatabase } from '../server/utils/db'
import { storagePath } from '../server/utils/files'
import { renderMarkdown } from '../server/utils/render'

let running = true
process.on('SIGINT', () => {
  running = false
})
process.on('SIGTERM', () => {
  running = false
})
async function scan(id: string): Promise<boolean> {
  if (!process.env.CLAMD_HOST) throw new Error('Scanner not configured')
  return await new Promise<boolean>((resolve, reject) => {
    const socket = createConnection({
      host: process.env.CLAMD_HOST!,
      port: Number(process.env.CLAMD_PORT || 3310),
    })
    socket.setTimeout(120000, () => socket.destroy(new Error('Scan timeout')))
    let response = ''
    socket.on('error', reject)
    socket.on('data', (chunk) => {
      response += chunk.toString()
      if (response.length > 8192)
        socket.destroy(new Error('Invalid scanner response'))
    })
    socket.on('end', () => {
      if (/stream: OK/.test(response)) resolve(true)
      else if (/FOUND/.test(response)) resolve(false)
      else reject(new Error('Scan failed'))
    })
    socket.on('connect', async () => {
      try {
        socket.write('zINSTREAM\0')
        for await (const chunk of createReadStream(storagePath(id), {
          highWaterMark: 16384,
        })) {
          const bytes = Buffer.from(chunk),
            length = Buffer.alloc(4)
          length.writeUInt32BE(bytes.length)
          socket.write(length)
          if (!socket.write(bytes))
            await new Promise<void>(done => socket.once('drain', done))
        }
        socket.write(Buffer.alloc(4))
      }
      catch {
        socket.destroy(new Error('Scan failed'))
      }
    })
  })
}
while (running) {
  try {
    const job = await transaction(async (client) => {
      await client.query(
        'UPDATE jobs SET state=\'pending\',locked_at=NULL WHERE state=\'running\' AND locked_at<now()-interval \'10 minutes\'',
      )
      return (
        await client.query(
          'UPDATE jobs SET state=\'running\',locked_at=now(),tries=tries+1 WHERE id=(SELECT id FROM jobs WHERE state=\'pending\' AND run_at<=now() ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT 1) RETURNING *',
        )
      ).rows[0]
    })
    if (!job) {
      if (process.argv.includes('--once')) break
      await delay(1000)
      continue
    }
    try {
      if (job.kind === 'email') {
        if (!process.env.SMTP_URL || !process.env.MAIL_FROM)
          throw new Error('Email not configured')
        await nodemailer.createTransport(process.env.SMTP_URL).sendMail({
          from: process.env.MAIL_FROM,
          to: job.payload.to,
          subject: job.payload.subject,
          text: job.payload.text,
        })
      }
      else if (job.kind === 'render') {
        const revision = (
          await sql('SELECT markdown FROM revisions WHERE id=$1', [
            job.payload.id,
          ])
        )[0]
        if (!revision) throw new Error('Missing revision')
        await sql('UPDATE revisions SET html=$2 WHERE id=$1', [
          job.payload.id,
          renderMarkdown(revision.markdown),
        ])
      }
      else if (job.kind === 'scan')
        await sql('UPDATE files SET scan=$2 WHERE id=$1', [
          job.payload.id,
          (await scan(job.payload.id)) ? 'clean' : 'infected',
        ])
      else throw new Error('Unknown job')
      await sql(
        'UPDATE jobs SET state=\'done\',payload=\'{}\'::jsonb,locked_at=NULL WHERE id=$1',
        [job.id],
      )
    }
    catch {
      await sql(
        'UPDATE jobs SET state=$2,run_at=now()+interval \'1 minute\' * power(2,least(tries,8)),locked_at=NULL WHERE id=$1',
        [job.id, job.tries >= 5 ? 'failed' : 'pending'],
      )
      console.error('Background job failed', { id: job.id, kind: job.kind })
    }
  }
  catch {
    console.error('Worker unavailable', { event: randomUUID() })
    if (process.argv.includes('--once')) {
      process.exitCode = 1
      break
    }
    await delay(3000)
  }
}
await closeBusinessDatabase()
