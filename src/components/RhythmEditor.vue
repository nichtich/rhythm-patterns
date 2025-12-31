<script setup>
import RhythmButtons from "./RhythmButtons.vue"
import Rhythm from "../Rhythm.js"

const rhythm = defineModel({ validator: r => r instanceof Rhythm })
defineProps({ step: Number })

function duplicate() {
  rhythm.value.push(...rhythm.value)
}
function halve() { // TODO: if length >= 4
  rhythm.value.splice(rhythm.value.length / 2, rhythm.value.length / 2)
}
function rotateLeft() {
  rhythm.value.rotate(-1)
}
function rotateRight() {
  rhythm.value.rotate(1)
}
function inverse() {
  rhythm.value.replace(...rhythm.value.map(x => x ? 0 : 1))
}
function append() {
  rhythm.value.push(0)
}
function pop() {
  rhythm.value.pop()
}
function toggle(i) {
  rhythm.value[i] = rhythm.value[i] ? 0 : 1
}
</script>

<template>
  <div class="rhythm-editor">
    <RhythmButtons :rhythm="rhythm" :step="step" @toggle="toggle" />
    <div>
      <button class="action" @click="rotateLeft">
        &lt;
      </button>
      <button class="action" @click="rotateRight">
        &gt;
      </button>
      <button class="action" @click="append">
        +
      </button>
      <button class="action" :disabled="rhythm.length < 2" @click="pop">
        -
      </button>
      <button class="action" @click="inverse">
        ⇅
      </button>
      <button class="action" @click="duplicate">
        𝄎
      </button>
      <button class="action" :disabled="rhythm.length < 2 || rhythm.length % 2" @click="halve">
        ½
      </button>
      <button class="action" disabled="true">
        <!-- TODO -->
        ÷2
      </button>
      <button class="action" disabled="true">
        <!-- TODO -->
        ×2
      </button>
      <!-- TOOD: syncope -->
    </div>
  </div>
</template>

<style>
.rhythm-buttons {
  margin: 0.5em 0;
}
</style>
