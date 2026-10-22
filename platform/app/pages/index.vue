<script setup lang="ts">
useSeoMeta({ title: 'Kho học liệu Khoa Công nghệ Thông tin' })
</script>

<template>
  <section>
    <h1>Kho học liệu Khoa Công nghệ Thông tin</h1>
    <CatalogView home />
    <p class="secondary-links">
      <NuxtLink to="/roadmap">Lộ trình ôn tập</NuxtLink> ·
      <NuxtLink to="/dong-gop">Đóng góp tài liệu</NuxtLink> ·
      <NuxtLink to="/huong-dan">Hướng dẫn</NuxtLink>
    </p>
  </section>
</template>
