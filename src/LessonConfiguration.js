const path = require("path")
const yaml = require("js-yaml")
const fs = require("fs")
const findUp = require("find-up")

const configFileName = ".lesson.yml"

class LessonConfiguration {
  constructor(directory) {
    this.configFile = path.join(directory, configFileName)
    this.directory = directory
    return new Proxy(this, {
      get: (target, property) => {
        if (property in target) {
          return target[property]
        } else if (!!this.doc && property in this.doc) {
          return this.doc[property]
        }
      }
    })
  }

  get doc() {
    if (!this._doc) {
      this._doc = yaml.safeLoad(fs.readFileSync(this.configFile))
    }
    return this._doc
  }

  static recursivelyLoad(wd = null) {
    const ymlFile = findUp.sync(configFileName)
    if (ymlFile) {
      return new LessonConfiguration(path.dirname(ymlFile))
    } else {
      return null
    }
  }
}

module.exports = LessonConfiguration
