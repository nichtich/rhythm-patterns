import { createApp, shallowRef } from "vue"
import { createRouter, createWebHistory } from "vue-router"

import Rhythm from "rhythmicon-rhythm"
import App from "./App.vue"

function enrichRhythm([pattern,r]) {
  const rhythm = new Rhythm(pattern) 
  if (!("first" in r)) {
    r.first = rhythm.first()
  }

  r.length = rhythm.length
  r.divisor = rhythm.divisor()
  r.beats = rhythm.beats()
  r.repetitions = rhythm.repetitions()
  r.condense = r.divisor === 1 && r.repetitions === 1

  if (!r.category) {
    r.category = []
  }

  r.core = rhythm.core()
  if (r.core) {
    r.category.push("core")
  }

  r.euclidean = Rhythm.euclidean(r.beats,r.length).equal(rhythm)
  if (r.euclidean) {
    r.category.push("euclidean")
  }
}

const store = {
  index: document.querySelector("#app main").innerHTML,
  rhythms: shallowRef({}),
}

fetch("rhythms.json")
  .then(res => res.json())
  .then(rhythms => {
    Object.entries(rhythms).forEach(enrichRhythm)
    store.rhythms.value = rhythms 
  })

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: App }],
})

createApp({ template: "<router-view></router-view>" })
  .provide("store", store)
  .use(router)
  .mount("#app")

