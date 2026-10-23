import { randomUUID, createHash } from 'node:crypto'
import { z } from 'zod'
import { sql, transaction } from '../../utils/db'
import { checkOrigin, requireViewer, viewer } from '../../utils/access'
import { renderMarkdown } from '../../utils/render'
import { parseRoster } from '../../utils/roster'
import {
  normalizeSearch,
  normalizeStudentId,
} from '../../../shared/utils/identity'
import { auth } from '../../utils/auth'
import { receiveFile, deliverFile } from '../../utils/files'

const text = z.string().trim().min(1).max(1000)
const article = z.string().min(1).max(1_000_000)
const contributionInput = z.object({
  title: text,
  body: article,
  resource: z.string().max(200).nullable().optional(),
  version: z.number().int().nonnegative().optional(),
})
const fail = (statusCode: number, message: string): never => {
  throw createError({ statusCode, message })
}
const log = async (actor: string, action: string, target: string) =>
  sql('INSERT INTO audit(id,actor,action,target) VALUES($1,$2,$3,$4)', [
    randomUUID(),
    actor,
    action,
    target,
  ])

async function listPage(
  query: string,
  pageValue: unknown,
  values: unknown[] = [],
) {
  const page = z.coerce
    .number()
    .int()
    .min(1)
    .max(10000)
    .parse(pageValue || 1)
  const [count, items] = await Promise.all([
    sql(`SELECT count(*)::int total FROM (${query}) results`, values),
    sql(`${query} LIMIT 50 OFFSET $${values.length + 1}`, [
      ...values,
      (page - 1) * 50,
    ]),
  ])
  return { items, total: count[0]!.total, page, pageSize: 50 }
}

