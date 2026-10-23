<script setup lang="ts">
interface Progress {
  key: string
  complete: boolean
  version: number
}
const { user } = await useViewer(),
  fetcher = useRequestFetch(),
  message = ref('')
const { data, error } = await useAsyncData('roadmap', () =>
  user.value
    ? fetcher<{ tasks: { id: string, html: string }[], html: string }>(
        '/api/v1/roadmap',
      )
    : Promise.resolve(null),
)
const { data: state, refresh } = await useAsyncData(
  `roadmap-state-${user.value?.id || 'guest'}`,
  () =>
    user.value
      ? fetcher<{ progress: Progress[] }>('/api/v1/me/state')
      : Promise.resolve(null),
)
function get(id: string) {
  return state.value?.progress.find(p => p.key === id)
}
async function toggle(id: string, value: boolean) {
  try {
    await $fetch(`/api/v1/progress/${id}`, {
      method: 'PUT',
      body: { complete: value, version: get(id)?.version || 0 },
    })
    await refresh()
    message.value = 'Đã lưu tiến độ.'
  }
  catch {
    message.value
      = 'Tiến độ đã thay đổi hoặc chưa lưu được. Tải lại để đối chiếu.'
  }
}
const html = computed(() =>
  (data.value?.html || '')
    .replace(/\[ \] /g, '')
    .replace(
      /<span data-task-key="([a-z0-9]+)"><\/span>/g,
      (_all, key: string) =>
        `<input type="checkbox" data-task-key="${key}" aria-label="Hoàn thành mục ${key}" ${get(key)?.complete ? 'checked' : ''}> `,
    )
    .replace(
      'Tiến độ được lưu trên trình duyệt này.',
      'Tiến độ được lưu theo tài khoản.',
    ),
)
async function change(event: Event) {
  const input = event.target as HTMLInputElement
  const key = input.dataset.taskKey
  if (key && data.value?.tasks.some(t => t.id === key)) {
    await toggle(key, input.checked)
    await nextTick()
    document
      .querySelector<HTMLInputElement>(`input[data-task-key="${key}"]`)
      ?.focus()
  }
}
</script>

<template>
  <h1 v-if="!user">
    Lộ trình ôn tập hai môn toán
  </h1>
  <LoginNotice v-if="!user" />
  <p v-else-if="error">
    Chưa tải được lộ trình.
  </p>
  <template v-else>
    <p>
      Đã hoàn thành
      {{
        state?.progress.filter(
          (p) => p.complete && data?.tasks.some((t) => t.id === p.key),
        ).length || 0
      }}/{{ data?.tasks.length || 0 }} mục.
    </p>
    <SafeHtml
      class="article task-list roadmap-content"
      :html="html"
      @change="change"
    />

    <p role="status">
      {{ message }}
    </p>
  </template>
</template>
