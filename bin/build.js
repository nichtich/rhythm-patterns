import fs from "fs"
import { yamlHeaderMarkdown } from "../package/rhythmicon-app/lib/utils.js"

const rhythms = {}

fs.readdirSync("rhythms")
  .filter(f => f.match(/^[x-]+\.md$/))
  .sort((x,y) => x.length == y.length ? x.localeCompare(y) : x.length - y.length)
  .forEach(file =>  {
    const [pattern] = file.split(".")
    const text = fs.readFileSync(`rhythms/${file}`, { encoding: "utf8" })
    rhythms[pattern] = { ...yamlHeaderMarkdown(text), pattern }
  })

fs.writeFileSync("rhythms.json", JSON.stringify(rhythms,0,2))
