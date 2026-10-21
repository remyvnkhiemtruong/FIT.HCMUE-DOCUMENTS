<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { majors, courses, resources, resourceKinds, topics, statusFor, placements, cohorts, cohortYear, academicYear, type Course, type Resource } from '../../data/catalog.mts'
import { filterCourses, filterResources } from '../../data/filtering.mts'
import { useFilters } from '../useFilters'
const props=defineProps<{mode:'courses'|'resources'}>()
const {filters,reset}=useFilters({q:'',major:'',term:'',cohort:'',course:'',topic:'',kind:'',year:'',status:'',page:'1'})
const results=computed(()=>props.mode==='courses' ? filterCourses(filters) : filterResources(filters))
const pages=computed(()=>Math.max(1,Math.ceil(results.value.length/15)))
const page=computed(()=>Math.min(pages.value,Math.max(1,Math.floor(Number(filters.page)||1))))
const shownCourses=computed(()=>(props.mode==='courses' ? results.value as Course[] : []).slice((page.value-1)*15,page.value*15))
const shownResources=computed(()=>(props.mode==='resources' ? results.value as Resource[] : []).slice((page.value-1)*15,page.value*15))
const availableCourses=courses.filter(c=>resources.some(r=>r.course===c.code))
const selectedCohort=computed(()=>cohorts.find(c=>c.id===filters.cohort))
const years=[...new Set(resources.flatMap(r=>r.year ? [r.year] : []))].sort().reverse()
const change=()=>{filters.page='1'}
function placementLabel(code:string) {
  return placements.filter(p=>p.course===code && (!filters.major || p.major===filters.major) && (!filters.term || p.term===Number(filters.term)))
    .map(p=>`${majors.find(m=>m.id===p.major)!.short}: HK${p.term}, ${p.credits} TC, ${p.requirement}`).join(' · ')
}
</script>
<template>
  <form class="catalog-filters" @submit.prevent="change" @input="change" @change="change" role="search" :aria-label="mode==='courses' ? 'Lọc học phần' : 'Lọc học liệu'">
    <div class="filter-wide"><label for="catalog-q">Từ khóa</label><input id="catalog-q" v-model="filters.q" type="search" placeholder="Ví dụ: co so toan hoặc COMP1800"></div>
    <div><label for="catalog-major">Ngành học</label><select id="catalog-major" v-model="filters.major"><option value="">Tất cả các ngành</option><option v-for="m in majors" :key="m.id" :value="m.id">{{m.name}}</option></select></div>
    <template v-if="mode==='courses'">
      <div><label for="catalog-term">Học kỳ</label><select id="catalog-term" v-model="filters.term"><option value="">Tất cả học kỳ</option><option v-for="t in 8" :key="t" :value="String(t)">Học kỳ {{t}}</option></select></div>
      <div><label for="catalog-status">Học liệu</label><select id="catalog-status" v-model="filters.status"><option value="">Tất cả trạng thái</option><option value="available">Có tài liệu</option><option value="empty">Chưa có tài liệu</option></select></div>
      <div><label for="catalog-cohort">Khóa đào tạo</label><select id="catalog-cohort" v-model="filters.cohort"><option value="">Tất cả các khóa</option><option v-for="c in cohorts" :key="c.id" :value="c.id">{{c.id}}</option></select></div>
    </template>
    <template v-else>
      <div><label for="catalog-topic">Chủ đề</label><select id="catalog-topic" v-model="filters.topic"><option value="">Tất cả chủ đề</option><option v-for="topic in topics" :key="topic.id" :value="topic.id">{{topic.name}}</option></select></div>
      <div><label for="catalog-course">Môn học</label><select id="catalog-course" v-model="filters.course"><option value="">Tất cả môn có tài liệu</option><option v-for="c in availableCourses" :key="c.code" :value="c.code">{{c.code}} · {{c.name}}</option></select></div>
      <div><label for="catalog-kind">Loại tài liệu</label><select id="catalog-kind" v-model="filters.kind"><option value="">Tất cả loại</option><option v-for="(label,id) in resourceKinds" :key="id" :value="id">{{label}}</option></select></div>
      <div><label for="catalog-year">Năm đề thi</label><select id="catalog-year" v-model="filters.year"><option value="">Tất cả năm</option><option v-for="year in years" :key="year" :value="year">{{year}}</option></select></div>
    </template>
    <button type="button" class="secondary-button" @click="reset">Xóa bộ lọc</button>
    <p v-if="selectedCohort" class="filter-wide muted-note">{{selectedCohort.id}}: năm thứ {{cohortYear(selectedCohort.startYear)}} trong năm học {{academicYear}}–{{academicYear+1}}. Đối chiếu học phần với kế hoạch của trường.</p>
  </form>
  <p role="status" aria-live="polite"><strong>{{results.length}}</strong> {{mode==='courses' ? 'môn học' : 'học liệu'}} phù hợp.</p>
  <div v-if="!results.length" class="empty-state"><h2>Chưa tìm thấy kết quả</h2><p>Thử từ khóa ngắn hơn hoặc bỏ bớt điều kiện lọc.</p><button class="secondary-button" @click="reset">Xóa bộ lọc</button></div>
  <div v-else-if="mode==='courses'" class="course-results">
    <article v-for="c in shownCourses" :key="c.code" class="course-result">
      <span class="course-code">{{c.code}}</span><h2><a :href="withBase(c.path)">{{c.name}}</a></h2><p>{{placementLabel(c.code)}}</p><span class="status-label" :class="{'has-materials':resources.some(r=>r.course===c.code)}">{{statusFor(c.code)}}</span>
    </article>
  </div>
  <div v-else class="resource-results">
    <article v-for="r in shownResources" :key="r.id" class="resource-result"><span class="course-code">{{r.course || 'Tham khảo theo chủ đề'}} · {{resourceKinds[r.kind]}}<template v-if="r.year"> · {{r.year}}</template></span><h2><a :href="withBase(r.path)">{{r.title}}</a></h2><p>{{r.section}}</p></article>
  </div>
  <nav v-if="pages>1" class="pagination" aria-label="Phân trang"><button :disabled="page===1" class="secondary-button" @click="filters.page=String(page-1)">Trang trước</button><span>Trang {{page}} / {{pages}}</span><button :disabled="page===pages" class="secondary-button" @click="filters.page=String(page+1)">Trang sau</button></nav>
</template>
