/** require babel */
require("@babel/register");
require("@babel/polyfill");

/** interactive cli methos */
import chalk from "chalk"
import clear from "clear"
import figlet from "figlet"

/** lib */
import inquirer from "./lib/inquirer"
import { apiFuncLib } from "./lib/funcs"

/** constants */
import { apiEndpointActionInput } from "./constants"

/** cli clear */
clear();

/** add extra row */
console.log("\n")

/** cli header */
console.log(
  chalk.blue(
    figlet.textSync('HS-ODM', { horizontalLayout: 'full' })
  )
);

/** run function */
const run = async () => {

  /** await api interaction endpoint */
  const apiEndpoint = await inquirer.askApiEndpointInteraction();

  /** await api interaction endpoint action */
  const apiEndpointAction = await inquirer.askApiEndpointActionInteraction(apiEndpoint.endpoint);

  /** call inputs based on choice */
  const choiceBasedAction = apiEndpointActionInput[apiEndpoint.endpoint][apiEndpointAction.action]

  /** call next runtime */
  apiFuncLib[choiceBasedAction.func]()
}

/** run programm */
run();