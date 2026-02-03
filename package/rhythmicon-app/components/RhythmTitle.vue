<script setup>
defineProps({ rhythm: Object, info: Object })
</script>

<template>
  <div class="rhythm-title">
    <h1 v-if="info?.name">
      {{ info.name }}
      <span v-if="info?.alias?.length">(<span v-for="(alias, i) in info.alias" :key="i">
        {{ alias }}
        <span v-if="i+1 < info.alias.length"> / </span>
      </span>)</span>
      <span v-if="info?.wikidata">
        : <a :href="`https://www.wikidata.org/wiki/${info.wikidata}`">{{ info.wikidata }}</a>
      </span>
    </h1>
    <h1 v-else>
      A rhythm
    </h1>
  </div>
</template>
