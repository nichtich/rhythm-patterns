<script setup>
import { ref, watch, toRefs } from "vue"
import MarkdownText from "./MarkdownText.vue"

const props = defineProps({ page: String })
const { page } = toRefs(props)
const markdown = ref("")

const missing = `
# Page Not Found

The requested page could not be found.

 𝄋 [to the start page](./)`

watch(page, name => {
  if (name && /^[a-z0-9-]+$/i.test(name)) {
    fetch(`./${name}.md`)
      .then(res => {
        if (!res.ok || res.headers.get("Content-Type")?.includes("text/html")) {
          throw new Error("missing")
        }
        return res.text()
      })
      .then(text => markdown.value = text)
      .catch(() => markdown.value = missing)
  } else {
    markdown.value = ""
  }
}, { immediate: true })
</script>

<template>
  <MarkdownText v-if="markdown" :markdown="markdown" />
</template>
