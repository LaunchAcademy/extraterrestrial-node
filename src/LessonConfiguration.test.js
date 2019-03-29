const LessonConfiguration = require("./LessonConfiguration")
const path = require("path")

describe("Lesson Configuration", () => {
  let lessonConfig
  beforeEach(() => {
    lessonConfig = new LessonConfiguration(
      path.join(__dirname, "../test/fixtures/bloated-challenge")
    )
  })
  it("has a title", () => {
    expect(lessonConfig.title).toEqual("Bloated Challenge")
  })

  it("has an ignore array", () => {
    expect(lessonConfig.ignore).toBeInstanceOf(Array)
  })
})
