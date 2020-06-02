const path = require("path")
const fs = require("fs").promises

const configFileName = ".et"

class LessonDirectory {
  static async recursivelyLoad(dir = process.cwd()) {
    if (!this.directory) {
      let pathToCheck = dir
      while (pathToCheck !== "." && !this.directory) {
        const parentDir = path.dirname(pathToCheck)

        try {
          await fs.access(parentDir + "/" + configFileName)
          debugger
          this.directory = pathToCheck
        } catch (error) {
          pathToCheck = parentDir
        }
      }
    }
    return this.directory || null
  }
}

module.exports = LessonDirectory
