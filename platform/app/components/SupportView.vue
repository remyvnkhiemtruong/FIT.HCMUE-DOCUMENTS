<script setup lang="ts">
const props = defineProps<{ path: string }>()
const { user } = await useViewer(),
  fetcher = useRequestFetch()
const { data } = await useAsyncData(`support-${props.path}`, () =>
  user.value
    ? fetcher<{ html: string }>('/api/v1/support', {
        query: { path: props.path },
      })
    : Promise.resolve(null),
)
</script>

<template>
  <LoginNotice v-if="!user" /><SafeHtml
    v-else-if="data"
    class="article narrow"
    :html="data.html"
  />
  <p v-else>
    Chưa tải được trang.
  </p>
</template>
