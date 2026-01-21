<script setup>
import { computed } from "vue"

const props = defineProps({
  rhythm: { type: Array, required: true },
  pulse: { type: Number, default: undefined },
})

const emit = defineEmits(["toggle"])

const size = 300 // viewBox

const length = computed(() => props.rhythm.length)

const dotRadius = computed(() => {
  if (length.value > 32) {
    return size/50
  }
  if (length.value > 24) {
    return size/30 
  }
  return size/20
})

const radius = computed(() => size/2 - dotRadius.value - 18)

const points = computed(() => props.rhythm.map(
  (beat, i) => {
    const angle = (2 * Math.PI * i) / length.value - Math.PI / 2
    const r = radius.value
    const r2 = r + dotRadius.value + 10
    return {
      x: size/2 + r * Math.cos(angle),
      y: size/2 + r * Math.sin(angle),
      tx: size/2 + r2 * Math.cos(angle),
      ty: size/2 + r2 * Math.sin(angle),
      beat,
      i,
    }
  },
))

const polygon = computed(() => Object.values(points.value || {})
  .filter(p => p.beat).map(({x,y}) => `${x},${y}`).join(","))
</script>

<template>
  <svg class="rhythm-circle" :viewBox="`0 0 ${size} ${size}`">
    <circle :cx="size/2" :cy="size/2" :r="radius" fill="none" />
    <polygon :points="polygon" class="polygon" />
    <g v-for="(p, i) in points" :key="i">
      <circle
        :class="{ 'beat-dot': p.beat, 'rest-dot': !p.beat, 'active': pulse === i }"
        :cx="p.x" :cy="p.y"
        :r="dotRadius"
        @click="emit('toggle', p.i)"
      />
      <text :x="p.tx" :y="p.ty">{{ i }}</text>
    </g> 
  </svg> 
</template>
 
<style>
.rhythm-circle g text {
  display: none;
  font-size: small;
  text-anchor: middle;
  dominant-baseline: middle;
}
.rhythm-circle g:hover text {
  display: block;
}
.rhythm-circle {
  stroke: #000;
}
.rhythm-circle > circle {
  stroke-width: 2;
}
.polygon {
  fill: #ccc;
  stroke: #ccc;
}
.beat-dot {
  fill: #000;
}
.rest-dot {
  fill: #fff;
}
</style>
