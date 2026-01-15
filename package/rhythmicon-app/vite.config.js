import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import fs from "node:fs"
import path from "node:path"

export default defineConfig({
  plugins: [
    vue(),
    {
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.endsWith(".md")) {
            const file = path.join(process.cwd(), "pages", req.url)
            if (!fs.existsSync(file)) {
              res.statusCode = 404
              res.end("Not Found")
              return
            }
          }
          next()
        })
      },
    },
  ],
  publicDir: "pages",
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
})
