const path = require("path")
const fs = require("fs")
const findUp = require("find-up")
const etFileName = ".et"

class Configuration {
  constructor({ userName, token, host }) {
    this.userName = userName
    this.token = token
    this.host = host
  }

  saveToFile(filePath) {
    const strToWrite = JSON.stringify(this.toJSON())
    fs.writeFileSync(filePath, strToWrite)
  }

  toJSON() {
    const { userName, token, host } = this
    return {
      userName,
      token,
      host
    }
  }

  static loadFromFile(filePath) {
    const contents = fs.readFileSync(filePath)
    return new Configuration(JSON.parse(contents))
  }

  static recursivelyLoad(wd = null) {
    const workingDir = wd || process.cwd()
    const configPath = findUp.sync(etFileName, { cwd: wd })
    if (configPath) {
      return Configuration.loadFromFile(configPath)
    } else {
      return null
    }
  }

  static loadFromDirectory(directory) {
    return Configuration.loadFromFile(path.join(directory, etFileName))
  }
}

module.exports = Configuration
