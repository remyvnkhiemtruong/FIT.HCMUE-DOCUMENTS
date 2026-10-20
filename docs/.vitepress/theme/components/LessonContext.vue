<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { courses, resources } from '../../data/catalog.mts'
const {frontmatter}=useData()
const course=computed(()=>courses.find(c=>c.code===frontmatter.value.course))
const resource=computed(()=>resources.find(r=>r.id===frontmatter.value.resourceId))
</script>
<template><div v-if="course" class="lesson-context"><nav aria-label="Đường dẫn phân cấp"><a :href="withBase('/chuong-trinh/')">Chương trình học</a><span aria-hidden="true"> / </span><a :href="withBase(course.path)">{{course.code}} · {{course.name}}</a><template v-if="resource"><span aria-hidden="true"> / </span><span>{{resource.section}}</span></template></nav><p v-if="course.code==='COMP1801'" class="muted-note">Mã môn cần đối chiếu: một số bản gốc ghi COMP1802; danh mục hiện dùng COMP1801.</p><details v-if="resource" class="source-note"><summary>Nguồn tài liệu</summary><p>{{resource.source}} <a :href="withBase('/huong-dan#nguon-tai-lieu')">Hướng dẫn sử dụng</a></p></details></div></template>
