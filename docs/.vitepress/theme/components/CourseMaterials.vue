<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import SectionTabs from './SectionTabs.vue'
import { resourceKinds, resourcesFor } from '../../data/catalog.mts'

const props = defineProps<{ course: string }>()
const root = ref<HTMLElement>()
const selected = ref('all')
const options = computed(() => [
  { id: 'all', name: 'Tất cả' },
  ...Object.entries(resourceKinds)
    .filter(([kind]) => resourcesFor(props.course).some(r => r.kind === kind))
    .map(([id, name]) => ({ id, name })),
])
function read() {
  const value = new URLSearchParams(location.search).get('tab') || 'all'
  selected.value = options.value.some(o => o.id === value) ? value : 'all'
  revealAnchor()
}
function revealAnchor() {
  let id = ''
  try { id = decodeURIComponent(location.hash.slice(1)) } catch { return }
  const target = id ? document.getElementById(id) : null
  if (target && root.value?.contains(target)) {
    const group = target.closest<HTMLElement>('[data-material-kind]')
    if (group) selected.value = group.dataset.materialKind || 'all'
  }
}
function select(value: string) {
  selected.value = value
  const url = new URL(location.href)
  if (value === 'all') url.searchParams.delete('tab')
  else url.searchParams.set('tab', value)
  history.pushState(history.state, '', url)
}
onMounted(() => {
  read()
  window.addEventListener('popstate', read)
  window.addEventListener('hashchange', revealAnchor)
})
onUnmounted(() => {
  window.removeEventListener('popstate', read)
  window.removeEventListener('hashchange', revealAnchor)
})
</script>

<template>
  <div ref="root" class="course-materials" :data-active-kind="selected">
    <SectionTabs id="course-materials" :model-value="selected" :options="options" label="Loại học liệu" @update:model-value="select" />
    <div id="course-materials-panel" role="tabpanel" :aria-labelledby="`course-materials-tab-${selected}`" class="tab-panel">
      <slot />
    </div>
  </div>
</template>
