<script setup>
/**
 * A single button with status (pressed or not pressed).
 */
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
}
.beat-button[aria-pressed="true"] {
  background: #222;
  border: 2px inset;
  color: white
}
.beat-button[aria-pressed="false"] {
  background: #ddd;
  border: 2px outset;
}
</style>
