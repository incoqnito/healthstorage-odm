/** Require */
const program = require('commander')

/** Get version */
program
  .version('0.0.1')
  .description('HsOdm Cli Schema System')

/** Add schema */
program
  .command('addSchema')
  .option('-p, --path <path>', 'Add path to schema')
  .option('-c, --client <client>', 'Add client data')
  .action(options => {
    if(options.path !== undefined) {
      let schema = require(options.path)
      if(schema !== undefined) {
        console.log(schema)
      } else {
        throw new Error("No schema detected at path")
      }
    } else {
      throw new Error("No path to schema file detected")
    }
  })
  .description('Add a schema to HsOdm')

program.parse(process.argv)