<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const isNotFound = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () =>
    isNotFound.value
      ? 'Không tìm thấy trang · FIT HCMUE Learning Hub'
      : 'Không thể mở trang · FIT HCMUE Learning Hub',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <NuxtLayout name="default">
    <section
      class="intro"
      aria-labelledby="error-title"
    >
      <p class="eyebrow">
        {{ isNotFound ? "404" : "Có lỗi xảy ra" }}
      </p>
      <h1 id="error-title">
        {{ isNotFound ? "Không tìm thấy trang" : "Không thể mở trang lúc này" }}
      </h1>
      <p class="intro__description">
        {{
          isNotFound
            ? "Đường dẫn này chưa có nội dung trên Learning Hub."
            : "Vui lòng thử lại sau hoặc quay về trang chủ."
        }}
      </p>
      <a
        class="action-link"
        href="/"
      >Về trang chủ</a>
    </section>
  </NuxtLayout>
</template>
