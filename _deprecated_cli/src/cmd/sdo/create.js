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
  .option('-a, --sdoPath <sdoPath>', 'Add path to sdo')
  .option('-s, --schemaId <schemaId>', 'Add path to schema')
  .option('-o, --ownerId <owenerId>', 'Add path to schema')
  .action(options => {

    let client = options.client || {}
    let schemaId = (options.schemaId !== undefined) ? options.schemaId : false
    let sdos = (options.sdoPath !== undefined) ? require(options.sdoPath) : false
    
    HealthStorageODM.getSchema({'id': schemaId}, client)
      .then(schema => {
        let hsClient = new HealthStorageODM(client)
        let hsInstance = hsClient.define({
          title: schema.title,
          properties: schema.properties,
          options: {
            required: schema.required,
            id: schemaId,
            oId: options.ownerId,
            r: 1
          }
        })
      
        sdos.map(sdo => {
            console.log(sdo)
        })
        // let promises = sdos.map(sdo => {
        //   return hsInstance.create(sdo)
        // })

        // Promise.all(promises)
        //     .then(sdoModel => {
        //       console.log(sdoModel)
        //       console.log("\n=========> Generated sdo id")
        //       console.log(sdoModel.md.id)
        //       console.log("\n")
        //     })
        //     .catch(error => {
        //       console.log("\n=========> Error sdos up")
        //       console.log(error.message)
        //       console.log("\n")
        //     })
      })
      .catch(error => {
        console.log("\n=========> Error schema found")
        console.log(error.message)
        console.log("\n")
      })
  })
  .description('Add sdo/sdos to HsOdm')

program.parse(process.argv)