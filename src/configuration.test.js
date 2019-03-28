const Configuration = require("./configuration")
const path = require("path")
describe("configuration", () => {
  it("can load from a file", () => {
    const config = Configuration.loadFromFile(
      path.join(__dirname, "../test/fixtures/sampleConfig.json")
    )

    expect(config.userName).toBeDefined()
  })
})
