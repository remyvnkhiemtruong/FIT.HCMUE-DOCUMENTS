import { createHash, randomUUID } from 'node:crypto'
import { mkdir, writeFile, stat } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'
import type { H3Event } from 'h3'
import {
  createError,
  getHeader,
  getQuery,
  setHeader,
  setResponseStatus,
  sendStream,
} from 'h3'
import type { Viewer } from '../../shared/types/platform'
import { sql, transaction } from './db'

export const storagePath = (id: string) => {
  if (!/^[a-f0-9-]{36}$/.test(id))
    throw createError({ statusCode: 404, message: 'Không tìm thấy tệp.' })
  return resolve(process.env.FILE_STORAGE_PATH || '.data/uploads', id)
}
export function detectMime(bytes: Buffer) {
  if (bytes.subarray(0, 5).toString() === '%PDF-') return 'application/pdf'
  if (
    bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  )
    return 'image/png'
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255)
    return 'image/jpeg'
  if (
    bytes.subarray(0, 4).toString() === 'RIFF'
    && bytes.subarray(8, 12).toString() === 'WEBP'
  )
    return 'image/webp'
  return null
}
export async function receiveFile(event: H3Event, userId: string) {
  const contribution = String(getQuery(event).contribution || '')
  const item = (
    await sql(
      'SELECT id FROM contributions WHERE id=$1 AND user_id=$2 AND state IN (\'draft\',\'changes_requested\')',
      [contribution, userId],
    )
  )[0]
  if (!item)
    throw createError({
      statusCode: 403,
      message: 'Chỉ được thêm tệp vào bản nháp của bạn.',
    })
  const count = await sql(
    'SELECT count(*)::int AS total FROM files WHERE contribution=$1',
    [contribution],
  )
  if (count[0]!.total >= 10)
    throw createError({
      statusCode: 400,
      message: 'Mỗi đóng góp nhận tối đa 10 tệp.',
    })
  const quota = await sql(
    'SELECT coalesce(sum(bytes),0)::bigint AS used FROM files WHERE user_id=$1',
    [userId],
  )
  if (Number(quota[0]!.used) >= 1024 * 1024 * 1024)
    throw createError({
      statusCode: 413,
      message: 'Tổng tệp đóng góp đã đạt giới hạn 1 GB. Liên hệ quản trị.',
    })
  const max = 50 * 1024 * 1024
  if (Number(getHeader(event, 'content-length')) > max)
    throw createError({ statusCode: 413, message: 'Tệp quá lớn.' })
  const chunks: Buffer[] = []
  let size = 0
  for await (const raw of event.node.req) {
    const chunk = Buffer.from(raw)
    size += chunk.length
    if (size > max)
      throw createError({ statusCode: 413, message: 'Tệp quá lớn.' })
    chunks.push(chunk)
  }
  const bytes = Buffer.concat(chunks),
    mime = detectMime(bytes)
  if (!mime || (mime !== 'application/pdf' && size > 10 * 1024 * 1024))
    throw createError({
      statusCode: 400,
      message: 'Chỉ nhận PDF tối đa 50 MB hoặc ảnh PNG/JPEG/WebP tối đa 10 MB.',
    })
  const id = randomUUID(),
    location = storagePath(id),
    name = decodeURIComponent(getHeader(event, 'x-file-name') || 'tai-lieu')
      .replace(/[\r\n\\/]/g, '_')
      .slice(0, 200)
  await mkdir(resolve(location, '..'), { recursive: true, mode: 0o700 })
  await writeFile(location, bytes, { flag: 'wx', mode: 0o600 })
  await transaction(async (client) => {
    await client.query(
      'INSERT INTO files(id,user_id,contribution,name,mime,bytes,checksum) VALUES($1,$2,$3,$4,$5,$6,$7)',
      [
        id,
        userId,
        contribution,
        name,
        mime,
        size,
        createHash('sha256').update(bytes).digest('hex'),
      ],
    )
    await client.query(
      'INSERT INTO jobs(id,kind,payload) VALUES($1,\'scan\',$2)',
      [randomUUID(), JSON.stringify({ id })],
    )
  })
  return { id, name, scan: 'pending' }
}
export async function deliverFile(event: H3Event, user: Viewer, id: string) {
  const row = (
    await sql(
      'SELECT f.*,c.user_id AS owner, r.published_revision,c.revision FROM files f JOIN contributions c ON c.id=f.contribution LEFT JOIN revisions v ON v.id=c.revision LEFT JOIN resources r ON r.id=v.resource WHERE f.id=$1',
      [id],
    )
  )[0]
  if (
    !row
    || row.scan !== 'clean'
    || !(
      row.owner === user.id
      || (row.approved && row.published_revision === row.revision)
    )
  )
    throw createError({
      statusCode: 404,
      message: 'Tệp chưa được phép truy cập.',
    })
  const location = storagePath(id),
    size = (await stat(location)).size
  setHeader(event, 'Content-Type', row.mime)
  setHeader(
    event,
    'Content-Disposition',
    `${row.mime.startsWith('image/') ? 'inline' : 'attachment'}; filename*=UTF-8''${encodeURIComponent(row.name)}`,
  )
  setHeader(event, 'Accept-Ranges', 'bytes')
  const range = getHeader(event, 'range')
  let start = 0,
    end = size - 1
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range)
    if (!match || (!match[1] && !match[2]))
      throw createError({
        statusCode: 416,
        message: 'Khoảng tải không hợp lệ.',
      })
    if (!match[1]) start = Math.max(0, size - Number(match[2]))
    else {
      start = Number(match[1])
      if (match[2]) end = Math.min(end, Number(match[2]))
    }
    if (start > end || start >= size) {
      setHeader(event, 'Content-Range', `bytes */${size}`)
      throw createError({
        statusCode: 416,
        message: 'Khoảng tải không hợp lệ.',
      })
    }
    setResponseStatus(event, 206)
    setHeader(event, 'Content-Range', `bytes ${start}-${end}/${size}`)
  }
  setHeader(event, 'Content-Length', end - start + 1)
  return sendStream(event, createReadStream(location, { start, end }))
}
