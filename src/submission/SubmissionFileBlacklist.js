const path = require("path")
const fs = require("fs")

const ignoreFileName = ".etignore"
const defaultBlacklistGlobs = ["node_modules/**/*", "coverage/**/*"]

class SubmissionFileBlacklist {
  constructor(directory) {
    this.ignoreFile = path.join(directory, ignoreFileName)
    this.directory = directory
  }

  get gitIgnoreFileContents() {
    if (!this._gitIgnoreFileContents) {
      this._gitIgnoreFileContents = fs.readFileSync(this.ignoreFile).toString()
    }
    return this._gitIgnoreFileContents
  }

  get blacklistGlobs() {
    if (!this._blacklistGlobs) {
      this._blacklistGlobs = defaultBlacklistGlobs.concat(
        this._processIgnoreFileList()
      )
    }
    return this._blacklistGlobs
  }

  _processIgnoreFileList() {
    const gitFileArray = this.gitIgnoreFileContents.split("\n")
    return gitFileArray.reduce((globs, fileLine) => {
      fileLine = fileLine.trim()

      if (fileLine.startsWith("#") || fileLine.length === 0) {
        return [...globs]
      } else {
        let fileOrDir
        try {
         fileOrDir = fs.statSync(path.join(this.directory, fileLine))
        }
        catch (error) {
          if (error.code === "ENOENT"){
            return globs
          } else {
            throw error
          }
        }
        // no error occurred in stating the directory, so add it
        if (fileOrDir && fileOrDir.isDirectory()) {
          fileLine = this._formatDirectoryGlob(fileLine)
        }
        return [...globs, fileLine]
      }
    }, [])
  }

  /**
   * Formats directory globs, converting from .gitignore syntax to standard glob symtax
   *
   * @param { String } glob
   * @returns { String } formatted directory glob
   * @memberof SubmissionFileBlacklist
   */
  _formatDirectoryGlob(glob) {
    let formattedGlob = glob + (glob.endsWith("/") ? "**/*" : "/**/*")
    if (formattedGlob.startsWith("/")) {
      formattedGlob = formattedGlob.substr(1)
    }
    return formattedGlob
  }
}

module.exports = SubmissionFileBlacklist
