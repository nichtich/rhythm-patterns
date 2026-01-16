<script setup>
import { computed, inject } from "vue"
import Rhythm from "rhythmicon-rhythm"
import RhythmLink from "./RhythmLink.vue"
import MarkdownText from "./MarkdownText.vue"

const store = inject("store")

const props = defineProps({ rhythm: { validator: r => r instanceof Rhythm } })

const beats = computed(() => props.rhythm.beats())
const length = computed(() => props.rhythm.length)
const euclidean = computed(() => beats.value ? Rhythm.euclidean(beats.value, length.value).toString() : undefined)
const pattern = computed(() => props.rhythm.toString())
const divisor = computed(() => props.rhythm.divisor())
const repetitions = computed(() => props.rhythm.repetitions())
const cut = computed(() => repetitions.value > 1 ? props.rhythm.copy().cut() : null)

const rotations = computed(() => props.rhythm.rotations())

const allRotated = computed(() => [...rotations.value].sort().reverse())

// TODO: add Euclidean variant to knownRotated if it is a variant?
const knownRotated = computed(() => new Set(allRotated.value.filter(p => store.rhythms.value[p])))

const core = computed(() => props.rhythm.core())

const info = computed(() => store.rhythms.value[pattern.value])
</script>

<template>
  <div class="rhythm-info">
    <div v-if="info">
      <h2 v-if="info.name">
        {{ info.name }}
        <span v-if="info.alias?.length">(<span v-for="(alias, i) in info.alias" :key="i">
          <span>{{ alias }}</span>
          <span v-if="i+1 < info.alias.length"> / </span>
        </span>)</span>
        <span v-if="info.wikidata">
          : <a :href="`https://www.wikidata.org/wiki/${info.wikidata}`">{{ info.wikidata }}</a>
        </span>
      </h2>
      <MarkdownText :markdown="info.text" />
    </div>
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
        <span v-else-if="!core">
          The rhythm is condense.
        </span>
      </span>
      <span v-if="core">
        This is a <b><router-link to="?page=glossary">core rhythm</router-link></b>.
      </span>
      <span v-if="euclidean">
        <span v-if="pattern == euclidean">
          The rhythm is <a href="https://en.wikipedia.org/wiki/Euclidean_rhythm">euclidean</a> E({{ beats }},{{ length }}).
        </span>
        <span v-else>
          The rhythm is not <a href="https://en.wikipedia.org/wiki/Euclidean_rhythm">euclidean</a>:
          E({{ beats }},{{ length }}) is <span v-if="rotations.has(euclidean)">rotations variant </span>
          <RhythmLink :pattern="euclidean" />.
        </span>
      </span>
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
    <div v-if="info?.category?.length">
      <h3>Categories</h3>
      <ul>
        <li v-for="(category,i) in info.category" :key="i">
          <RouterLink :to="{ category }">
            {{ category }}
          </RouterLink>
        </li>
      </ul>
    </div>
    <div v-if="info?.works">
      <h3>Notable works</h3>
      <ul>
        <li v-for="(work,i) in info.works" :key="i">
          <MarkdownText :markdown="work" />
        </li>
      </ul>
    </div>
    <div v-if="info?.source">
      <h3>Sources</h3>
      <ul>
        <li v-for="(source,i) in info.source" :key="i">
          <MarkdownText :markdown="source" />
        </li>
      </ul>
    </div>
  </div>
</template>
