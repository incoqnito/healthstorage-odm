/** Import */
import HealthStorageODM from "../../../../dist/healthStorage"

/** Require */
const program = require('commander')


/** Get version */
program
  .version('0.0.1')
  .description('HsOdm Cli Sdo System')

/** Add schema */
program
  .command('sdosUp')
  .option('-c, --client <client>', 'Add client data')
  .option('-q, --sdoPath <sdoPath>', 'Add path to sdo')
  .option('-p, --schemaPath <schemaPath>', 'Add path to schema')
  .option('-o, --ownerId <owenerId>', 'Add path to schema')
  .action(options => {

    let client = options.client || {}
    let schema = (options.schemaPath !== undefined) ? require(options.schemaPath) : false
    let sdos = (options.sdoPath !== undefined) ? require(options.sdoPath) : false
    
    let sId = schema.schema.$id.replace('urn:btssid:',"").split("/").shift()

    let hsClient = new HealthStorageODM(client)
    let hsInstance = hsClient.define({
      title: schema.schema.title,
      properties: schema.schema.properties,
      options: {
        required: schema.schema.required,
        id: sId,
        oId: options.ownerId,
        r: 1
      }
    })

    sdos.map(sdo => {

      let promise = hsInstance.create(sdo)
      Promise.resolve(promise)
        .then(sdoModel => {
          console.log("\n=========> Generated sdo id")
          console.log(sdoModel.md.id)
          console.log("\n")
        })
        .catch(error => {
          console.log("\n=========> Error schema up")
          console.log(error.message)
          console.log("\n")
        })
    })

  })
  .description('Add sdo/sdos to HsOdm')

program.parse(process.argv)