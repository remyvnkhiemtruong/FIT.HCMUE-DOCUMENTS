<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'
import { courses, majors, resourcesFor, resourceKinds } from '../../data/catalog.mts'

const query = ref('')
const major = ref('')
const term = ref('')
const availableCourses = courses.filter(course => resourcesFor(course.code).length)
function kindsFor(code: string) {
  const materials = resourcesFor(code)
  return Object.entries(resourceKinds).filter(([kind]) => materials.some(resource => resource.kind === kind)).map(([, label]) => label)
}
</script>

<template>
  <main class="portal-home">
    <header class="home-heading">
      <h1>Kho học liệu Khoa Công nghệ Thông tin</h1>
      <p>Tìm bài giảng, bài tập và đề thi theo môn học.</p>
    </header>

    <section class="home-lookup" aria-labelledby="lookup-title">
      <h2 id="lookup-title">Tìm môn học</h2>
      <form :action="withBase('/chuong-trinh/tra-cuu')" class="home-search" role="search" aria-label="Tìm môn học">
        <div class="home-query"><label for="home-query">Mã môn hoặc tên môn</label><input id="home-query" v-model="query" name="q" placeholder="Ví dụ: COMP1800 hoặc cơ sở toán" type="search"></div>
        <div><label for="home-major">Ngành học</label><select id="home-major" v-model="major" name="major"><option value="">Tất cả ngành</option><option v-for="item in majors" :key="item.id" :value="item.id">{{ item.name }}</option></select></div>
        <div><label for="home-term">Học kỳ</label><select id="home-term" v-model="term" name="term"><option value="">Tất cả học kỳ</option><option v-for="item in 8" :key="item" :value="String(item)">Học kỳ {{ item }}</option></select></div>
        <button class="primary-button" type="submit">Tìm môn</button>
      </form>
      <a class="program-link" :href="withBase('/chuong-trinh/')">Xem chương trình học theo ngành</a>
    </section>

    <section class="available-subjects" aria-labelledby="available-title">
      <h2 id="available-title">Môn có tài liệu</h2>
      <div class="subject-list">
        <article v-for="course in availableCourses" :key="course.code" class="subject-row">
          <span class="course-code">{{ course.code }}</span>
          <div><h3><a :href="withBase(course.path)">{{ course.name }}</a></h3><p>{{ kindsFor(course.code).join(' · ') }}</p></div>
          <span class="subject-count">{{ resourcesFor(course.code).length }} tài liệu</span>
        </article>
      </div>
      <a :href="withBase('/hoc-lieu/')">Xem tất cả học liệu</a>
    </section>

    <nav class="home-support" aria-label="Hỗ trợ học tập">
      <a :href="withBase('/roadmap')">Lộ trình ôn tập</a>
      <a :href="withBase('/huong-dan')">Hướng dẫn sử dụng</a>
      <a :href="withBase('/huong-dan#đong-gop-va-bao-loi')">Đóng góp tài liệu</a>
    </nav>
  </main>
</template>
