const Initialization = require("./initialization")
const tmp = require("tmp")
const path = require("path")
const fs = require("fs")

describe("initializing", () => {
  const dir = tmp.dirSync().name
  const userName = "samIAm"
  const token = "3412341234"
  const host = "http://localhost"
  let initialization

  const parseJson = () => {
    const contents = fs.readFileSync(path.join(dir, ".et"))
    return JSON.parse(contents.toString())
  }

  beforeEach(() => {
    initialization = new Initialization(
      {
        userName,
        token,
        host
      },
      dir
    )
  })

  it("writes the et file", () => {
    initialization.write()

    expect(fs.existsSync(path.join(dir, ".et"))).toBe(true)
  })

  it("writes the user name", () => {
    initialization.write()
    const json = parseJson()
    expect(json.userName).toEqual(userName)
  })

  it("writes the token", () => {
    initialization.write()
    const json = parseJson()
    expect(json.token).toEqual(token)
  })

  it("writes the host", () => {
    initialization.write()
    const json = parseJson()
    expect(json.host).toEqual(host)
  })
})
