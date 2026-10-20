<script setup lang="ts">
import { withBase } from 'vitepress'
import { majors } from '../../data/catalog.mts'
</script>
<template>
  <div class="major-directory">
    <a v-for="m in majors" :key="m.id" :href="withBase(`/chuong-trinh/${m.id}/`)" class="major-link">
      <div><h2>{{ m.name }}</h2><p>Mã ngành {{m.code}} · 8 học kỳ</p></div>
      <span class="major-action">Xem chương trình</span>
    </a>
  </div>
</template>
