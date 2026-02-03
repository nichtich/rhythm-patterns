<script setup>
import { computed, inject } from "vue"
import Rhythm from "rhythmicon-rhythm"
import RhythmLink from "./RhythmLink.vue"
import MarkdownText from "./MarkdownText.vue"
import MarkdownList from "./MarkdownList.vue"

const store = inject("store")

const props = defineProps({ 
  rhythm: { validator: r => r instanceof Rhythm },
  info: Object,
})

const beats = computed(() => props.rhythm.beats())
const length = computed(() => props.rhythm.length)
const euclidean = computed(() => beats.value ? Rhythm.fromEuclidean(beats.value, length.value).toString() : undefined)
const pattern = computed(() => props.rhythm.toString())
const divisor = computed(() => props.rhythm.divisor())
const repetitions = computed(() => props.rhythm.repetitions())
const cut = computed(() => repetitions.value > 1 ? props.rhythm.clone().cut() : null)
const rotations = computed(() => props.rhythm.rotations())

const allRotated = computed(() => [...rotations.value].sort().reverse())

// TODO: add Euclidean variant to knownRotated if it is a variant?
const knownRotated = computed(() => new Set(allRotated.value.filter(p => store.rhythms.value[p])))

// TODO: merge with main.js from utils
const categories = computed(() => {
  let cats = props.info?.category
  if (!cats) {
    cats = new Set()
    if (euclidean.value) {
      cats.add("euclidean")
    }
    if (props.rhythm.odd()) {
      cats.add("odd")
    }
  }
  return cats
})
</script>

<template>
  <div class="rhythm-info">    
    <MarkdownText :markdown="info?.markdown" />
    <div>
      <span v-if="repetitions > 1">
        The rhythm consists of the same pattern repeated {{ repetitions }} times, so it
        can be cut to <RhythmLink :pattern="cut.toString()" />.
      </span>
      <span v-if="divisor > 1">
        The rhythm can be deflated to 
        <RhythmLink :pattern="(new Rhythm(pattern)).deflate(divisor).toString()" />.
      </span>
      <span v-else-if="repetitions === 1">
        <span v-if="rhythm.first() > 0">
          The rhythm is condense but shifted.
        </span>
        <span v-else-if="rhythm.condense()">
          The rhythm is condense.
        </span>
      </span>
      <span v-if="euclidean">
        <span v-if="pattern == euclidean">
          The rhythm is
          <RouterLink :to="{ query: { category: 'euclidean' } }">euclidean</RouterLink>
          E({{ beats }},{{ length }}).
        </span>
        <span v-else>
          The rhythm is not
          <RouterLink :to="{ query: { category: 'euclidean' } }">euclidean</RouterLink>
          (E({{ beats }},{{ length }}) is <span v-if="rotations.has(euclidean)">rotated variant </span>
          <RhythmLink :pattern="euclidean" />).
        </span>
      </span>
      <span v-if="length % 3 === 0">
        (reversed) Tracy Number: T{{ rhythm.toTracy() }}
      </span>
    </div>
    <div v-if="categories.size" class="markdown-list">
      <h3>Categories</h3>
      <ul>
        <li v-for="category of categories" :key="category">
          <RouterLink :to="{ query: { category } }">
            {{ category }}
          </RouterLink>
        </li>
      </ul>
    </div>
    <MarkdownList title="Notable works" :items="info?.works" />
    <MarkdownList title="Sources" :items="info?.source" />
    <div v-if="info">
      <a :href="`https://github.com/nichtich/rhythmicon/blob/main/rhythms/${rhythm.toString()}.md`" class="source-link">source record</a>
    </div>
    <div v-else>
      <a :href="`https://github.com/nichtich/rhythmicon/new/main/rhythms?filename=${rhythm.toString()}.md&value=---%0Aname%3A%20...%0A---%0A%0Adescription`" class="source-link">create record</a>
    </div>
    <div v-if="knownRotated.size">
      <h3>Rotated variants</h3>
      <!-- TODO: if repeated, exclude same -->
      <ul>
        <li v-for="(rot,i) in knownRotated" :key="i">
          <RhythmLink :pattern="rot" />
          {{ store.rhythms.value[rot]?.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.source-link {
  font-size: small;
}
</style>
