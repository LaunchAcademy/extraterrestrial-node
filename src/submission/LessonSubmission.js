const path = require("path")
const Client = require("../Client")
const Archive = require("./Archive")
const NoFilesToSubmitError = require("./NoFilesToSubmitError")

class LessonSubmission {
  constructor(lessonConfig, config) {
    this.lessonConfig = lessonConfig
    this.config = config
  }

  get lessonPath() {
    return this.lessonConfig.directory
  }

  async submit() {
    const client = new Client(this.config)
    const archive = new Archive(this.lessonPath)
    if (await archive.hasFilesToSubmit()) {
      const tarFilePath = await archive.save()
      return client.submitLesson(this.getSlug(), tarFilePath)
    } else {
      return Promise.reject(new NoFilesToSubmitError("No files to submit!"))
    }
  }

  getSlug() {
    const paths = this.lessonPath.split(path.sep)
    return paths[paths.length - 1]
  }
}

module.exports = LessonSubmission
