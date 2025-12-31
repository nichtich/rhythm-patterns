<script setup>
/**
 * Links to a rhythm showing its pattern or its name.
 */
import { computed } from "vue"
import rhythms from "../../rhythms.json"

const props = defineProps({ pattern: String, show: String })
const text = computed(() => {
  if (props.show === "name") {
    return rhythms[props.pattern]?.name || props.pattern
  }
  return props.pattern
})
</script>

<template>
  <RouterLink class="rhythm-link" :to="{ query: { pattern } }">
    {{ text }}
  </RouterLink>
</template>
