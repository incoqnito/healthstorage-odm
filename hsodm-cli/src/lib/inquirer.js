/** import inquirer */
import inquirer from "inquirer"

/** import uuid */
import uuid from "uuid/v4"

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
        type: 'input',
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

  /** Ask for ownerId input */
  askForOwnerId: () => {
    const askForOwnerId = [
      {
        type: 'input',
        name: 'ownerId',
        message: 'Enter owner id:',
        default: uuid(),
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a valid schema id';
          }
        }
      }
    ];
    return inquirer.prompt(askForOwnerId);
  },

  /** Ask for schema path */
  askForPathToSchema: () => {
    const askForSchemaPath = [
      {
        type: 'input',
        name: 'schemaPath',
        message: 'Enter path to schema:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a valid schema path';
          }
        }
      }
    ];
    return inquirer.prompt(askForSchemaPath);
  },

  /** Ask for sdoId input */
  askForSdoId: () => {
    const askForSdoId = [
      {
        type: 'input',
        name: 'sdoId',
        message: 'Enter sdo id:',
        default: uuid(),
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a valid sdo id';
          }
        }
      }
    ];
    return inquirer.prompt(askForSdoId);
  },

  /** Ask for schema path */
  askForPathToSdos: () => {
    const askForSdoPath = [
      {
        type: 'input',
        name: 'sdosPath',
        message: 'Enter path to import sdos froms:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a valid sdo path';
          }
        }
      }
    ];
    return inquirer.prompt(askForSdoPath);
  },
}