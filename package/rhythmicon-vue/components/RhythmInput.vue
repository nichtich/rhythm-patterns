<script setup>
import { ref, watch } from "vue"
import Rhythm from "rhythmicon-rhythm"

const rhythm = defineModel({ type: Array })
const durations = ref(false)

const computeInput = () => (durations.value ? rhythm.value?.toDurationString() : rhythm.value?.toString()) || ""
const input = ref(computeInput())

function reset() {
  input.value = computeInput()
}

watch(rhythm.value, reset)

function submit() {
  let str = input.value.trim()
  if (Rhythm.isDurationsString(str)) {
    str = Rhythm.fromDurations(str).toString()
    durations.value = true
  } else {
    str = Rhythm.fromPattern(str).toString()
    durations.value = false
  }
  rhythm.value.replace(str)
}

function toggleDurations() {
  try {
    const r = durations.value ? Rhythm.fromDurations(input.value) : Rhythm.fromPattern(input.value)
    durations.value = !durations.value 
    input.value = durations.value ? r.toDurationString() : r.toString()
  } catch {
    return
  }
}
</script>

<template>
  <input
    v-model="input" class="rhythm-text-input"
    type="text" pattern="[A-Za-z0-9&\+ _.\-]+"
    placeholder="pattern (x-x--...) or durations (2+3...)"
    @keydown.esc="reset"
    @blur="reset"
    @keydown.enter="submit"
    @keydown.up="toggleDurations"
    @keydown.down="toggleDurations"
  >
</template>

<style>
.rhythm-text-input {
  font-family: monospace;
  width: 32em;
}
</style>
