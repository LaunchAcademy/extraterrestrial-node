const fs = require("fs")
const path = require("path")
const etFileName = ".et"

class Initialization {
  constructor(paramsToWrite = { userName, token, host }, directory) {
    this.directory = directory
    this.paramsToWrite = paramsToWrite
  }

  write() {
    const strToWrite = JSON.stringify(this.paramsToWrite)
    fs.writeFileSync(path.join(this.directory, etFileName), strToWrite)
  }
}

module.exports = Initialization
