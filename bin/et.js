const cmd = require("commander")

cmd
  .version("0.1.0")
  .command("init", "sets up a working directory for Launch challenges")
  .parse(process.argv)
