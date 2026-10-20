<script setup lang="ts">
import { computed } from 'vue'
import { cohorts, academicYear, cohortYear } from '../../data/catalog.mts'
import { useFilters } from '../useFilters'
const {filters}=useFilters({cohort:''})
const selected=computed(()=>cohorts.find(c=>c.id===filters.cohort))
</script>
<template><div class="cohort-panel"><label for="program-cohort">Khóa đào tạo</label><select id="program-cohort" v-model="filters.cohort"><option value="">Chọn khóa</option><option v-for="c in cohorts" :key="c.id" :value="c.id">{{c.id}} · {{c.startYear}}–{{c.startYear+4}}</option></select><p v-if="selected">{{academicYear}}–{{academicYear+1}}: năm thứ {{cohortYear(selected.startYear)}} theo năm nhập học. Danh mục hiển thị đủ 8 học kỳ.</p></div></template>
