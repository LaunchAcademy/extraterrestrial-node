const path = require("path")
const FileList = require("./FileList")
describe("FileList", () => {
  let fileList
  let list
  beforeEach(async () => {
    fileList = new FileList(
      path.join(__dirname, "../../test/fixtures/bloated-challenge")
    )
    list = await fileList.files()
  })

  it("includes a relevant file", async () => {
    expect(list.includes("problem.rb")).toBe(true)
  })

  it("ignores a file included in a glob", () => {
    expect(list.includes("node_modules/boo/somefile.js")).toBe(false)
  })

  it("ignores a static file defined in .lesson.yml ignore", () => {
    expect(list.includes("bloated-challenge.md")).toBe(false)
  })

  it("ignores a file globbed in .lesson.yml ignore", () => {
    expect(list.includes("rando_folder/rando_file.js")).toBe(false)
  })
})
