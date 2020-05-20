const path = require("path")
const SubmissionFileBlacklist = require("./SubmissionFileBlacklist")

describe("SubmissionFileBlacklist", () => {
  let submissionFileBlacklist
  let globs

  beforeEach(() => {
    submissionFileBlacklist = new SubmissionFileBlacklist(
      path.join(__dirname, "../../test/fixtures/bloated-challenge")
    )

    globs = submissionFileBlacklist.blacklistGlobs
  })

  it("includes default blacklist globs", async () => {
    expect(globs.includes(".lesson.yml")).toBe(true)
    expect(globs.includes("node_modules/**/*")).toBe(true)
  })

  it("includes file from ignore file", () => {
    expect(globs.includes("bloated-challenge.md")).toBe(true)
  })

  it("includes directory from ignore file", () => {
    expect(globs.includes("rando_folder/**/*")).toBe(true)
  })

  it("ignores comment in ignore file", () => {
    expect(globs.includes("# Here's a comment")).toBe(false)
  })
})
