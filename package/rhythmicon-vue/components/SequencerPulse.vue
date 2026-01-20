<script setup>
defineProps({
  pressed: Boolean,
  active: Boolean,
  chars: { type: String, default: "x-" },
})
const emit = defineEmits(["toggle"])
</script>

<template>
  <button
    :class="{ 'beat-button': true, 'active': active }"
    :aria-pressed="pressed ? 'true' : 'false'"
    @click="emit('toggle')"
  >
    {{ chars[pressed ? 0 : 1] }}
  </button>
</template>

<style>
.beat-button {
  font-family: monospace;
  border-radius: 0.1rem;
}
.beat-button[aria-pressed="true"] {
  background: #222;
  border: none;
  color: #fff
}
.beat-button[aria-pressed="false"] {
  background: #ddd;
  border: none;
}
</style>
