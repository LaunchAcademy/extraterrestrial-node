const path = require("path")
const yaml = require("js-yaml")
const fs = require("fs")

const configFileName = ".lesson.yml"

class LessonConfiguration {
  constructor(directory) {
    this.configFile = path.join(directory, configFileName)
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
}

module.exports = LessonConfiguration
