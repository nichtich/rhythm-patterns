<script setup>
import MarkdownText from "./MarkdownText.vue"

defineProps({ items: Array, title: String })
</script>

<template>
  <div v-if="items" class="markdown-list">
    <h3 v-if="title">
      {{ title }}
    </h3>
    <ul>
      <li v-for="(item,i) in items" :key="i">
        <MarkdownText :markdown="item" />
      </li>
    </ul>
  </div>
</template>

<style>
.markdown-list {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: min-content;
}
.markdown-list h3, .markdown-list ul {
  align-self: baseline;
  font-weight: default;
  margin: 0;
}
.markdown-list h3:after {
  content: ":";
}
.markdown-list ul {
  display: inline-block;
  list-style: none;
  padding: 0.5em;
}
.markdown-list ul li div p{
  margin: 0.2em 0;
}
</style>
