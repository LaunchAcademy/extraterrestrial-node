const defaultIgnoreGlobs = [".lesson.yml", "node_modules/**/*"]
const glob = require("fast-glob")
const LessonConfiguration = require("../LessonConfiguration")

class FileList {
  constructor(rootPath) {
    this.rootPath = rootPath
  }

  get lessonIgnores() {
    if (!this._lessonIgnores) {
      const config = new LessonConfiguration(this.rootPath)
      this._lessonIgnores = config.ignore || []
    }
    return this._lessonIgnores
  }

  files() {
    // console.log(defaultIgnoreGlobs.concat(this.lessonIgnores))
    return glob("**/*", {
      cwd: this.rootPath,
      ignore: defaultIgnoreGlobs.concat(this.lessonIgnores)
    }).then(entries => {
      return entries
    })
  }
}

module.exports = FileList
