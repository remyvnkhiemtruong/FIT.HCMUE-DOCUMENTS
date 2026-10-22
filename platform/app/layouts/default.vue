<script setup lang="ts">
const { user } = await useViewer()
const open = ref(false)
const route = useRoute()
const { data: compatibility } = await useFetch<{ ids: string[] }>(
  '/api/v1/anchors',
  { query: computed(() => ({ path: route.path })) },
)
watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
</script>

<template>
  <div class="site-shell">
    <a
      class="skip-link"
      href="#main-content"
    >Đến nội dung chính</a>
    <header class="site-header">
      <div class="site-header__inner">
        <AppIdentity />
        <button
          class="mobile-menu quiet"
          :aria-expanded="open"
          aria-controls="main-nav"
          @click="open = !open"
        >
          Menu
        </button>
        <nav
          id="main-nav"
          :class="{ open }"
          aria-label="Điều hướng chính"
        >
          <NuxtLink to="/chuong-trinh/">Chương trình học</NuxtLink><NuxtLink to="/hoc-lieu/">Kho học liệu</NuxtLink><NuxtLink to="/roadmap">Lộ trình</NuxtLink>
          <NuxtLink
            v-if="user"
            to="/tai-khoan"
          >Tài khoản</NuxtLink><NuxtLink
            v-else
            to="/dang-nhap"
          >Đăng nhập</NuxtLink><NuxtLink
            v-if="user && user.role !== 'student'"
            to="/quan-tri"
          >Quản trị</NuxtLink><ThemeSwitch />
        </nav>
      </div>
    </header>
    <main
      id="main-content"
      class="content"
      tabindex="-1"
    >
      <span
        v-for="id in compatibility?.ids"
        :id="id"
        :key="id"
        class="legacy-anchor"
        aria-hidden="true"
      />
      <slot />
    </main>
    <footer class="site-footer">
      <div class="site-footer__inner">
        <p>
          Tác giả: Trương Minh Khiêm<br>MSSV: 52.01.104.040 · Ngành: Công nghệ
          thông tin · Lớp: 52.01.CNTT.B
        </p>
        <NuxtLink to="/huong-dan">Hướng dẫn và nguồn tài liệu</NuxtLink>
      </div>
    </footer>
  </div>
</template>
