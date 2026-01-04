<script setup>
import { computed } from "vue"

import RhythmButtons from "./RhythmButtons.vue"
import Rhythm from "../Rhythm.js"

const MAX = 128

const rhythm = defineModel({ validator: r => r instanceof Rhythm })
defineProps({ step: Number })

const divisor = computed(() => rhythm.value.divisor())

function duplicate() {
  rhythm.value.push(...rhythm.value)
}
function halve() { // TODO: if length >= 4
  rhythm.value.splice(rhythm.value.length / 2, rhythm.value.length / 2)
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
      <button class="action" :disabled="rhythm.empty()" @click="rhythm.rotate(-1)">
        &lt;
      </button>
      <button class="action" :disabled="rhythm.empty()" @click="rhythm.rotateBeat(-1)">
        ⋖
      </button>
      <button class="action" :disabled="rhythm[0] != 1" @click="rhythm.rotateBeat(1)">
        ⋗
      </button>
      <button class="action" :disabled="rhythm.empty()" @click="rhythm.rotate(1)">
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
      <button class="action" :disabled="divisor === 1" @click="rhythm.condense()">
        ÷{{ divisor > 1 ? divisor : "n" }}
      </button>
      <button class="action" :disabled="rhythm.length > MAX/2" @click="rhythm.expand()">
        ×2
      </button>
      <button class="action" :disabled="rhythm.length > MAX/3" @click="rhythm.expand(3)">
        ×3
      </button>
      <button class="action" :disabled="rhythm.length % 2 || rhythm.empty() || rhythm.length > 2*MAX/3" @click="rhythm.syncopate()">
        ²=³
      </button>
    </div>
  </div>
</template>

<style>
.rhythm-buttons {
  margin: 0.5em 0;
}
</style>
