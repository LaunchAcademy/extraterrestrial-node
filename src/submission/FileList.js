const glob = require("fast-glob")
const FileBlacklist = require("./SubmissionFileBlacklist")

class FileList {
  constructor(rootPath) {
    this.rootPath = rootPath
  }

  get blacklistGlobs() {
    if (!this._blacklistGlobs) {
      const fileBlacklist = new FileBlacklist(this.rootPath)
      this._blacklistGlobs = fileBlacklist.blacklistGlobs || []
    }
    return this._blacklistGlobs
  }

  files() {
    return glob("**/*", {
      cwd: this.rootPath,
      ignore: this.blacklistGlobs
    }).then(entries => {
      return entries
    })
  }
}

module.exports = FileList
