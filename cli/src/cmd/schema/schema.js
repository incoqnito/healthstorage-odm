/** Import */
import HealthStorageODM from "../../../../dist/healthStorage"

/** Require */
const program = require('commander')

/** Get version */
program
.version('0.0.1')
.description('HsOdm Cli Schema System')

/** Add schema */
program
.command('schemaGet')
.option('-c, --client <client>', 'Add client data')
.option('-s, --schemaId <schemaId>', 'Add schema ids')
.action(options => {
    let client = options.client || {}
    let schemaId = (options.schemaId !== undefined) ? options.schemaId : false

    if(schemaId !== false) {
    HealthStorageODM.getSchema({'id': schemaId}, client)
        .then(response => {
            console.log("\n\n=========> Found schemas")
            if(response) {
                console.log(response)
            } else {
                console.log("\n\nSomething went wrong.")
            }
            console.log("\n\n")
        })
        .catch(error => {
            console.log("\n\n=========> Error get schema")
            console.log(error.message)
            console.log("\n\n")
        })
    }
})
.description('Get a schema by id from HsOdm')

program.parse(process.argv)