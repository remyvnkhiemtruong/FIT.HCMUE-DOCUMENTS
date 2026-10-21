import { defineConfig } from 'vitepress'
import { majors, courses, resources, resourceKinds, topics } from './data/catalog.mts'

const programs = [{ text: 'Chọn ngành', link: '/chuong-trinh/' }, { text: 'Tra cứu học phần', link: '/chuong-trinh/tra-cuu' }, ...majors.map(m => ({ text: m.name, link: `/chuong-trinh/${m.id}/`, collapsed: true, items: Array.from({length:8},(_,i)=>({text:`Học kỳ ${i+1}`,link:`/chuong-trinh/${m.id}/hk-${i+1}/`})) }))]
const sidebar: Record<string, any> = { '/chuong-trinh/': [{ text: 'Chương trình học', items: programs }], '/mon-hoc/': [{ text: 'Khám phá học phần', items: programs }], '/khoa/': [{ text: 'Chương trình học', items: programs }] }
for (const course of courses) {
  const materials=resources.filter(r=>r.course===course.code)
  if (!materials.length) continue
  const items=[{text:'Tổng quan môn học',link:course.path}, ...Object.entries(resourceKinds).flatMap(([kind,label])=> {
    const list=materials.filter(r=>r.kind===kind)
    return list.length ? [{text:label,collapsed:false,items:list.map(r=>({text:r.title,link:r.path}))}] : []
  })]
  const context=[{text:course.name,items}]
  sidebar[course.path]=context
  for (const folder of new Set(materials.filter(r=>!r.topic).map(r=>'/' + r.path.split('/')[1] + '/'))) sidebar[folder]=context
  for (const r of materials) sidebar[r.path]=context
}
for(const topic of topics){
  const context=[{text:topic.name,items:[{text:'Nội dung chủ đề',link:`/bo-sung/${topic.id}/`},...resources.filter(r=>r.topic===topic.id).map(r=>({text:r.title,link:r.path}))]}]
  sidebar[`/bo-sung/${topic.id}/`]=context
}

export default defineConfig({
  title: 'Kho tài liệu FIT HCMUE',
  description: 'Tra cứu học phần và học liệu theo ngành, học kỳ và môn học.',
  lang: 'vi-VN', base: '/FIT.HCMUE-DOCUMENTS/', cleanUrls: true,
  markdown: { math: { svg: { fontCache: 'local' } } },
  // Long mathematical pages should load when opened, rather than prefetching
  // every visible sidebar link and competing with the student's chosen lesson.
  router: { prefetchLinks: false },
  // Preserve the original indexing policy while academic data remains provisional.
  head: [['meta',{name:'robots',content:'noindex, nofollow'}]],
  transformPageData(page) {
    const route='/' + page.relativePath.replace(/\.md$/,'').replace(/index$/,'')
    const resource=resources.find(r=>r.path===route || r.path+'/'===route)
    if (resource) {
      page.frontmatter.resourceId=resource.id
      page.frontmatter.course=resource.course
      page.frontmatter.title=resource.title
      page.frontmatter.topic=resource.topic
      const sequence=resources.filter(r=>resource.topic ? r.topic===resource.topic : r.course===resource.course && !r.topic).sort((a,b)=>a.order-b.order)
      const idx=sequence.findIndex(r=>r.id===resource.id)
      page.frontmatter.prev=idx>0 ? {text:sequence[idx-1].title,link:sequence[idx-1].path} : resource.topic ? {text:'Nội dung chủ đề',link:`/bo-sung/${resource.topic}/`} : {text:'Tổng quan môn học',link:courses.find(c=>c.code===resource.course)!.path}
      page.frontmatter.next=idx<sequence.length-1 ? {text:sequence[idx+1].title,link:sequence[idx+1].path} : false
    }
  },
  themeConfig: {
    siteTitle: false,
    nav: [
      {text:'Trang chủ',link:'/'}, {text:'Chương trình học',link:'/chuong-trinh/'},
      {text:'Kho học liệu',link:'/hoc-lieu/'}, {text:'Lộ trình ôn tập',link:'/roadmap'},
      {text:'Hướng dẫn và đóng góp',link:'/huong-dan'}
    ],
    sidebar,
    outline: {label:'Trong trang này',level:[2,3]},
    search: {provider:'local',options:{
      // This function is serialized into the browser: keep it self-contained.
      miniSearch:{options:{processTerm:(term:string)=>term.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().trim()}},
      locales:{root:{translations:{button:{buttonText:'Tìm kiếm',buttonAriaLabel:'Tìm kiếm tài liệu'},modal:{noResultsText:'Không tìm thấy kết quả',resetButtonTitle:'Xóa tìm kiếm',displayDetails:'Hiện chi tiết kết quả',backButtonTitle:'Đóng tìm kiếm',footer:{selectText:'chọn',navigateText:'di chuyển',closeText:'đóng'}}}}}
    }},
    docFooter:{prev:'Trang trước',next:'Trang tiếp theo'},
    darkModeSwitchLabel:'Giao diện',lightModeSwitchTitle:'Chuyển sang nền sáng',darkModeSwitchTitle:'Chuyển sang nền tối',
    sidebarMenuLabel:'Danh mục',returnToTopLabel:'Lên đầu trang',
    footer:{message:'Khoa Công nghệ Thông tin · Trường Đại học Sư phạm TP. Hồ Chí Minh',copyright:'Tài liệu tham khảo phục vụ học tập. <a href="/FIT.HCMUE-DOCUMENTS/huong-dan#nguon-tai-lieu">Nguồn và hướng dẫn sử dụng</a>'}
  },
  vite:{build:{rollupOptions:{output:{manualChunks(id) { if (id.includes('node_modules') && (id.includes('mathjax') || id.includes('mj-context'))) return 'math-renderer' }}}}}
})
