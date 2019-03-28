const fs = require("fs")
const path = require("path")
const etFileName = ".et"
const Configuration = require("./configuration")

class Initialization {
  constructor(paramsToWrite = { userName, token, host }, directory) {
    this.directory = directory
    this.configuration = new Configuration(paramsToWrite)
  }

  write() {
    this.configuration.saveToFile(path.join(this.directory, etFileName))
  }
}

module.exports = Initialization
