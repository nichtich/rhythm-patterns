<script setup>
import { ref, watch, toRefs } from "vue"
import MarkdownText from "./MarkdownText.vue"

const props = defineProps({ page: String })
const { page } = toRefs(props)
const markdown = ref("")

watch(page, name => {
  if (name && /^[a-z0-9-]+$/i.test(name)) {
    fetch(`/${name}.md`)
      .then(res => {
        if (!res.ok || res.headers.get("Content-Type")?.includes("text/html")) {
          throw new Error("missing")
        }
        return res.text()
      })
      .then(text => markdown.value = text)
      .catch(() => {
        fetch("/missing.md").then(res => res.text()).then(text => markdown.value = text)
      })
  } else {
    markdown.value = ""
  }
}, { immediate: true })
</script>

<template>
  <MarkdownText v-if="markdown" :markdown="markdown" />
</template>
