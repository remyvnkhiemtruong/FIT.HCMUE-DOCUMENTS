<script setup lang="ts">
const { user } = await useViewer()
useSeoMeta({ title: 'Kho học liệu Khoa Công nghệ Thông tin' })
</script>

<template>
  <section class="home-page">
    <h1>Kho học liệu Khoa Công nghệ Thông tin</h1>
    <p class="page-lead">
      Tìm bài giảng, bài tập và đề thi theo môn học.
    </p>
    <nav
      v-if="user"
      class="personal-links"
      aria-label="Học tập của bạn"
    >
      <NuxtLink to="/tai-khoan?tab=saved">Tài liệu đã lưu</NuxtLink>
      <NuxtLink to="/tai-khoan?tab=progress">Tiến độ học tập</NuxtLink>
      <NuxtLink to="/dong-gop">Đóng góp của bạn</NuxtLink>
    </nav>
    <CatalogView home />
    <p class="secondary-links">
      <NuxtLink to="/roadmap">Lộ trình ôn tập</NuxtLink> ·
      <NuxtLink to="/dong-gop">Đóng góp tài liệu</NuxtLink> ·
      <NuxtLink to="/huong-dan">Hướng dẫn</NuxtLink>
    </p>
  </section>
</template>
