<script setup>
import { computed } from "vue"
import Rhythm from "../Rhythm.js"

const props = defineProps({ rhythm: { validator: r => r instanceof Rhythm } })

const beats = computed(() => props.rhythm.beats())
const length = computed(() => props.rhythm.length)
const euclidean = computed(() => Rhythm.euclidean(length.value, beats.value).toString())
const pattern = computed(() => props.rhythm.toString())
const even = computed(() => length.value % 2 === 0)
const redundant = computed(() => {
  // TODO: it could be 2,3,5,7... of the same. Get primes of length instead!
  if (!even.value) {
    return false
  }
  return pattern.value.slice(0, length.value / 2) === pattern.value.slice(length.value / 2)
})
</script>

<template>
  <div class="rhythm-info">
    <p>
      <code>{{ pattern }}</code> is a rhythm with 
      {{ beats }} beats in {{ rhythm.length }} steps.
    </p>
    <p v-if="pattern == euclidean">
      The rhythm is <a href="https://en.wikipedia.org/wiki/Euclidean_rhythm">euclidean</a>.
    </p>
    <p v-else>
      The rhythm is not <a href="https://en.wikipedia.org/wiki/Euclidean_rhythm">euclidean</a>,
      this would be <router-link :to="'/'+euclidean">
        {{ euclidean }}
      </router-link>.
    </p>
    <p v-if="redundant">
      The rhythm is redundant because the same pattern is repeated twice.
    </p>
    <p v-else>
      The rhythm is not redundant.  
    </p>
    <!-- TODO: equivalent rhythms (when shifted) -->
  </div>
</template>
