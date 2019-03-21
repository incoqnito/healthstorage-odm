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
.command('schemasGet')
.option('-c, --client <client>', 'Add client data')
.option('-s, --schemaIds <schemaIds>', 'Add schema ids comma seperated')
.action(options => {
    let client = options.client || {}
    let schemaIds = (options.schemaIds !== undefined) ? options.schemaIds : false

    if(schemaIds !== false) {
        let promises = HealthStorageODM.getSchemas({'ids': schemaIds.split(",")}, client)
        promises.map(promise => {
            Promise.resolve(promise)
                .then(schema => {
                    let sTitle = schema.title || "No id matched for schema"
                    console.log("\n=========> Found schema: " + sTitle + "\n")
                    if(schema) {
                        console.log(schema)
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
        })
    }
})
.description('Get a schema by id from HsOdm')

program.parse(process.argv)