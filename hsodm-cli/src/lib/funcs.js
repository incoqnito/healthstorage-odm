/** import hsodm */
import HealthStorageODM from "./../../../dist/healthStorage"

/** require babel */
require("@babel/register");
require("@babel/polyfill");

/** import inquirer */
import inquirer from "./inquirer"
import chalk from "chalk"

/** import constants */
import { localClient } from "./../constants"

/** cli func lib */
export const apiFuncLib = {

    /** get schema by id */
    getSchema: async () => {
        const schemaId = await inquirer.askForSchemaId()
        HealthStorageODM.getSchema({'id': schemaId.schemaId}, localClient)
            .then(response => {
                console.log(chalk.greenBright("\n=========> Found schema\n"))
                console.log(response)
                console.log("\n")
            })
            .catch(error => {
                console.log(chalk.redBright("\nError: " + error.message + "\n"))
            })
    },

    /** add schema */
    addSchema: async () => {
        const schemaPath = await inquirer.askForPathToSchema()
        const ownerId = await inquirer.askForOwnerId()

        let schema = require(schemaPath.schemaPath)
        let opts = {
            'title': schema.schema.title,
            'options': {
                'required': schema.schema.required,
                'id': schema.schema.$id.replace('urn:btssid:',"").split("/").shift() || uuid(),
                'oId': ownerId
            },
            'properties': schema.schema.properties
        }
        HealthStorageODM.createSchema(opts, localClient)
            .then(schema => {
                console.log(chalk.greenBright("\n=========> Created schema with id\n"))
                console.log(schema.$id.replace('urn:btssid:',"").split("/").shift())
                console.log("\n")
            })
            .catch(error => {
                console.log(chalk.redBright("\nError: " + error.message + "\n"))
            })
    },

    /** add schema */
    deleteSchema: async () => {
        const schemaId = await inquirer.askForSchemaId()

        HealthStorageODM.deleteSchema(schemaId, localClient)
            .then(response => {
                if(response) {
                    console.log(chalk.greenBright("\n=========> Deleted schema with id\n"))
                    console.log(schemaId.schemaId)
                    console.log("\n")
                } else {
                    console.log(chalk.redBright("\nError: Could not delete schema\n"))
                }
            })
            .catch(error => console.log(chalk.redBright("\nError: " + error.message + "\n")))
    },

    /** get sdos */
    getSdos: async () => {
        const schemaId = await inquirer.askForSchemaId()
        const ownerId = await inquirer.askForOwnerId()

        HealthStorageODM.getSchema({'id': schemaId.schemaId}, localClient)
            .then(schema => {
                let hsClient = new HealthStorageODM(localClient)
                let hsInstance = hsClient.define({
                    title: schema.title,
                    properties: schema.properties,
                    options: {
                        required: schema.required,
                        id: schemaId.schemaId,
                        oId: ownerId.ownerId,
                        r: 1
                    }
                })

                hsInstance.findAll()
                    .then(sdos => {
                        console.log(chalk.greenBright("\n=========> Found sdo models\n"))
                        sdos.list.map(sdo => console.log(sdo))
                        console.log("\n")
                    })
                    .catch(error => console.log(chalk.redBright("\nError sdo models: " + error.message + "\n")))
            })
            .catch(error => console.log(chalk.redBright("\nError hsodm: " + error.message + "\n")))
    },

    /** get sdo by id */
    getSdo: async () => {
        const schemaId = await inquirer.askForSchemaId()
        const ownerId = await inquirer.askForOwnerId()
        const sdoId = await inquirer.askForSdoId()

        HealthStorageODM.getSchema({'id': schemaId.schemaId}, localClient)
            .then(schema => {
                let hsClient = new HealthStorageODM(localClient)
                let hsInstance = hsClient.define({
                    title: schema.title,
                    properties: schema.properties,
                    options: {
                        required: schema.required,
                        id: schemaId.schemaId,
                        oId: ownerId.ownerId,
                        r: 1
                    }
                })

                hsInstance.findById(sdoId.sdoId)
                    .then(sdoModel => {
                        console.log(chalk.greenBright("\n=========> Found sdo model\n"))
                        console.log(sdoModel)
                        console.log("\n")
                    })
                    .catch(error => console.log(chalk.redBright("\nError: " + error.message + "\n")))
            })
            .catch(error => console.log(chalk.redBright("\nError: " + error.message + "\n")))
    }
}