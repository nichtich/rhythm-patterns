import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import RhythmCircle from "../components/RhythmCircle.vue"
import Rhythm from "rhythmicon-rhythm"

const mountRhythmCircle = props => mount(RhythmCircle, { props })

describe("RhythmCircle", () => {
  it("renders with rhythm Array", () => {
    const circle = mountRhythmCircle({ rhythm: [1, 0, 1, 0] })
    expect(circle.find("svg").exists()).toBe(true)

    const points = circle.findAll("g circle")
    expect(points.length).toBe(4)
  })

  it("renders with Rhythm object", () => {
    const circle = mountRhythmCircle({ rhythm: new Rhythm([1, 0, 1, 0]) })
    expect(circle.find("svg").exists()).toBe(true)
  })

  it("emits toggle event when dot clicked", async () => {
    const circle = mountRhythmCircle({ rhythm: [1, 0, 1, 0] })

    const points = circle.findAll("g circle")
    await points[2].trigger("click")

    expect(circle.emitted()).toHaveProperty("toggle")
    expect(circle.emitted("toggle")[0]).toEqual([2])
  })
})
