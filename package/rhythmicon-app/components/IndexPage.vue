<script setup>
import { inject, computed } from "vue"
import { useRouter } from "vue-router"
import RhythmTable from "./RhythmTable.vue"

const store = inject("store")
const router = useRouter()

const props = defineProps({
  search: {
    type: Object,
    default: null
  }
})

const categories = computed(() => 
  new Set(props.search.category.split(',').map(c => c.trim()).filter(c => c && c !== "all"))
)

const filteredRhythms = computed(() => {
  if (!categories.value.size) {
    return store.rhythms.value
  }
  
  const filtered = {}
  for (const [pattern, rhythm] of Object.entries(store.rhythms.value)) {
    if (rhythm.category && rhythm.category.some(c => categories.value.has(c))) {
      filtered[pattern] = rhythm
    }
  }
  return filtered
})

function removeCategory(category) {
  const remaining = [...categories.value].filter(c => c !== category)
  if (remaining.length > 0) {
    router.push({ query: { category: remaining.join(',') } })
  } else {
    router.push({ query: { category: "all" } })
  }
}

function selectCategory(category) {
  const updated = [...categories.value, category]
  router.push({ query: { category: updated.join(',') } })
}
</script>

<template>
  <div>
    <div v-if="categories.size" class="filters">
      <span>Selected categories:</span>
      <button
        v-for="category in categories.values()"
        :key="category"
        class="filter-chip"
        @click="removeCategory(category)"
        :title="`Click to remove ${category} filter`"
      >
        {{ category }} ×
      </button>
    </div>
    
    <RhythmTable :rhythms="filteredRhythms" :categories="categories" @select-category="selectCategory" />
  </div>
</template>

<style>
.filters {
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  gap: 0.5em;
  flex-wrap: wrap;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.25em 0.75em;
  background-color: #e0e0e0;
  border: 1px solid #999;
  border-radius: 1em;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.2s;
}

.filter-chip:hover {
  background-color: #d0d0d0;
}
</style>

