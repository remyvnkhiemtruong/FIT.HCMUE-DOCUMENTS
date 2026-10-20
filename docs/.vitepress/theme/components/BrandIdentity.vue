<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <span class="brand-lockup">
    <img class="brand-university" :src="withBase('/brand/logo-truong.png')" alt="Trường Đại học Sư phạm TP. Hồ Chí Minh" width="96" height="47">
    <img class="brand-faculty" :src="withBase('/brand/logo-khoa.png')" alt="Khoa Công nghệ Thông tin" width="44" height="44">
    <span class="brand-name">Kho học liệu<small>FIT HCMUE</small></span>
  </span>
</template>
