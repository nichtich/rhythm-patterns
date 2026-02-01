import { createApp, ref, shallowRef } from "vue"
import { createRouter, createWebHistory } from "vue-router"

import Rhythm from "rhythmicon-rhythm"
import { yamlHeaderMarkdown } from "./lib/utils.js"
import App from "./App.vue"

// index page is raw HTML to not having to wait for JavaScript. The page is then
// replaced by a component so its links must be replaced with components.
const index = document.querySelector("#app main").innerHTML.replaceAll(
  /<a href="\?([^"]+)"( class="[^"]+")?>([^<]+)<\/a>/g, (a,href,cls,text) => {
    if (href.startsWith("?pattern=")) {
      return `<RhythmLink pattern="${href.slice(8)}"/>`
    } else {
      const query = JSON.stringify(Object.fromEntries(new URLSearchParams(href)))
      return `<RouterLink :to='{ query: ${query} }'>${text}</RouterLink>`
    }
  })

const categories = ref({})

const store = {
  index,
  rhythms: shallowRef({}),
  categories,
  getCategory(id) {
    if (!categories[id]) {
      const name = id // ucfirst(id)
      categories[id] = ref({ name })
      fetch(`./${id}.md`)
        .then(res => res.ok ? res.text() : "")
        .then(text => Object.assign(categories[id].value, yamlHeaderMarkdown(text)))
    }
    return categories[id]
  },
}

function enrichRhythm([pattern, r]) {
  const rhythm = new Rhythm(pattern)

  r.first = rhythm.first()
  r.length = rhythm.length
  r.beats = rhythm.beats()
  r.durations = rhythm.durations()
  r.divisor = rhythm.divisor()
  r.repetitions = rhythm.repetitions()

  r.condense = rhythm.condense()
  r.category = new Set(r.category || [])

  r.core = rhythm.clone().normalize()
  if (pattern == r.core.toString() ) {
    r.category.add("core")
  }

  if (rhythm.odd()) {
    r.category.add("odd")
  }

  r.euclidean = Rhythm.fromEuclidean(r.beats, r.length).equals(rhythm)
  if (r.euclidean) {
    r.category.add("euclidean")
  }

  r.rhythm = rhythm
}

fetch("rhythms.json")
  .then(res => res.json())
  .then(res => {
    Object.entries(res).forEach(enrichRhythm)
    store.rhythms.value = res
  })

const path = window.location.pathname
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path, component: App }],
})

createApp({ template: "<router-view></router-view>" })
  .provide("store", store)
  .use(router)
  .mount("#app")
