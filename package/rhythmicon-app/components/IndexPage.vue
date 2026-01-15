<script setup>
import { ref, inject } from "vue"

const store = inject("store")

import Rhythm from "rhythmicon-rhythm"
import RhythmLink from "./RhythmLink.vue"

// TODO: filter with search
const props = defineProps({ search: Object })

</script>

<template>
  <div>    
    <!-- TODO: short text -->
    <table>
      <thead>
        <tr>
          <th />
          <th>pattern</th>
          <th>name</th>
          <th>categories</th>
          <th>properties</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rhythm, pattern) in store.rhythms.value" :key="pattern">
          <td style="text-align:right; padding-right: 1em;">
            <small>{{ rhythm.beats }}/{{ pattern.length }}</small>
          </td>
          <td>
            <rhythm-link :pattern="pattern" />
          </td>
          <td>
            <span v-if="rhythm.name">{{ rhythm.name }}</span>
          </td>
          <td>
            <ul v-if="rhythm.category" class="inline">
              <li v-for="(c,i) in rhythm.category" :key="i">
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
  </div>
</template>

<style>
th { text-align: left; }
ul.inline {
  display: inline;
  list-style: none;
  padding-left: 0;
}
ul.inline li {
  display: inline;
  font-size: 80%;
}
ul.inline li + li:before {
  content: ", ";
}
</style>
