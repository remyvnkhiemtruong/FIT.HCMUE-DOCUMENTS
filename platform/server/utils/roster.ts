import { parse } from 'csv-parse/sync'
import { z } from 'zod'
import { normalizeStudentId } from '../../shared/utils/identity'

const entry = z
  .object({
    mssv: z.string().min(3).max(40),
    email: z.email().max(254),
    name: z.string().min(2).max(150),
    major: z.string().min(1).max(40),
    class: z.string().min(1).max(80),
    cohort: z.string().min(1).max(20),
  })
  .strict()
export function parseRoster(csv: string) {
  if (Buffer.byteLength(csv) > 2_000_000) throw new Error('Danh sách quá lớn.')
  const rows = parse(csv, {
    columns: true,
    bom: true,
    skip_empty_lines: true,
    trim: true,
    max_record_size: 4096,
  }) as unknown[]
  if (!rows.length || rows.length > 10000)
    throw new Error('Danh sách cần có từ 1 đến 10.000 dòng.')
  const ids = new Set<string>(),
    emails = new Set<string>()
  return rows.map((row, index) => {
    const data = entry.parse(row)
    const studentId = normalizeStudentId(data.mssv),
      email = data.email.toLowerCase()
    if (
      !/^[a-z0-9]+$/.test(studentId)
      || ids.has(studentId)
      || emails.has(email)
    )
      throw new Error(
        `Dòng ${index + 2}: MSSV hoặc email không hợp lệ hoặc trùng.`,
      )
    ids.add(studentId)
    emails.add(email)
    return { ...data, studentId, email }
  })
}
