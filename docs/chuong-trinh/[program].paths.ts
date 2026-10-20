import { majors } from '../.vitepress/data/catalog.mts'
import { programContent } from '../.vitepress/page-content.mts'
export default {
  paths() {
    return majors.flatMap(m => [
      { params: { program: `${m.id}/index` }, content: programContent(m.id) },
      ...Array.from({ length: 8 }, (_,i) => ({ params: { program: `${m.id}/hk-${i+1}/index` }, content: programContent(m.id,i+1) }))
    ])
  }
}
