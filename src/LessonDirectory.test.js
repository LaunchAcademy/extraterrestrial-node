const LessonDirectory = require("./LessonDirectory")
const path = require("path")

describe("Lesson Directory", () => {
  it("returns null if no parent contains .et", async () => {
    const dir = await LessonDirectory.recursivelyLoad("bin")
    expect(dir).toEqual(null)
  })

  it("identifies lesson directory", async () => {
    const dir = await LessonDirectory.recursivelyLoad(
      "test/fixtures/bloated-challenge/rando_folder/rando_file.js"
    )
    expect(dir).toEqual("test/fixtures/bloated-challenge")
  })
})
