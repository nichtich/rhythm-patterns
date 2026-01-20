<script setup>
import SequencerPulse from "./SequencerPulse.vue"

defineProps({ rhythm: Array, pulse: Number })
const emit = defineEmits(["toggle"])
</script>

<template>
  <ul class="rhythm-sequencer">
    <li v-for="(item, i) in rhythm" :key="i">
      <SequencerPulse
        :pressed="!!rhythm[i]" :active="pulse === i"
        @toggle="emit('toggle',i)"
      />
    </li>
  </ul>
</template>

<style>
.rhythm-sequencer {
  list-style-type: none;
  display: inline-block;
  padding: 0;
  margin: 0;
}
.rhythm-sequencer li {
  display: inline-block;
  padding: 0.2rem;
}
</style>
