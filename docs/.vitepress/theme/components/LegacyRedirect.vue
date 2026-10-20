<script setup lang="ts">
import { useData, withBase, useRouter } from 'vitepress'
import { onMounted } from 'vue'
const {frontmatter}=useData()
const router=useRouter()
onMounted(()=>{
  const target=withBase(frontmatter.value.redirect)
  if (target && target.startsWith('/') && !target.startsWith('//')) {
    const url=new URL(target,location.origin)
    const current=new URL(location.href)
    for (const [key,value] of current.searchParams) if (!url.searchParams.has(key)) url.searchParams.set(key,value)
    url.hash=current.hash
    router.go(url.pathname+url.search+url.hash)
  }
})
</script>
<template><p class="muted-note">Đang mở vị trí mới. Bạn cũng có thể dùng liên kết bên dưới.</p></template>
