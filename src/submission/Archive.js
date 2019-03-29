const FileList = require("./FileList")
const tar = require("tar")
const tmp = require("tmp")

class Archive {
  constructor(directory) {
    this.directory = directory
  }

  async hasFilesToSubmit() {
    const list = await this.getFileList()
    return list.length > 0
  }

  async save() {
    const filePath = tmp.fileSync({ postfix: ".tar.gz" }).name
    return tar
      .c(
        {
          file: filePath,
          gzip: true,
          portable: true,
          dmode: "0755",
          fmode: "0555",
          cwd: this.directory
        },
        await this.getFileList()
      )
      .then(tar => {
        return filePath
      })
  }

  async getFileList() {
    const listObj = new FileList(this.directory)
    return listObj.files()
  }
}

module.exports = Archive
