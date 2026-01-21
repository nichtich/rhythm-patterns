<script setup>
import SourcesList from "./SourcesList.vue"
import MarkdownText from "./MarkdownText.vue"

defineProps({ category: { type: Object } })
</script>

<template>
  <div v-if="category">
    <MarkdownText :markdown="category.value.markdown" />
    <SourcesList :sources="category.value.source" />
  </div>
</template>
