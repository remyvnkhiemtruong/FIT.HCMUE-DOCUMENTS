export type Role = 'student' | 'editor' | 'admin'
export interface Viewer {
  id: string
  name: string
  email: string
  role: Role
  twoFactorEnabled: boolean
}
export interface ResourceSummary {
  id: string
  title: string
  path: string
  kind: string
  course: string | null
  topic: string | null
  year: string | null
  available: boolean
}
export interface PageResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
export interface Catalog {
  majors: { id: string, name: string, version: string }[]
  courses: {
    code: string
    name: string
    path: string
    importedIssues?: { major?: string, note: string }[]
  }[]
  placements: {
    major: string
    version: string
    course: string
    term: number
    credits: number
    requirement: string
    source: string
    verified: boolean
  }[]
  cohorts: {
    id: string
    startYear: number
    programs: Record<string, string>
  }[]
  topics: { id: string, name: string }[]
  materialCourses: string[]
}
export interface ResourceDetail extends ResourceSummary {
  html: string
  source: string
  academic_verified: boolean
  related: { id: string, title: string, path: string }[]
}
export interface LearningState {
  progress: { key: string, complete: boolean, version: number }[]
  bookmarks: { id: string, title: string, path: string }[]
}
