<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const ready = ref(false)
const label = computed(() => isDark.value ? 'Chuyển sang nền sáng' : 'Chuyển sang nền tối')
onMounted(() => { ready.value = true })
</script>

<template>
  <!-- Recreate the control after mount: the persisted appearance can differ
       from the server's initial state, including its aria-checked attribute. -->
  <button :key="ready ? 'ready' : 'loading'" class="theme-toggle" type="button" role="switch"
    :disabled="!ready" :aria-checked="ready ? isDark : undefined" :aria-label="label" :title="label"
    @click="isDark = !isDark">
    <span :class="isDark ? 'vpi-sun' : 'vpi-moon'" aria-hidden="true"></span>
  </button>
</template>
