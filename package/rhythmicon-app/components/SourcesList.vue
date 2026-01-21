<script setup>
import MarkdownText from "./MarkdownText.vue"

defineProps({ sources: Array })
</script>

<template>
  <div v-if="sources" class="sources">
    <h3>Sources</h3>
    <ul>
      <li v-for="(source,i) in sources" :key="i">
        <MarkdownText :markdown="source" />
      </li>
    </ul>
  </div>
</template>

<style>
.sources {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: min-content;
}
.sources h3, .sources ul {
  align-self: baseline;
  font-weight: default;
  margin: 0;
}
.sources h3:after {
  content: ":";
}
.sources ul {
  display: inline-block;
  list-style: none;
  padding: 0.5em;
}
.sources ul li div p{
  margin: 0.2em 0;
}
</style>
