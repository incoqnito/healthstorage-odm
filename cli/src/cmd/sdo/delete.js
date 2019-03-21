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
  .command('sdosDown')
  .option('-c, --client <client>', 'Add client data')
  .option('-so, --sdoId <sdoId>', 'SdoId (optional)')
  .option('-s, --schemaId <schemaId>', 'Schema Id')
  .option('-o, --ownerId <ownerId>', 'Owner Id')
  .action(options => {

    let client = options.client || {}
    let schemaId = (options.schemaId !== undefined) ? options.schemaId : false
    let sdoId = (options.sdoId !== undefined) ? options.sdoId : false
    let ownerId = (options.ownerId !== undefined) ? options.ownerId : false
    
    if(!sdoId) {
        HealthStorageODM.getSchema({'id': schemaId}, client)
            .then(schema => {
                let hsClient = new HealthStorageODM(client)
                let hsInstance = hsClient.define({
                    title: schema.title,
                    properties: schema.properties,
                    options: {
                        required: schema.required,
                        id: schemaId,
                        oId: ownerId,
                        r: 1
                    }
                })

                hsInstance.findAll()
                    .then(sdos => console.log(sdos))
                console.log(hsInstance)
            })
            .catch(error => {
                console.log(error)
            })
    }
  })
  .description('Add sdo/sdos to HsOdm')

program.parse(process.argv)