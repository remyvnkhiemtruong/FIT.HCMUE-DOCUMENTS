import { courses, placements, resources, normalize } from './catalog.mts'
export interface Filters { q?: string; major?: string; term?: string; course?: string; topic?: string; kind?: string; year?: string; status?: string }
export function matchesPlacement(code: string | undefined, filters: Filters) {
  if(!code)return !filters.major && !filters.term
  return placements.some(p=>p.course===code && (!filters.major || p.major===filters.major) && (!filters.term || p.term===Number(filters.term)))
}
export function filterCourses(filters: Filters) {
  const q=normalize(filters.q || '')
  return courses.filter(c => normalize(c.code+' '+c.name).includes(q) && matchesPlacement(c.code,filters) && (!filters.status || (resources.some(r=>r.course===c.code) ? 'available' : 'empty')===filters.status))
}
export function filterResources(filters: Filters) {
  const q=normalize(filters.q || '')
  return resources.filter(r=>{
    const c=courses.find(c=>c.code===r.course)
    return normalize([r.title,r.section,c?.code,c?.name].filter(Boolean).join(' ')).includes(q) && matchesPlacement(r.course,filters) && (!filters.topic || filters.topic===r.topic) && (!filters.course || filters.course===r.course) && (!filters.kind || filters.kind===r.kind) && (!filters.year || filters.year===r.year)
  })
}
