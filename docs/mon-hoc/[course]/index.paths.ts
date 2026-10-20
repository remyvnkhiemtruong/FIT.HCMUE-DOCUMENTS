import { courses } from '../../.vitepress/data/catalog.mts'
import { courseContent } from '../../.vitepress/page-content.mts'
export default {
  paths() { return courses.map(c => ({ params: { course: c.code.toLowerCase() }, content: courseContent(c.code) })) }
}
