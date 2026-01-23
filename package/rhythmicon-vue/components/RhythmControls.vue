<script setup>
import { computed } from "vue"
import Rhythm from "rhythmicon-rhythm"

const rhythm = defineModel({ validator: r => r instanceof Rhythm })

defineProps({ max: { type: Number, default: () => 128 } })

const divisor = computed(() => rhythm.value.divisor())
const empty = computed(() => rhythm.value.empty())
</script>

<template>
  <div class="rhythm-editor">
    <button
      class="action" :disabled="empty" 
      title="rotate one pulse left" @click="rhythm.rotate(-1)"
    >
      &lt;
    </button>
    <button
      class="action" :disabled="empty"
      title="rotate one pulse right" @click="rhythm.rotate(1)"
    >
      &gt;
    </button>
    <button
      class="action" :disabled="empty" 
      title="rotate one beat left" @click="rhythm.rotateBeats(rhythm[0] ? -1 : 0)"
    >
      ⋖
    </button>
    <button
      class="action" :disabled="empty"
      title="rotate one beat right" @click="rhythm.rotateBeats(1)"
    >
      ⋗
    </button>
    <button
      class="action" title="add one pulse" 
      @click="rhythm.push(0)"
    >
      +
    </button>
    <button
      class="action" :disabled="rhythm.length < 2"
      title="remove last pulse" @click="rhythm.pop()"
    >
      -
    </button>
    <button
      class="action" title="switch beats and pauses"
      @click="rhythm.complement()"
    >
      ⇅
    </button>
    <button
      class="action" title="reverse rhythm"
      @click="rhythm.reverse()"
    >
      ⇆
    </button>
    <button
      class="action" title="repeat rhythm"
      @click="rhythm.repeat()"
    >
      𝄎
    </button>
    <button
      class="action" title="cut rhythm"
      :disabled="rhythm.repetitions() == 1"
      @click="rhythm.cut()"
    >
      𝄍
    </button>    
    <button
      class="action" :disabled="rhythm.length > max/2"
      title="inflate rhythm (double)" @click="rhythm.inflate()"
    >
      ×2
    </button>
    <button
      class="action" :disabled="rhythm.length > max/3"
      title="inflate rhythm (triple)" @click="rhythm.inflate(3)"
    >
      ×3
    </button>
    <button
      class="action" :disabled="divisor === 1"
      title="deflate rhythm"
      @click="rhythm.deflate()"
    >
      ÷{{ divisor > 1 ? divisor : "n" }}
    </button>
    <button
      class="action" :disabled="empty || rhythm.length % 2 || rhythm.length > 2*max/3"
      title="shuffle rhythm" @click="rhythm.shuffle()"
    >
      ²=³
    </button>
    <button
      class="action" :disabled="!rhythm.isShuffle()"
      title="unshuffle rhythm" @click="rhythm.unshuffle()"
    >
      ³=²
    </button>
  </div>
</template>

<style>
.rhythm-editor {
  display: flex;
  padding: 0.25em;
  gap: 0.25em;
}
.rhythm-editor button {
  font-weight: bold;
}
.rhythm-editor button:disabled {
  font-weight: normal;
}
</style>
