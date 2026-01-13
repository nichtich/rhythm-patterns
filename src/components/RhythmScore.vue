<script setup>
import { onMounted, watch, nextTick, computed } from "vue"

const props = defineProps({ rhythm: Array })
const render = () => {
// TODO
}

const meter = computed(() => {
  const l = props.rhythm.length
  if (l <= 4) {
    return `${l}/4`
  } else if (l <= 8) {
    return `${l}/8`
  } else {
    return `${l}/8`
  }

})

watch(props.rhythm, render)
onMounted(async () => nextTick().then(render))
</script>

<template>
    <div id="score">
      <scribe-music class="bravura-font" clef="percussion" :meter="meter">
{
    "events": [
        [0, "note", "G4", 0.1, 1],
        [0.333, "note", "G4", 0.1, 1],
        [0.666, "note", "G4", 0.1, 1],
        [1, "note", "G4", 0.1, 1],
        [2, "note", "G4", 0.1, 1]
    ]
}
</scribe-music>
    </div>
</template>

<style>
#score {
  border: 1px dotted #ddd; 
  font-family: Bravura;
}
.bravura-font{
  font-family: Bravura;
}
</style>
