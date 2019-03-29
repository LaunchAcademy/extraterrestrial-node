const request = require("request-promise-native")
const fs = require("fs")

class Client {
  constructor(configuration) {
    this.configuration = configuration
  }

  get userName() {
    return this.configuration.userName
  }

  get password() {
    return this.configuration.token
  }

  get host() {
    return this.configuration.host
  }

  get baseRequest() {
    if (!this._baseRequest) {
      this._baseRequest = request.defaults({
        baseUrl: this.host,
        auth: {
          user: this.userName,
          pass: this.password
        }
      })
    }
    return this._baseRequest
  }

  listLessons() {
    return this.baseRequest.get("/lessons.json").then(resp => {
      return JSON.parse(resp).lessons
    })
  }

  submitLesson(slug, archivePath) {
    return this.baseRequest.post(this._submission_path(slug), {
      formData: {
        "submission[archive]": fs.createReadStream(archivePath)
      }
    })
  }

  getLesson(slug) {
    return this.baseRequest
      .get(`/lessons/${slug}.json`)
      .then(resp => {
        return JSON.parse(resp).lesson
      })
      .catch(err => {
        return null
      })
  }

  _submission_path(slug) {
    return `/lessons/${slug}/submissions.json`
  }
}

module.exports = Client
