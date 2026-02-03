<script setup>
import { inject, computed } from "vue"
import Rhythm from "rhythmicon-rhythm"

import { RhythmSequencer, RhythmControls, RhythmCircle, RhythmScore } from "rhythmicon-vue"
import RhythmTitle from "./RhythmTitle.vue"
import RhythmInfo from "./RhythmInfo.vue"

const rhythm = defineModel({ validator: r => r instanceof Rhythm })
defineProps({
  pulse: { type: Number, default: undefined },
})

const toggle = i => rhythm.value[i] = rhythm.value[i] ? 0 : 1

const store = inject("store")
const info = computed(() => store.rhythms.value[rhythm.value.toString()])
</script>

<template>
  <div class="rhythm-page">
    <div class="rhythm-page-main">
      <RhythmTitle :rhythm="rhythm" :info="info" />
      <div class="rhythm-page-grid">
        <div>
          <div v-if="rhythm" class="rhythm-subtitle">
            <span v-if="rhythm.beats() == 0">
              silence for
            </span>
            <span v-if="rhythm.beats() == 1">
              one beat in
            </span>
            <span v-else-if="rhythm.beats() > 1">
              {{ rhythm.beats() }} beats ({{ rhythm.toDurations() }}) in
            </span>
            {{ rhythm.length }} pulses
          </div>    
          <RhythmSequencer :rhythm="rhythm" :pulse="pulse" @toggle="toggle" />
          <RhythmInfo :rhythm="rhythm" :info="info" />
        </div>
        <div style="text-align:right; max-width:100%;">
          <RhythmScore :rhythm="rhythm" :pulse="pulse" @toggle="toggle" />
          <RhythmCircle :rhythm="rhythm" :pulse="pulse" @toggle="toggle" />
        </div>
      </div>
    </div>
    <RhythmControls v-model="rhythm" :pulse="pulse" />
  </div>
</template>

<style>
.rhythm-page {
  display: flex;
  gap: 0.25em;
  align-items: stretch;
}
.rhythm-page-main {
  flex: 1 1 auto;
  min-width: 0;
}
.rhythm-controls {
  flex: 0 0 auto;
  padding: 0;
  flex-direction: column;
  flex-wrap: wrap;
}
.rhythm-title h1 {
  margin-bottom: 0;
}
.rhythm-page .rhythm-subtitle {
  margin-top: 0.5em;
}
.rhythm-page-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /*gap: 16px;*/
}
.rhythm-page-grid div {
  flex: 1 1 100%;
  flex-basis: calc(50% - 1em);
}

.rhythm-sequencer {
  margin-bottom: 0.5em;
}
.rhythm-score {
  margin-right: 0.5em;
}
.rhythm-circle {
  margin-right: 1em;
  max-width: 30em;
}
.rhythm-subtitle {
  color: #090;
  margin-bottom: 1rem;
}
</style>
