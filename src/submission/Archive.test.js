const Archive = require("./Archive")
const path = require("path")
const fs = require("fs")

const exercisePath = path.join(__dirname, "../../test/fixtures/sample-exercise")
describe("Archive", () => {
  let archive

  beforeEach(() => {
    archive = new Archive(exercisePath)
  })

  it("archives the file", async () => {
    const filePath = await archive.save()
    expect(fs.existsSync(filePath)).toBe(true)
    fs.unlinkSync(filePath)
  })
})
