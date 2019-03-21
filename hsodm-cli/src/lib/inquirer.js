/** import inquirer */
import inquirer from "inquirer"

/** import constants */
import { apiEndpointChoices, apiEndpointActionChoices } from "./../constants"

module.exports = {
  /** Ask for api endpoint interaction */
  askApiEndpointInteraction: () => {
    const apiEndpointInteraction = [
      {
        type: 'list',
        name: 'endpoint',
        message: 'Select api endpoint to interact with:',
        choices: apiEndpointChoices,
        default: ['Schemas']
      }
    ];
    return inquirer.prompt(apiEndpointInteraction);
  },

  /** Ask for api endpoint action interaction */
  askApiEndpointActionInteraction: (endpoint) => {
    const apiEndpointActionInteraction = [
      {
        type: 'list',
        name: 'action',
        message: 'Select api action to interact with:',
        choices: apiEndpointActionChoices[endpoint],
        default: ['Schemas']
      }
    ];
    return inquirer.prompt(apiEndpointActionInteraction);
  },

   /** Ask for schemId input */
   askForSchemaId: () => {
    const askForSchemaId = [
      {
        type: 'inpiut',
        name: 'schemaId',
        message: 'Enter schema id:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a valid schema id';
          }
        }
      }
    ];
    return inquirer.prompt(askForSchemaId);
  },
}