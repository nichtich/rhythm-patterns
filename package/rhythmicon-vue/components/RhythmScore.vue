<script setup>
import { computed } from "vue"

const props = defineProps({
  rhythm: { type: Array, required: true },
  pulse: { type: Number, default: undefined },
})

const emit = defineEmits(["toggle"])

const length = computed(() => props.rhythm.length || 0)

// TODO: support passing additive nominator
const meter = computed(() => {
  let len = length.value
  let unit = 1<<Math.log2(Math.min(len,64)) // 1,2,4,8,16,32,64
  let den = unit
  if (len == 3) {
    den = 4
    unit = 4
  } else if (den > 4 && len % den === 0) {
    const shift = Math.log2(den)-2 
    den = den>>shift
    len = len>>shift
  }
  return [[len], den, unit]
})

const timeSignatureNumber = num =>
  `${num}`.split("").map(d => String.fromCharCode(0xE080 + parseInt(d))).join("")

const timeSignature = computed(() => [
  meter.value[0].map(timeSignatureNumber).join("\u{E08D}"),
  timeSignatureNumber(meter.value[1]),
])

// TODO: suppport <https://www.w3.org/2021/03/smufl14/tables/slash-noteheads.html>
const glyphs = {
  note: {
    1: "\uE1D2",
    0.5: "\uE1D3",
    0.25: "\uE1D5",
    0.125: "\uE1D7",
    0.0625: "\uE1D9",
    0.03125: "\uE1DB",
    0.015625: "\uE1DD",
  },
  rest: {
    1: "\uE4E3",
    0.5: "\uE4E4",
    0.25: "\uE4E5",
    0.125: "\uE4E6",
    0.0625: "\uE4E7",
    0.03125: "\uE4E8",
    0.015625: "\uE4E9", // 64
  },
}

const scoreNotes = computed(() => {
  const rhythm = props.rhythm
  const els = []
  const len = length.value
  const [, den, unit] = meter.value
  
  const beat = unit / den

  for (let i = 0; i < len; ) {
    let type = rhythm[i] ? "note" : "rest"
    let span = 1

    // try to use longer notes/rests if matching the meter
    if (beat > 1 && i % beat === 0) {
      let j = i+1
      while (j < len + 1 && j < i + beat && !rhythm[j]) {
        j++
      }
      let dur = j-i
      // this supports dotted notes as well but these need to be printed differently
      if (dur > 1 && glyphs[type][dur / unit]) {
        span = dur
      }
    }

    let glyph = glyphs[type][span / unit]
    els.push({ type, i, glyph, span })
    i += span
  }
  return els
})
</script>

<template>
  <div class="score-renderer bravura">
    <div class="stave">
      <div class="stave-line" />      
      <div class="spacer" style="grid-column: 1" />
      <span class="clef" style="grid-column: 2">&#xE069;</span>
      <div class="time-sig" style="grid-column: 3">
        <span class="time-sig-num">{{ timeSignature[0] }}</span>
        <span class="time-sig-den">{{ timeSignature[1] }}</span>
      </div>
      <span 
        v-for="(el, k) in scoreNotes" 
        :key="k"
        :class="[el.type, { active: pulse >= el.i && pulse < el.i + el.span }]"
        :style="{
          gridColumnStart: el.i + 4,
          gridColumnEnd: `span ${el.span}`
        }"
        @click="emit('toggle', el.i)"
      >
        {{ el.glyph }}
      </span>
      <span class="repeat" :style="{ gridColumnStart: length + 4 }">&#x1D107;</span>
    </div>
  </div>
</template>

<style>
.score-renderer {
  font-family: Bravura;
  font-size: 2.5rem;
  padding: 0 1rem;
  line-height: 7rem;
}

.stave {
  display: inline-grid;
  /* spacer | clef | time signature | pulses... | repeat */
  grid-template-columns: 0.25em max-content max-content repeat(v-bind(length), 0.8em) max-content;
  align-items: center;
  height: 1em; 
  align-items: center; 
}

.stave-line {
  grid-column: 1 / -1;
  grid-row: 1;
  height: 2px;
  background: currentColor;
  width: 100%;
  z-index: 0;
  align-self: center;
  margin-top: -1px; 
}

.spacer {
  height: 100%;
}

.clef, .note, .rest, .time-sig, .repeat {
  grid-row: 1;
  z-index: 1;
  line-height: 0; 
  display: flex;
  align-items: center; 
  justify-content: center;
  height: 0; 
  align-self: center;
  transform: none; 
}

.dot {
  transform: translateY(1px);
}
.clef {
  margin-right: 0.25em;
}

.time-sig {
  display: flex;
  flex-direction: column;
  line-height: 1; /* Reset line height for digits */
  height: auto; /* Allow auto height for stacking */
  margin-right: 0.5em;
}

.repeat {
  transform: translateY(0.5em);
}

/* Adjust line height for Bravura digits to stack tightly */
.time-sig span {
  display: block;
  line-height: 0.75em;
  text-align: center;
}
</style>
