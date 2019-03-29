const Configuration = require("../src/Configuration")
const Client = require("../src/Client")

const config = Configuration.loadFromDirectory(process.cwd())
const { table } = require("table")

;(async function() {
  const client = new Client(config)
  const response = await client.listLessons()
  const tableConfig = {
    columns: {
      0: {
        width: 30
      },
      1: {
        width: 47
      },
      2: {
        width: 13
      }
    }
  }
  console.log(
    table(
      response.map(lesson => [lesson.title, lesson.slug, lesson.type]),
      tableConfig
    )
  )
})()
