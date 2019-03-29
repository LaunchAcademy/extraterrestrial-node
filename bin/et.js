const cmd = require("commander")

cmd
  .version("0.1.0")
  .command("init", "sets up a working directory for Launch challenges")
  .command("list", "lists available lessons")
  .command("get", "retrieves a lesson")
  .parse(process.argv)
