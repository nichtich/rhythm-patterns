<script setup>
import MarkdownText from "./MarkdownText.vue"

defineProps({ sources: Array, inline: Boolean })
</script>

<template>
  <div v-if="sources">
    <span v-if="inline">Sources: </span>
    <h3 v-else>
      Sources
    </h3>
    <ul :class="{ inline }">
      <li v-for="(source,i) in sources" :key="i">
        <MarkdownText :markdown="source" />
      </li>
    </ul>
  </div>
</template>