export default defineEventHandler(async (event): Promise<unknown> => {
  checkOrigin(event)
  const path = (getRouterParam(event, 'path') || '').split('/').filter(Boolean)
  const route = path.join('/'),
    method = event.method,
    query = getQuery(event)
  const body = async <T>(schema: z.ZodType<T>) =>
    schema.parse(await readBody(event))
  try {
    if (method === 'GET' && route === 'anchors') {
      const path = z.string().max(2000).parse(query.path)
      return {
        ids: (
          await sql('SELECT id FROM legacy_anchors WHERE path=$1', [
            path.replace(/\/$/, '') || '/',
          ])
        ).map(r => r.id),
      }
    }
    if (method === 'GET' && route === 'me')
      return { user: await viewer(event) }
    if (method === 'GET' && route === 'catalog') {
      const [majors, courses, placements, cohorts, topics] = await Promise.all([
        sql('SELECT data FROM majors ORDER BY id'),
        sql('SELECT data FROM courses ORDER BY code'),
        sql(
          'SELECT p.data FROM placements p ORDER BY p.program,p.term,p.course',
        ),
        sql('SELECT data FROM cohorts ORDER BY id'),
        sql('SELECT * FROM topics ORDER BY id'),
      ])
      return {
        majors: majors.map(r => r.data),
        courses: courses.map(r => r.data),
        placements: placements.map(r => r.data),
        cohorts: cohorts.map(r => r.data),
        topics,
        materialCourses: (
          await sql(
            'SELECT DISTINCT course FROM resources WHERE published_revision IS NOT NULL AND course IS NOT NULL',
          )
        ).map(r => r.course),
      }
    }
    if (method === 'GET' && route === 'resources') {
      const filter = z
        .object({
          q: z.string().max(200).default(''),
          course: z.string().max(30).default(''),
          major: z.string().max(40).default(''),
          term: z
            .string()
            .regex(/^$|^[1-8]$/)
            .default(''),
          topic: z.string().max(100).default(''),
          kind: z.string().max(60).default(''),
          year: z.string().max(30).default(''),
          page: z.coerce.number().int().min(1).max(10000).default(1),
        })
        .parse(query)
      const values: unknown[] = []
      const where: string[] = [
        '(r.published_revision IS NOT NULL OR r.data ? \'status\')',
      ]
      const bind = (value: unknown) => {
        values.push(value)
        return `$${values.length}`
      }
      for (const key of ['course', 'topic', 'kind', 'year'] as const)
        if (filter[key]) where.push(`r.${key}=${bind(filter[key])}`)
      if (filter.major || filter.term) {
        const placement = ['p.course=r.course']
        if (filter.major) placement.push(`g.major=${bind(filter.major)}`)
        if (filter.term) placement.push(`p.term=${bind(Number(filter.term))}`)
        where.push(
          `EXISTS(SELECT 1 FROM placements p JOIN programs g ON g.id=p.program WHERE ${placement.join(' AND ')})`,
        )
      }
      if (filter.q) {
        const search = bind(
          '%' + normalizeSearch(filter.q).replace(/[\\%_]/g, '\\$&') + '%',
        )
        const canRead = await viewer(event)
        const content = canRead
          ? ` OR EXISTS(SELECT 1 FROM revisions v WHERE v.id=r.published_revision AND lower(unaccent(v.markdown)) LIKE ${search} ESCAPE '\\')`
          : ''
        where.push(
          `(lower(unaccent(coalesce(r.course,'')||' '||r.title||' '||coalesce(c.name,''))) LIKE ${search} ESCAPE '\\'${content})`,
        )
      }
      const condition = where.length ? `WHERE ${where.join(' AND ')}` : ''
      const count = await sql(
        `SELECT count(*)::int AS total FROM resources r LEFT JOIN courses c ON c.code=r.course ${condition}`,
        values,
      )
      const ranking = filter.q
        ? `CASE WHEN lower(r.course)=${bind(normalizeSearch(filter.q))} THEN 0 WHEN position(${bind(normalizeSearch(filter.q))} in lower(unaccent(r.title)))>0 THEN 1 ELSE 2 END,`
        : ''
      const items = await sql(
        `SELECT r.id,r.course,r.topic,r.title,r.path,r.kind,r.year,(r.published_revision IS NOT NULL) AS available FROM resources r LEFT JOIN courses c ON c.code=r.course ${condition} ORDER BY ${ranking}r.course NULLS LAST,r.position,r.id LIMIT 15 OFFSET ${bind((filter.page - 1) * 15)}`,
        values,
      )
      return { items, total: count[0]!.total, page: filter.page, pageSize: 15 }
    }
    if (method === 'GET' && route === 'resolve') {
      const original = z.string().max(2000).parse(query.path)
      let target
        = original
          .replace(/^\/FIT\.HCMUE-DOCUMENTS(?=\/|$)/, '')
          .replace(/\.html$/, '')
          .replace(/\/index$/, '/') || '/'
      const visited = new Set<string>()
      for (let i = 0; i < 8; i++) {
        if (visited.has(target)) break
        visited.add(target)
        const alias = await sql(
          'SELECT target FROM aliases WHERE path=$1 OR path=$2 LIMIT 1',
          [target, target.replace(/\/$/, '')],
        )
        if (!alias.length) break
        target = alias[0]!.target
      }
      const resources = await sql(
        'SELECT id,path FROM resources WHERE rtrim(path,\'/\')=rtrim($1,\'/\')',
        [target],
      )
      return {
        target,
        resource: resources[0] || null,
        support: !!(
          await sql(
            'SELECT path FROM support_pages WHERE rtrim(path,\'/\')=rtrim($1,\'/\')',
            [target],
          )
        ).length,
      }
    }
    if (method === 'GET' && path[0] === 'resources' && path.length === 2) {
      await requireViewer(event)
      const rows = await sql(
        'SELECT r.*,v.html,v.source,v.academic_verified,v.rights,v.id AS revision FROM resources r JOIN revisions v ON v.id=r.published_revision WHERE r.id=$1',
        [path[1]],
      )
      const resource = rows[0] || fail(404, 'Tài liệu chưa được xuất bản.')
      const related = await sql(
        'SELECT id,title,path FROM resources WHERE published_revision IS NOT NULL AND (course=$1 OR (course IS NULL AND topic=$2)) ORDER BY position,id',
        [resource.course, resource.topic],
      )
      return { ...resource, related }
    }
    if (method === 'GET' && route === 'support') {
      await requireViewer(event)
      const rows = await sql('SELECT html FROM support_pages WHERE path=$1', [
        z.string().max(1000).parse(query.path),
      ])
      return rows[0] || fail(404, 'Không có trang này.')
    }
    if (method === 'GET' && route === 'roadmap') {
      await requireViewer(event)
      return {
        tasks: await sql('SELECT * FROM tasks ORDER BY position'),
        html:
          (await sql('SELECT html FROM support_pages WHERE path=\'/roadmap\''))[0]
            ?.html || '',
      }
    }
    if (method === 'GET' && route === 'quiz') {
      await requireViewer(event)
      const quiz
        = (await sql('SELECT * FROM quizzes WHERE id=$1', ['math-review']))[0]
          || fail(404, 'Chưa có bài luyện tập.')
      return {
        id: quiz.id,
        revision: quiz.revision,
        questions: (quiz.data as Record<string, unknown>[]).map(
          ({ answer: _answer, explanation: _explanation, ...item }) => item,
        ),
      }
    }
    if (method === 'POST' && route === 'quiz/attempts') {
      const user = await requireViewer(event)
      const input = await body(
        z.object({
          revision: text,
          answers: z.record(z.string(), z.string().max(20)),
        }),
      )
      const quiz
        = (await sql('SELECT * FROM quizzes WHERE id=$1', ['math-review']))[0]
          || fail(404, 'Chưa có bài luyện tập.')
      if (quiz.revision !== input.revision)
        fail(409, 'Câu hỏi đã được cập nhật. Vui lòng tải lại bài.')
      const questions = quiz.data as {
        id: number
        answer: string
        explanation: string
        options: { id: string }[]
      }[]
      if (
        Object.keys(input.answers).length !== questions.length
        || questions.some(
          q => !q.options.some(o => o.id === input.answers[q.id]),
        )
      )
        fail(400, 'Vui lòng trả lời đủ các câu hỏi.')
      const score = questions.filter(
        q => input.answers[q.id] === q.answer,
      ).length
      const id = randomUUID()
      await sql(
        'INSERT INTO attempts(id,user_id,quiz,revision,answers,score,total) VALUES($1,$2,$3,$4,$5,$6,$7)',
        [
          id,
          user.id,
          quiz.id,
          quiz.revision,
          JSON.stringify(input.answers),
          score,
          questions.length,
        ],
      )
      return {
        id,
        score,
        total: questions.length,
        solutions: questions.map(q => ({
          id: q.id,
          answer: q.answer,
          explanation: q.explanation,
        })),
      }
    }
    if (method === 'GET' && (route === 'me/state' || route === 'me/export')) {
      const user = await requireViewer(event)
      const [progress, bookmarks, attempts, profile] = await Promise.all([
        sql(
          'SELECT key,complete,version,updated_at FROM progress WHERE user_id=$1',
          [user.id],
        ),
        sql(
          'SELECT r.id,r.title,r.path FROM bookmarks b JOIN resources r ON r.id=b.resource WHERE b.user_id=$1 ORDER BY b.created_at DESC',
          [user.id],
        ),
        sql(
          'SELECT id,quiz,revision,score,total,created_at FROM attempts WHERE user_id=$1 ORDER BY created_at DESC'
          + (route === 'me/export' ? '' : ' LIMIT 100'),
          [user.id],
        ),
        sql(
          'SELECT display_id,name,major,class_name,cohort FROM roster WHERE email=$1',
          [user.email],
        ),
      ])
      if (route === 'me/export')
        setHeader(
          event,
          'Content-Disposition',
          'attachment; filename="tien-do.json"',
        )
      return { schema: 1, profile: profile[0], progress, bookmarks, attempts }
    }
    if (method === 'PUT' && path[0] === 'progress' && path.length === 2) {
      const user = await requireViewer(event)
      const input = await body(
        z.object({
          complete: z.boolean(),
          version: z.number().int().nonnegative(),
        }),
      )
      const key = z.string().max(200).parse(path[1])
      if (
        !(
          await sql(
            'SELECT id FROM tasks WHERE id=$1 UNION SELECT id FROM resources WHERE id=$1',
            [key],
          )
        ).length
      )
        fail(404, 'Mục học không tồn tại.')
      const rows = await sql(
        'INSERT INTO progress(user_id,key,complete,version) SELECT $1,$2,$3,1 WHERE $4=0 ON CONFLICT(user_id,key) DO UPDATE SET complete=$3,version=progress.version+1,updated_at=now() WHERE progress.version=$4 RETURNING key,complete,version',
        [user.id, key, input.complete, input.version],
      )
      // Existing rows require a separate update when the insert predicate is false.
      if (!rows.length && input.version > 0) {
        const updated = await sql(
          'UPDATE progress SET complete=$3,version=version+1,updated_at=now() WHERE user_id=$1 AND key=$2 AND version=$4 RETURNING key,complete,version',
          [user.id, key, input.complete, input.version],
        )
        return (
          updated[0]
          || fail(
            409,
            'Tiến độ đã thay đổi trên thiết bị khác. Tải lại để đối chiếu.',
          )
        )
      }
      return (
        rows[0]
        || fail(
          409,
          'Tiến độ đã thay đổi trên thiết bị khác. Tải lại để đối chiếu.',
        )
      )
    }
    if (method === 'POST' && route === 'me/import') {
      const user = await requireViewer(event)
      const input = await body(
        z.object({
          schema: z.literal(1),
          progress: z
            .array(
              z.object({ key: z.string().max(200), complete: z.boolean() }),
            )
            .max(1000),
          commit: z.boolean().default(false),
        }),
      )
      const valid = new Set(
        (await sql('SELECT id FROM tasks')).map(r => r.id),
      )
      if (
        new Set(input.progress.map(r => r.key)).size
          !== input.progress.length
          || input.progress.some(r => !valid.has(r.key))
      )
        fail(400, 'Tệp tiến độ có mục không hợp lệ hoặc trùng.')
      const existing = new Set(
        (await sql('SELECT key FROM progress WHERE user_id=$1', [user.id])).map(
          r => r.key,
        ),
      )
      const additions = input.progress.filter(r => !existing.has(r.key))
      if (input.commit)
        await transaction(async (client) => {
          for (const r of additions)
            await client.query(
              'INSERT INTO progress(user_id,key,complete) VALUES($1,$2,$3) ON CONFLICT DO NOTHING',
              [user.id, r.key, r.complete],
            )
        })
      return {
        added: additions.length,
        kept: input.progress.length - additions.length,
        items: additions,
        committed: input.commit,
      }
    }
    if (
      path[0] === 'bookmarks'
      && path.length === 2
      && ['PUT', 'DELETE'].includes(method)
    ) {
      const user = await requireViewer(event)
      if (method === 'PUT')
        await sql(
          'INSERT INTO bookmarks(user_id,resource) VALUES($1,$2) ON CONFLICT DO NOTHING',
          [user.id, path[1]],
        )
      else
        await sql('DELETE FROM bookmarks WHERE user_id=$1 AND resource=$2', [
          user.id,
          path[1],
        ])
      return { ok: true }
    }
    if (method === 'POST' && route === 'preview') {
      await requireViewer(event)
      return {
        html: renderMarkdown(
          (await body(z.object({ markdown: article }))).markdown,
        ),
      }
    }
    if (route === 'contributions' && method === 'GET') {
      const user = await requireViewer(event)
      return listPage(
        'SELECT * FROM contributions WHERE user_id=$1 ORDER BY created_at DESC',
        query.page,
        [user.id],
      )
    }
    if (route === 'contributions' && method === 'POST') {
      const user = await requireViewer(event),
        input = await body(contributionInput),
        id = randomUUID()
      await sql(
        'INSERT INTO contributions(id,user_id,resource,title,body) VALUES($1,$2,$3,$4,$5)',
        [id, user.id, input.resource || null, input.title, input.body],
      )
      return { id, version: 1 }
    }
    if (path[0] === 'contributions' && path.length === 2 && method === 'PUT') {
      const user = await requireViewer(event),
        input = await body(contributionInput)
      const rows = await sql(
        'UPDATE contributions SET title=$3,body=$4,version=version+1,state=\'draft\' WHERE id=$1 AND user_id=$2 AND version=$5 AND state IN (\'draft\',\'changes_requested\') RETURNING id,version',
        [path[1], user.id, input.title, input.body, input.version],
      )
      return (
        rows[0]
        || fail(409, 'Không thể sửa bản này. Tải lại để xem trạng thái mới.')
      )
    }
    if (
      path[0] === 'contributions'
      && path[2] === 'submit'
      && method === 'POST'
    ) {
      const user = await requireViewer(event)
      return await transaction(async (client) => {
        const item
          = (
            await client.query(
              'SELECT * FROM contributions WHERE id=$1 AND user_id=$2 FOR UPDATE',
              [path[1], user.id],
            )
          ).rows[0] || fail(404, 'Không tìm thấy đóng góp.')
        if (!['draft', 'changes_requested'].includes(item.state))
          fail(409, 'Đóng góp đã được gửi.')
        const id = randomUUID(),
          resource = item.resource || `contribution-${item.id}`
        if (!item.resource)
          await client.query(
            'INSERT INTO resources(id,title,path,kind,data) VALUES($1,$2,$3,\'ly-thuyet\',$4) ON CONFLICT DO NOTHING',
            [
              resource,
              item.title,
              `/bai-viet/${item.id}`,
              JSON.stringify({ source: 'Sinh viên đóng góp', verified: false }),
            ],
          )
        await client.query(
          'INSERT INTO revisions(id,resource,author,title,markdown,html,source_hash,state,source) VALUES($1,$2,$3,$4,$5,$6,$7,\'pending\',\'Sinh viên đóng góp\')',
          [
            id,
            resource,
            user.id,
            item.title,
            item.body,
            '',
            createHash('sha256').update(item.body).digest('hex'),
          ],
        )
        await client.query(
          'INSERT INTO jobs(id,kind,payload) VALUES($1,\'render\',$2)',
          [randomUUID(), JSON.stringify({ id })],
        )
        await client.query(
          'UPDATE contributions SET revision=$2,state=\'pending\',version=version+1 WHERE id=$1',
          [item.id, id],
        )
        return { id, state: 'pending' }
      })
    }
    if (route === 'files' && method === 'POST') {
      const user = await requireViewer(event)
      return await receiveFile(event, user.id)
    }
    if (path[0] === 'files' && path.length === 2 && method === 'GET') {
      const user = await requireViewer(event)
      return await deliverFile(event, user, path[1]!)
    }
    if (route === 'reports' && method === 'POST') {
      const user = await requireViewer(event),
        input = await body(z.object({ resource: text, body: text }))
      await sql(
        'INSERT INTO reports(id,user_id,resource,body) VALUES($1,$2,$3,$4)',
        [randomUUID(), user.id, input.resource, input.body],
      )
      return { ok: true }
    }
    if (path[0] === 'admin') {
      const user = await requireViewer(
        event,
        ['roster', 'profile', 'users', 'invite', 'audit', 'jobs'].includes(
          path[1] || '',
        )
          ? 'admin'
          : 'editor',
      )
      if (route === 'admin/dashboard' && method === 'GET')
        return {
          pending: (
            await sql(
              'SELECT count(*)::int AS count FROM revisions WHERE state=\'pending\'',
            )
          )[0]!.count,
          reports: (
            await sql(
              'SELECT count(*)::int AS count FROM reports WHERE state=\'open\'',
            )
          )[0]!.count,
          jobs:
            user.role === 'admin'
              ? await sql(
                  'SELECT kind,state,count(*)::int AS count FROM jobs GROUP BY kind,state',
                )
              : [],
        }
      if (route === 'admin/revisions' && method === 'GET')
        return listPage(
          'SELECT v.*,r.path FROM revisions v JOIN resources r ON r.id=v.resource ORDER BY v.created_at DESC',
          query.page,
        )
      if (route === 'admin/review' && method === 'POST') {
        const input = await body(
          z.object({
            id: text,
            state: z.enum(['published', 'changes_requested', 'archived']),
            note: z.string().max(4000).default(''),
            rights: z.enum(['unreviewed', 'permitted', 'restricted']),
            academicVerified: z.boolean(),
          }),
        )
        return await transaction(async (client) => {
          const revision
            = (
              await client.query(
                'SELECT * FROM revisions WHERE id=$1 FOR UPDATE',
                [input.id],
              )
            ).rows[0] || fail(404, 'Không có phiên bản này.')
          if (user.role !== 'admin' && revision.author === user.id)
            fail(403, 'Không được tự duyệt bài của mình.')
          if (input.state === 'published' && !revision.html)
            fail(409, 'Nội dung đang chờ xử lý hoặc dựng thất bại.')
          if (input.state === 'published' && input.rights !== 'permitted')
            fail(400, 'Cần xác nhận quyền sử dụng trước khi xuất bản.')
          if (
            input.state === 'published'
            && (
              await client.query(
                'SELECT 1 FROM files f JOIN contributions c ON c.id=f.contribution WHERE c.revision=$1 AND f.scan<>\'clean\'',
                [input.id],
              )
            ).rowCount
          )
            fail(409, 'Tệp đính kèm chưa vượt qua kiểm tra.')
          await client.query(
            'UPDATE revisions SET state=$2,review_note=$3,reviewer=$4,rights=$5,academic_verified=$6 WHERE id=$1',
            [
              input.id,
              input.state,
              input.note,
              user.id,
              input.rights,
              input.academicVerified,
            ],
          )
          if (input.state === 'published') {
            await client.query(
              'UPDATE resources SET published_revision=$2,title=$3 WHERE id=$1',
              [revision.resource, revision.id, revision.title],
            )
            await client.query(
              'UPDATE files SET approved=true WHERE contribution IN (SELECT id FROM contributions WHERE revision=$1) AND scan=\'clean\'',
              [input.id],
            )
          }
          if (input.state === 'archived')
            await client.query(
              'UPDATE resources SET published_revision=NULL WHERE id=$1 AND published_revision=$2',
              [revision.resource, input.id],
            )
          await client.query(
            'UPDATE contributions SET state=$2,review_note=$3 WHERE revision=$1',
            [input.id, input.state, input.note],
          )
          await client.query(
            'INSERT INTO audit(id,actor,action,target) VALUES($1,$2,$3,$4)',
            [randomUUID(), user.id, input.state, input.id],
          )
          return { ok: true }
        })
      }
      if (route === 'admin/roster' && method === 'GET')
        return listPage(
          'SELECT student_id,display_id,email,name,major,class_name,cohort,active,role FROM roster ORDER BY student_id',
          query.page,
        )
      if (route === 'admin/profile' && method === 'PUT') {
        const input = await body(
          z.object({
            currentId: text,
            studentId: text,
            email: z.email(),
            name: text,
            major: text,
            className: text,
            cohort: text,
          }),
        )
        const studentId = normalizeStudentId(input.studentId),
          email = input.email.toLowerCase()
        if (!/^[a-z0-9]+$/.test(studentId)) fail(400, 'MSSV không hợp lệ.')
        const result = await transaction(async (client) => {
          const profile
            = (
              await client.query(
                'SELECT * FROM roster WHERE student_id=$1 FOR UPDATE',
                [normalizeStudentId(input.currentId)],
              )
            ).rows[0] || fail(404, 'Không tìm thấy hồ sơ.')
          const account = (
            await client.query('SELECT id FROM "user" WHERE email=$1', [
              profile.email,
            ])
          ).rows[0]
          const changedEmail = email !== profile.email
          await client.query(
            'UPDATE roster SET student_id=$2,display_id=$3,email=$4,name=$5,major=$6,class_name=$7,cohort=$8 WHERE student_id=$1',
            [
              profile.student_id,
              studentId,
              input.studentId,
              email,
              input.name,
              input.major,
              input.className,
              input.cohort,
            ],
          )
          if (account) {
            await client.query(
              'UPDATE "user" SET email=$2,name=$3,email_verified=CASE WHEN $4 THEN false ELSE email_verified END WHERE id=$1',
              [account.id, email, input.name, changedEmail],
            )
            await client.query('DELETE FROM session WHERE user_id=$1', [
              account.id,
            ])
            await client.query('DELETE FROM verification WHERE value=$1', [
              account.id,
            ])
          }
          await client.query(
            'INSERT INTO audit(id,actor,action,target) VALUES($1,$2,\'profile_update\',$3)',
            [randomUUID(), user.id, account?.id || 'roster'],
          )
          return { changedEmail, hasAccount: !!account }
        })
        if (result.changedEmail && result.hasAccount)
          await auth().api.sendVerificationEmail({
            body: { email, callbackURL: '/dang-nhap' },
          })
        return {
          ok: true,
          emailVerificationRequired: result.changedEmail && result.hasAccount,
        }
      }
      if (route === 'admin/roster' && method === 'POST') {
        const input = await body(
          z.object({
            csv: z.string().max(2_000_000),
            commit: z.boolean().default(false),
          }),
        )
        let entries: ReturnType<typeof parseRoster>
        try {
          entries = parseRoster(input.csv)
        }
        catch {
          return fail(
            400,
            'CSV không hợp lệ. Kiểm tra cột, email và MSSV trùng.',
          )
        }
        return await transaction(async (client) => {
          const conflicts: string[] = []
          for (const row of entries) {
            const existing = (
              await client.query(
                'SELECT student_id,email FROM roster WHERE student_id=$1 OR email=$2',
                [row.studentId, row.email],
              )
            ).rows
            if (
              existing.some(
                r => r.student_id !== row.studentId || r.email !== row.email,
              )
            )
              conflicts.push(row.mssv)
          }
          if (input.commit && conflicts.length)
            fail(409, 'Danh sách có email hoặc MSSV đã gắn với hồ sơ khác.')
          if (input.commit) {
            for (const row of entries)
              await client.query(
                'INSERT INTO roster(student_id,display_id,email,name,major,class_name,cohort) VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT(student_id) DO UPDATE SET name=excluded.name,major=excluded.major,class_name=excluded.class_name,cohort=excluded.cohort',
                [
                  row.studentId,
                  row.mssv,
                  row.email,
                  row.name,
                  row.major,
                  row.class,
                  row.cohort,
                ],
              )
            await client.query(
              'INSERT INTO audit(id,actor,action,target) VALUES($1,$2,\'roster_import\',$3)',
              [randomUUID(), user.id, String(entries.length)],
            )
          }
          return { items: entries, conflicts, committed: input.commit }
        })
      }
      if (route === 'admin/users' && method === 'GET')
        return listPage(
          'SELECT u.id,u.name,u.email,u.role,u.disabled,u.two_factor_enabled,r.display_id FROM "user" u JOIN roster r ON r.email=u.email ORDER BY u.created_at DESC',
          query.page,
        )
      if (path[1] === 'users' && path.length === 3 && method === 'PATCH') {
        const input = await body(
          z.object({
            disabled: z.boolean(),
            role: z.enum(['student', 'editor', 'admin']),
          }),
        )
        if (path[2] === user.id)
          fail(
            400,
            'Không tự thay đổi quyền hoặc khóa tài khoản đang quản trị.',
          )
        await transaction(async (client) => {
          const target
            = (
              await client.query(
                'UPDATE "user" SET disabled=$2,role=$3 WHERE id=$1 RETURNING email',
                [path[2], input.disabled, input.role],
              )
            ).rows[0] || fail(404, 'Không tìm thấy tài khoản.')
          await client.query(
            'UPDATE roster SET active=$2,role=$3 WHERE email=$1',
            [target.email, !input.disabled, input.role],
          )
          await client.query('DELETE FROM session WHERE user_id=$1', [path[2]])
          await client.query(
            'INSERT INTO audit(id,actor,action,target) VALUES($1,$2,\'account_update\',$3)',
            [randomUUID(), user.id, path[2]],
          )
        })
        return { ok: true }
      }
      if (route === 'admin/invite' && method === 'POST') {
        const input = await body(
          z.object({
            email: z.email(),
            name: text,
            role: z.enum(['editor', 'admin']),
          }),
        )
        const email = input.email.toLowerCase(),
          id = `staff${randomUUID().replaceAll('-', '')}`
        await sql(
          'INSERT INTO roster(student_id,display_id,email,name,major,class_name,cohort,role) VALUES($1,$1,$2,$3,\'staff\',\'staff\',\'staff\',$4)',
          [id, email, input.name, input.role],
        )
        const url = new URL('/dang-nhap', process.env.BETTER_AUTH_URL)
        url.searchParams.set('invite', id)
        url.searchParams.set('email', email)
        await sql('INSERT INTO jobs(id,kind,payload) VALUES($1,\'email\',$2)', [
          randomUUID(),
          JSON.stringify({
            to: email,
            subject: 'Lời mời biên tập học liệu',
            text: `Đăng ký tài khoản qua liên kết sau, xác thực email và bật xác thực hai bước:\n${url}`,
          }),
        ])
        await log(user.id, 'staff_invite', email)
        return { ok: true }
      }
      if (route === 'admin/reports' && method === 'GET')
        return listPage(
          'SELECT * FROM reports ORDER BY created_at DESC',
          query.page,
        )
      if (path[1] === 'reports' && path.length === 3 && method === 'PATCH') {
        await sql('UPDATE reports SET state=\'closed\' WHERE id=$1', [path[2]])
        await log(user.id, 'report_closed', path[2]!)
        return { ok: true }
      }
      if (route === 'admin/audit' && method === 'GET')
        return listPage(
          'SELECT * FROM audit ORDER BY created_at DESC',
          query.page,
        )
      if (path[1] === 'jobs' && path.length === 3 && method === 'PATCH') {
        const rows = await sql(
          'UPDATE jobs SET state=\'pending\',tries=0,run_at=now(),locked_at=NULL WHERE id=$1 AND state=\'failed\' RETURNING id',
          [path[2]],
        )
        if (!rows.length) fail(409, 'Chỉ thử lại tác vụ đã dừng do lỗi.')
        await log(user.id, 'job_retry', path[2]!)
        return { ok: true }
      }
      if (route === 'admin/jobs' && method === 'GET')
        return listPage(
          'SELECT id,kind,state,tries,run_at FROM jobs ORDER BY created_at DESC',
          query.page,
        )
      if (route === 'admin/curriculum' && method === 'PUT') {
        const input = await body(
          z.object({
            major: text,
            version: text,
            course: text,
            term: z.number().int().min(1).max(8),
            credits: z.number().int().min(0).max(30),
            requirement: text,
            source: text,
            verified: z.boolean(),
          }),
        )
        await transaction(async (client) => {
          const program = `${input.major}:${input.version}`
          await client.query(
            'INSERT INTO programs(id,major,version) VALUES($1,$2,$3) ON CONFLICT DO NOTHING',
            [program, input.major, input.version],
          )
          await client.query(
            'INSERT INTO placements(program,course,term,credits,requirement,data) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(program,course,term) DO UPDATE SET credits=excluded.credits,requirement=excluded.requirement,data=excluded.data',
            [
              program,
              input.course,
              input.term,
              input.credits,
              input.requirement,
              JSON.stringify(input),
            ],
          )
          await client.query(
            'INSERT INTO audit(id,actor,action,target) VALUES($1,$2,\'curriculum_update\',$3)',
            [randomUUID(), user.id, program],
          )
        })
        return { ok: true }
      }
      if (route === 'admin/resources' && method === 'PUT') {
        const input = await body(
          z.object({
            id: text,
            title: text,
            course: z.string().nullable(),
            topic: z.string().nullable(),
            kind: text,
            year: z.string().nullable(),
          }),
        )
        await sql(
          'UPDATE resources SET title=$2,course=$3,topic=$4,kind=$5,year=$6 WHERE id=$1',
          [
            input.id,
            input.title,
            input.course,
            input.topic,
            input.kind,
            input.year,
          ],
        )
        await log(user.id, 'resource_update', input.id)
        return { ok: true }
      }
    }
    return fail(404, 'Không tìm thấy chức năng.')
  }
  catch (error) {
    if (error instanceof z.ZodError)
      return fail(400, 'Thông tin nhập chưa hợp lệ.')
    if (error && typeof error === 'object' && 'statusCode' in error)
      throw error
    if (
      error
      && typeof error === 'object'
      && 'code' in error
      && ['23503', '23505', '23514'].includes(String(error.code))
    )
      return fail(400, 'Tham chiếu không tồn tại hoặc dữ liệu bị trùng.')
    console.error('Platform request failed', { route, method })
    return fail(503, 'Chưa thể xử lý yêu cầu. Vui lòng thử lại sau.')
  }
})
