import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  bigint,
  jsonb,
  primaryKey,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

const date = (name: string) =>
  timestamp(name, { withTimezone: true }).notNull().defaultNow()
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  createdAt: date('created_at'),
  updatedAt: date('updated_at'),
  role: text('role').notNull().default('student'),
  disabled: boolean('disabled').notNull().default(false),
  twoFactorEnabled: boolean('two_factor_enabled').default(false),
})
export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: date('created_at'),
  updatedAt: date('updated_at'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})
export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at', {
    withTimezone: true,
  }),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at', {
    withTimezone: true,
  }),
  scope: text('scope'),
  password: text('password'),
  createdAt: date('created_at'),
  updatedAt: date('updated_at'),
})
export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: date('created_at'),
  updatedAt: date('updated_at'),
})
export const twoFactor = pgTable('two_factor', {
  id: text('id').primaryKey(),
  secret: text('secret').notNull(),
  backupCodes: text('backup_codes').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  verified: boolean('verified').default(true),
  failedVerificationCount: integer('failed_verification_count').default(0),
  lockedUntil: timestamp('locked_until', { withTimezone: true }),
})
export const rateLimit = pgTable('rate_limit', {
  id: text('id').primaryKey(),
  key: text('key').notNull().unique(),
  count: integer('count').notNull(),
  lastRequest: bigint('last_request', { mode: 'number' }).notNull(),
})
export const roster = pgTable('roster', {
  studentId: text('student_id').primaryKey(),
  displayId: text('display_id').notNull(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  major: text('major').notNull(),
  className: text('class_name').notNull(),
  cohort: text('cohort').notNull(),
  active: boolean('active').notNull().default(true),
  role: text('role').notNull().default('student'),
  createdAt: date('created_at'),
})
export const majors = pgTable('majors', {
  id: text('id').primaryKey(),
  data: jsonb('data').notNull(),
})
export const programs = pgTable(
  'programs',
  {
    id: text('id').primaryKey(),
    major: text('major')
      .notNull()
      .references(() => majors.id),
    version: text('version').notNull(),
  },
  t => [uniqueIndex('program_major_version').on(t.major, t.version)],
)
export const courses = pgTable('courses', {
  code: text('code').primaryKey(),
  name: text('name').notNull(),
  data: jsonb('data').notNull(),
})
export const placements = pgTable(
  'placements',
  {
    program: text('program')
      .notNull()
      .references(() => programs.id),
    course: text('course')
      .notNull()
      .references(() => courses.code),
    term: integer('term').notNull(),
    credits: integer('credits').notNull(),
    requirement: text('requirement').notNull(),
    data: jsonb('data').notNull(),
  },
  t => [primaryKey({ columns: [t.program, t.course, t.term] })],
)
export const cohorts = pgTable('cohorts', {
  id: text('id').primaryKey(),
  data: jsonb('data').notNull(),
})
export const topics = pgTable('topics', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
})
export const resources = pgTable('resources', {
  id: text('id').primaryKey(),
  course: text('course').references(() => courses.code),
  topic: text('topic').references(() => topics.id),
  title: text('title').notNull(),
  path: text('path').notNull().unique(),
  kind: text('kind').notNull(),
  year: text('year'),
  position: integer('position').notNull().default(0),
  publishedRevision: text('published_revision'),
  data: jsonb('data').notNull(),
  createdAt: date('created_at'),
})
export const revisions = pgTable('revisions', {
  id: text('id').primaryKey(),
  resource: text('resource')
    .notNull()
    .references(() => resources.id),
  author: text('author').references(() => user.id),
  title: text('title').notNull(),
  markdown: text('markdown').notNull(),
  html: text('html').notNull(),
  sourceHash: text('source_hash').notNull(),
  state: text('state').notNull().default('draft'),
  source: text('source').notNull(),
  academicVerified: boolean('academic_verified').notNull().default(false),
  rights: text('rights').notNull().default('unreviewed'),
  reviewNote: text('review_note'),
  reviewer: text('reviewer').references(() => user.id),
  createdAt: date('created_at'),
})
export const aliases = pgTable('aliases', {
  path: text('path').primaryKey(),
  target: text('target').notNull(),
})
export const quizzes = pgTable('quizzes', {
  id: text('id').primaryKey(),
  revision: text('revision').notNull(),
  data: jsonb('data').notNull(),
})
export const attempts = pgTable('attempts', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  quiz: text('quiz')
    .notNull()
    .references(() => quizzes.id),
  revision: text('revision').notNull(),
  answers: jsonb('answers').notNull(),
  score: integer('score').notNull(),
  total: integer('total').notNull(),
  createdAt: date('created_at'),
})
export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),
  position: integer('position').notNull(),
  html: text('html').notNull(),
})
export const progress = pgTable(
  'progress',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    key: text('key').notNull(),
    complete: boolean('complete').notNull(),
    version: integer('version').notNull().default(1),
    updatedAt: date('updated_at'),
  },
  t => [primaryKey({ columns: [t.userId, t.key] })],
)
export const bookmarks = pgTable(
  'bookmarks',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    resource: text('resource')
      .notNull()
      .references(() => resources.id),
    createdAt: date('created_at'),
  },
  t => [primaryKey({ columns: [t.userId, t.resource] })],
)
export const contributions = pgTable('contributions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  revision: text('revision').references(() => revisions.id),
  resource: text('resource').references(() => resources.id),
  title: text('title').notNull(),
  body: text('body').notNull(),
  state: text('state').notNull().default('draft'),
  version: integer('version').notNull().default(1),
  reviewNote: text('review_note'),
  createdAt: date('created_at'),
})
export const files = pgTable('files', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  contribution: text('contribution')
    .notNull()
    .references(() => contributions.id),
  name: text('name').notNull(),
  mime: text('mime').notNull(),
  bytes: integer('bytes').notNull(),
  checksum: text('checksum').notNull(),
  scan: text('scan').notNull().default('pending'),
  approved: boolean('approved').notNull().default(false),
  createdAt: date('created_at'),
})
export const reports = pgTable('reports', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  resource: text('resource')
    .notNull()
    .references(() => resources.id),
  body: text('body').notNull(),
  state: text('state').notNull().default('open'),
  createdAt: date('created_at'),
})
export const jobs = pgTable('jobs', {
  id: text('id').primaryKey(),
  kind: text('kind').notNull(),
  payload: jsonb('payload').notNull(),
  state: text('state').notNull().default('pending'),
  tries: integer('tries').notNull().default(0),
  runAt: date('run_at'),
  lockedAt: timestamp('locked_at', { withTimezone: true }),
  createdAt: date('created_at'),
})
export const audit = pgTable('audit', {
  id: text('id').primaryKey(),
  actor: text('actor').references(() => user.id),
  action: text('action').notNull(),
  target: text('target').notNull(),
  details: jsonb('details').notNull().default({}),
  createdAt: date('created_at'),
})

export const supportPages = pgTable('support_pages', {
  path: text('path').primaryKey(),
  markdown: text('markdown').notNull(),
  html: text('html').notNull(),
  sourceHash: text('source_hash').notNull(),
})

export const legacyAnchors = pgTable(
  'legacy_anchors',
  { path: text('path').notNull(), id: text('id').notNull() },
  t => [primaryKey({ columns: [t.path, t.id] })],
)
