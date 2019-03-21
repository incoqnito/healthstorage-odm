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
    }
}