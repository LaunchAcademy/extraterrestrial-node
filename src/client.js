const request = require("request-promise-native")

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
}

module.exports = Client
