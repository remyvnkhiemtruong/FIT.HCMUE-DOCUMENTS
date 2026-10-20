<script setup lang="ts">
import { computed } from 'vue'
import { cohorts, cohortYear, academicYear } from '../../data/catalog.mts'
import MajorDirectory from './MajorDirectory.vue'
const props=defineProps<{cohort:string}>()
const cohort=computed(()=>cohorts.find(c=>c.id===props.cohort))
</script>
<template><div v-if="cohort"><p>Niên khóa {{cohort.startYear}}–{{cohort.startYear+4}}. Trong năm học {{academicYear}}–{{academicYear+1}}: năm thứ {{cohortYear(cohort.startYear)}} theo năm nhập học.</p><p class="muted-note">Chương trình riêng của khóa chưa được xác minh. Chọn ngành để xem danh mục đủ 8 học kỳ, rồi đối chiếu kế hoạch học tập do trường công bố.</p><MajorDirectory /></div></template>
