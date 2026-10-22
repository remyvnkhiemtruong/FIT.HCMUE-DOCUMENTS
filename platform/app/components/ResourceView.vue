<script setup lang="ts">
import type {
  ResourceDetail,
  LearningState,
} from '../../shared/types/platform'

const props = defineProps<{ id: string }>()
const { user } = await useViewer()
const fetcher = useRequestFetch()
const { data, error } = await useAsyncData(`resource-${props.id}`, () =>
  user.value
    ? fetcher<ResourceDetail>(
        `/api/v1/resources/${encodeURIComponent(props.id)}`,
      )
    : Promise.resolve(null),
)
const { data: state, refresh } = await useAsyncData(
  `learning-state-${user.value?.id || 'guest'}`,
  () =>
    user.value
      ? fetcher<LearningState>('/api/v1/me/state')
      : Promise.resolve(null),
)
const neighbours = computed(() => {
  const list = data.value?.related || []
  const index = list.findIndex(r => r.id === props.id)
  return list.filter((_, i) => Math.abs(i - index) === 1)
})
const message = ref(''),
  toc = ref<{ id: string, title: string }[]>([])
const complete = computed(() =>
  state.value?.progress.find(p => p.key === props.id),
)
const saved = computed(() =>
  state.value?.bookmarks.some(b => b.id === props.id),
)
onMounted(() => {
  toc.value = [
    ...document.querySelectorAll('.article h2[id],.article h3[id]'),
  ].map(h => ({ id: h.id, title: h.textContent || '' }))
})
async function mark() {
  try {
    await $fetch(`/api/v1/progress/${props.id}`, {
      method: 'PUT',
      body: {
        complete: !complete.value?.complete,
        version: complete.value?.version || 0,
      },
    })
    await refresh()
  }
  catch {
    message.value = 'Tiến độ đã thay đổi hoặc chưa lưu được. Vui lòng tải lại.'
  }
}
async function bookmark() {
  await $fetch(`/api/v1/bookmarks/${props.id}`, {
    method: saved.value ? 'DELETE' : 'PUT',
  })
  await refresh()
}
async function report() {
  const body = prompt('Mô tả phần cần kiểm tra')
  if (body) {
    await $fetch('/api/v1/reports', {
      method: 'POST',
      body: { resource: props.id, body },
    })
    message.value = 'Đã gửi báo lỗi.'
  }
}
</script>

<template>
  <LoginNotice v-if="!user" />
  <p
    v-else-if="error || !data"
    role="alert"
  >
    Tài liệu chưa được xuất bản hoặc hiện chưa tải được.
  </p>
  <div
    v-else
    class="reading-layout"
  >
    <aside class="reading-nav">
      <NuxtLink
        v-if="data.course"
        :to="`/mon-hoc/${data.course.toLowerCase()}/`"
      >{{ data.course }}</NuxtLink><NuxtLink
        v-else
        to="/hoc-lieu/"
      >Kho học liệu</NuxtLink>
      <ul>
        <li
          v-for="r in data.related"
          :key="r.id"
        >
          <NuxtLink :to="r.path">{{ r.title }}</NuxtLink>
        </li>
      </ul>
    </aside>
    <section>
      <p class="breadcrumb">
        <NuxtLink to="/hoc-lieu/">Kho học liệu</NuxtLink> / {{ data.title }}
      </p>
      <SafeHtml
        as="div"
        class="article"
        :html="data.html"
      />
      <QuizView
        v-if="data.kind === 'trac-nghiem'"
        embedded
      />
      <p
        v-if="!data.academic_verified"
        class="muted"
      >
        Tài liệu tham khảo phục vụ học tập; nội dung học thuật chưa được xác
        minh độc lập.
      </p>
      <details>
        <summary>Nguồn tài liệu</summary>
        <p>{{ data.source }}</p>
      </details>
      <div class="actions">
        <button
          class="quiet"
          @click="bookmark"
        >
          {{ saved ? "Bỏ lưu tài liệu" : "Lưu tài liệu" }}
        </button><button @click="mark">
          {{
            complete?.complete
              ? "Bỏ đánh dấu hoàn thành"
              : "Đánh dấu hoàn thành"
          }}
        </button><button
          class="quiet"
          @click="report"
        >
          Báo lỗi
        </button><NuxtLink :to="{ path: '/dong-gop', query: { resource: id } }">Đề xuất sửa</NuxtLink>
      </div>
      <p role="status">
        {{ message }}
      </p>
      <nav
        class="resource-list"
        aria-label="Bài trong cùng môn"
      >
        <NuxtLink
          v-for="r in neighbours"
          :key="r.id"
          :to="r.path"
        >{{
          r.title
        }}</NuxtLink>
      </nav>
    </section>
    <aside class="reading-toc">
      <strong>Trong bài này</strong>
      <ul>
        <li
          v-for="h in toc"
          :key="h.id"
        >
          <a :href="`#${h.id}`">{{ h.title }}</a>
        </li>
      </ul>
    </aside>
  </div>
</template>
