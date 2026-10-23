<script setup lang="ts">
import { nextTick, watch } from 'vue'

const props = defineProps<{
  id: string
  label: string
  modelValue: string
  options: { id: string, name: string }[]
}>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
watch(() => props.modelValue, async () => {
  await nextTick()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  document.getElementById(`${props.id}-panel`)?.animate([{ opacity: 0.65 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' })
})
function move(event: KeyboardEvent, index: number) {
  let next = index
  if (event.key === 'ArrowRight') next = (index + 1) % props.options.length
  else if (event.key === 'ArrowLeft') next = (index - 1 + props.options.length) % props.options.length
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = props.options.length - 1
  else return
  event.preventDefault()
  const target = props.options[next]
  if (!target) return
  // Manual activation avoids fetching a new panel for every arrow key press.
  document.getElementById(`${props.id}-tab-${target.id}`)?.focus()
}
</script>

<template>
  <div
    class="section-tabs"
    role="tablist"
    :aria-label="label"
  >
    <button
      v-for="(option, index) in options"
      :id="`${id}-tab-${option.id}`"
      :key="option.id"
      type="button"
      role="tab"
      :aria-selected="modelValue === option.id"
      :aria-controls="`${id}-panel`"
      :tabindex="modelValue === option.id ? 0 : -1"
      @click="emit('update:modelValue', option.id)"
      @keydown="move($event, index)"
    >
      {{ option.name }}
    </button>
  </div>
</template>
