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
.command('schemaDown')
.option('-c, --client <client>', 'Add client data')
.option('-s, --schemaId <schemaId>', 'Add add schema id')
.action(options => {
    let client = options.client || {}
    let schemaId = (options.schemaId !== undefined) ? options.schemaId : false

    if(schemaId !== false) {
    HealthStorageODM.deleteSchema(schemaId, client)
    .then(response => {
        console.log("\n\n=========> Deleted schema id")
        if(response) {
            console.log(schemaId)
        } else {
            console.log("\n\nSomething went wrong.")
        }
        console.log("\n\n")
    })
    .catch(error => {
        console.log("\n\n=========> Error schema down")
        console.log(error.message)
        console.log("\n\n")
    })
    }
})
.description('Remove a schema from HsOdm')

program.parse(process.argv)