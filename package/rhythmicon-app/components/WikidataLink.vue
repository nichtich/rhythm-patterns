<script setup>
defineProps({ qid: String, title: String })
</script>

<template>
  <a 
    v-if="qid" 
    :href="`https://www.wikidata.org/wiki/${qid}`"
    class="wikidata-link"
    :title="title ? `${title} (${qid})` : `corresponding Wikidata item (${qid})`"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1050 590">
      <path d="m 120,545 h 30 V 45 h -30 z m 60,0 h 90 V 45 h -90 z m 120,0 h 30 V 45 h -30 z" fill="#990000" />
      <path d="m 330,545 h 30 V 45 h -30 z m 60,0 h 90 V 45 h -90 z m 120,0 h 30 V 45 h -30 z" fill="#339966" />
      <path d="m 540,545 h 30 V 45 h -30 z m 60,0 h 90 V 45 h -90 z m 120,0 h 30 V 45 h -30 z" fill="#006699" />
    </svg>
  </a>    
</template>

<style>
.wikidata-link {
  display: inline-block;
  vertical-align: middle;
}
</style>