<script setup lang="ts">
const mode = ref('system'),
  dark = ref(false)
let media: MediaQueryList | undefined
function apply() {
  dark.value
    = mode.value === 'dark' || (mode.value === 'system' && !!media?.matches)
  document.documentElement.dataset.theme = dark.value ? 'dark' : 'light'
}
onMounted(() => {
  media = matchMedia('(prefers-color-scheme: dark)')
  try {
    mode.value = localStorage.getItem('fit-theme') || 'system'
  }
  catch {
    /* Keep system preference. */
  }
  apply()
  media.addEventListener('change', apply)
})
onUnmounted(() => media?.removeEventListener('change', apply))
function toggle() {
  mode.value = dark.value ? 'light' : 'dark'
  try {
    localStorage.setItem('fit-theme', mode.value)
  }
  catch {
    /* Keep current page preference. */
  }
  apply()
}
</script>

<template>
  <button
    class="quiet"
    role="switch"
    :aria-checked="dark"
    aria-label="Giao diện tối"
    @click="toggle"
  >
    {{ dark ? "Nền sáng" : "Nền tối" }}
  </button>
</template>
