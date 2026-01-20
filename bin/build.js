import fs from "fs"
import Ajv from "ajv"
import { yamlHeaderMarkdown } from "../package/rhythmicon-app/lib/utils.js"

const rhythms = {}

const ajv = new Ajv({ allErrors: true })
const schema = JSON.parse(fs.readFileSync("rhythms/schema.json"))
const validate = ajv.compile(schema)

fs.readdirSync("rhythms")
  .filter(f => f.match(/^[x-]+\.md$/))
  .sort((x, y) => x.length == y.length ? x.localeCompare(y) : x.length - y.length)
  .forEach(file => {
    const [pattern] = file.split(".")
    file = `rhythms/${file}`
    const text = fs.readFileSync(file, { encoding: "utf8" })
    const rhythm = { ...yamlHeaderMarkdown(text), pattern }
    if (!validate(rhythm)) {
      console.error(`❌ Validation failed for ${file}!`)
      console.error(JSON.stringify(validate.errors, null, 2))
      process.exit(1)
    }
    rhythms[pattern] = rhythm
  })

fs.writeFileSync("rhythms.json", JSON.stringify(rhythms, 0, 2))
