"use strict";

var _inquirer = _interopRequireDefault(require("inquirer"));

var _constants = require("./../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** import inquirer */

/** import constants */
module.exports = {
  /** Ask for api endpoint interaction */
  askApiEndpointInteraction: function askApiEndpointInteraction() {
    var apiEndpointInteraction = [{
      type: 'list',
      name: 'endpoint',
      message: 'Select api endpoint to interact with:',
      choices: _constants.apiEndpointChoices,
      default: ['Schemas']
    }];
    return _inquirer.default.prompt(apiEndpointInteraction);
  },

  /** Ask for api endpoint action interaction */
  askApiEndpointActionInteraction: function askApiEndpointActionInteraction(endpoint) {
    var apiEndpointActionInteraction = [{
      type: 'list',
      name: 'action',
      message: 'Select api action to interact with:',
      choices: _constants.apiEndpointActionChoices[endpoint],
      default: ['Schemas']
    }];
    return _inquirer.default.prompt(apiEndpointActionInteraction);
  },

  /** Ask for schemId input */
  askForSchemaId: function askForSchemaId() {
    var askForSchemaId = [{
      type: 'inpiut',
      name: 'schemaId',
      message: 'Enter schema id:',
      validate: function validate(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a valid schema id';
        }
      }
    }];
    return _inquirer.default.prompt(askForSchemaId);
  }
};