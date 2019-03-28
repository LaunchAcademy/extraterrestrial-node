const cmd = require("commander")
const inquirer = require("inquirer")
const Initialization = require("../src/initialization")

cmd.parse(process.argv)

const validResponse = input => {
  if (input.trim() !== "") {
    return true
  } else {
    return "Please specify a value"
  }
}

inquirer
  .prompt([
    {
      type: "input",
      message: "User Name",
      name: "userName",
      validate: validResponse
    },
    {
      type: "input",
      message: "Token",
      name: "token",
      validate: validResponse
    },
    {
      type: "input",
      message: "Host",
      name: "host",
      default: "https://learn.launchacademy.com",
      validate: validResponse
    }
  ])
  .then(answers => {
    const initialization = new Initialization(answers, process.cwd())
    console.log(`Writing ET config to ${process.cwd()}`)
    initialization.write()
  })
