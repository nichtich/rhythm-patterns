<script setup>
import { ref, watch, computed } from "vue"
import Rhythm from "rhythmicon-rhythm"

const rhythm = defineModel({ type: Array })
const pattern = computed(() => rhythm.value?.toString() || "")
const text = ref(pattern.value)

watch(rhythm.value, () => {
  text.value = pattern.value 
})

function reset() {
  text.value = pattern.value 
}

function submit() {
  let input = text.value.trim()
  if (Rhythm.isDurationsString(input)) {
    input = Rhythm.fromDurations(input).toString()
  } else {
    input = text.value.replaceAll(/[^A-Za-z0-9&+_ .-]/g,"")
  }
  rhythm.value.replace(input)
}

// TODO: display mode: pattern or durations
</script>

<template>
  <input
    v-model="text" class="rhythm-text-input"
    type="text" pattern="[A-Za-z0-9&\+ _.\-]+"
    placeholder="rhythm pattern (x-x--...)"
    @keydown.esc="reset" @blur="reset"
    @keydown.enter="submit"
  >
</template>

<style>
.rhythm-text-input {
  font-family: monospace;
  width: 32em;
}
</style>
