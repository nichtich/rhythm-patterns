<script setup>
import MarkdownList from "./MarkdownList.vue"
import MarkdownText from "./MarkdownText.vue"

defineProps({ category: Object })
</script>

<template>
  <div v-if="category">
    <MarkdownText :markdown="category.value.markdown" />
    <MarkdownList :items="category.value.source" title="Sources" />
  </div>
</template>
