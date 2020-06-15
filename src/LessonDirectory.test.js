const LessonDirectory = require("./LessonDirectory")
const path = require("path")

describe("Lesson Directory", () => {
  it("returns null if no parent contains .et", async () => {
    const { directory } = await LessonDirectory.recursivelyLoad("bin")
    expect(directory).toBeUndefined()
  })

  it("identifies lesson directory", async () => {
    const { directory } = await LessonDirectory.recursivelyLoad(
      "test/fixtures/bloated-challenge/rando_folder/rando_file.js"
    )
    expect(directory).toEqual("test/fixtures/bloated-challenge")
  })
})
