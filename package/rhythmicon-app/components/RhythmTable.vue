<script setup>
import RhythmLink from "./RhythmLink.vue"
import WikidataLink from "./WikidataLink.vue"

defineProps({
  rhythms: {
    type: Object,
    required: true,
  },
  categories: {
    type: Set,
    default: () => new Set(),
  },
  beats: Number,
  length: Number,
})

const emit = defineEmits(["selectCategory","selectBeats","selectLength"])
</script>

<template>
  <table>
    <thead>
      <tr>
        <th />
        <th>names</th>        
        <th>pattern</th>
        <th>durations</th>
        <th>categories</th>        
        <th>properties</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rhythm, pattern) in rhythms" :key="pattern">
        <td style="text-align:right; padding-right: 1em;">
          <small>
            {{ rhythm.beats }} /{{ pattern.length }}
          </small>
        </td>
        <td>
          <RouterLink :to="{ query: { pattern } }">
            {{ rhythm.name }}
          </RouterLink>
          <ul v-if="rhythm.alias?.length" class="inline alias">
            <li v-for="alias in rhythm.alias" :key="alias">
              {{ alias }}
            </li>
          </ul>
          <wikidata-link :qid="rhythm.wikidata" :title="`This rhythm in Wikidata`" />
        </td>
        <td>
          <rhythm-link :pattern="pattern" />
        </td>
        <td>
          {{ rhythm.rhythm.toDurationString() }}
        </td>                
        <td>
          <ul v-if="rhythm.category.size" class="inline">
            <li
              v-for="c of rhythm.category" :key="c"
              :class="{ 'category': true, 'active': categories.has(c), 'clickable': !categories.has(c) }"
              :title="categories.has(c) ? '' : `Click to filter by ${c}`"
              @click="emit('selectCategory', c)"
            >
              {{ c }}
            </li>
          </ul>
        </td>
        <td>
          <ul class="inline">
            <li v-if="rhythm.euclidean">
              E({{ rhythm.beats }},{{ rhythm.length }})
            </li>
            <li v-if="rhythm.divisor > 1">
              expanded ÷{{ rhythm.divisor }} 
            </li>
            <li v-if="rhythm.repetitions > 1">
              repeated ×{{ rhythm.repetitions }}
            </li>
            <li v-if="rhythm.first">
              shifted
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table { 
    border-collapse: collapse;
}
table td {
      border: 1px solid #AAAAAA;
        padding: 0.25em;
}
.category.active {
  font-weight: bold;
}
.category:hover {
  cursor: pointer;
  text-decoration: underline;  
}
th { text-align: left; }
ul.inline.alias { 
  padding-left: 0.25em;
}
ul.inline.alias:before { 
  content: " / ";
}
ul.inline li + li:before {
  content: " / ";
}
.wikidata-link {
  margin-left: 0.5em;
  float: right;
}
</style>
