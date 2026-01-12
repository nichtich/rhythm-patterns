import { createApp } from "vue"
import { router } from "./router"

createApp({ template: "<router-view></router-view>" })
  .use(router).mount("#app")
