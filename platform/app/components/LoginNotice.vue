<script setup lang="ts">
const route = useRoute()
const returnPath = ref(route.fullPath)
onMounted(() => {
  returnPath.value = route.fullPath
})
</script>

<template>
  <div class="notice">
    <p>Đăng nhập bằng tài khoản đã xác thực để xem nội dung này.</p>
    <NuxtLink :to="{ path: '/dang-nhap', query: { return: returnPath } }">Đăng nhập</NuxtLink>
  </div>
</template>
