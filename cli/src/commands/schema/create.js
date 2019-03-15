/** Import */
import HealthStorageODM from "../../../../dist/healthStorage"
import uuid from 'uuid'

/** Require */
const program = require('commander')


/** Get version */
program
  .version('0.0.1')
  .description('HsOdm Cli Schema System')

/** Add schema */
program
  .command('schemaUp')
  .option('-c, --client <client>', 'Add client data')
  .option('-p, --path <path>', 'Add path to schema')
  .option('-o, --ownerId <path>', 'Add owner id to schema')
  .action(options => {
    let client = options.client || {}
    let schema = (options.path !== undefined) ? require(options.path.replace("./../", "./../../")) : false

    let opts = {
        'title': schema.schema.title,
        'options': {
            'required': schema.schema.required,
            'id': schema.schema.$id.replace('urn:btssid:',"").split("/").shift() || uuid(),
            'oId': options.ownerId
        },
        'properties': schema.schema.properties
    }

    HealthStorageODM.createSchema(opts, client)
      .then(schema => {
          console.log("\n\n=========> Generated schema id")
          console.log(schema.$id.replace('urn:btssid:',"").split("/").shift())
          console.log("\n\n")
      })
      .catch(error => {
          console.log("\n\n=========> Error schema up")
          console.log(error.message)
          console.log("\n\n")
      })
  })
  .description('Add a schema to HsOdm')

program.parse(process.argv)