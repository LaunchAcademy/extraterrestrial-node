const Client = require("./Client")
const tmp = require("tmp")
const request = require("request")
const zlib = require("zlib")
const fs = require("fs")
const tar = require("tar")

class LessonRetrieval {
  constructor(slug, config) {
    this.slug = slug
    this.config = config
  }

  get client() {
    if (!this._client) {
      this._client = new Client(this.config)
    }
    return this._client
  }

  async get() {
    const lesson = await this.client.getLesson(this.slug)
    if (lesson) {
      const destination = tmp.tmpNameSync()
      await new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(destination)
        writeStream.on("close", () => {
          resolve()
        })
        request.get(lesson.archive_url).pipe(writeStream)
      })

      return tar
        .x({
          file: destination
        })
        .then(() => {
          return this.slug
        })
    } else {
      return null
    }
  }
}

module.exports = LessonRetrieval
