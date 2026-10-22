<script setup lang="ts">
// Only HTML produced by server/utils/render.ts may be passed to this component.
withDefaults(defineProps<{ html?: string, as?: 'div' | 'span' | 'label' }>(), {
  html: '',
  as: 'div',
})
</script>

<template>
  <!-- All source Markdown and mathematics are sanitized together on the server. -->
  <!-- eslint-disable vue/no-v-html, vue/no-v-text-v-html-on-component -->
  <component
    :is="as"
    v-html="html"
  />
</template>
