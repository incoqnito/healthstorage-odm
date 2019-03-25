"use strict";

var _inquirer = _interopRequireDefault(require("inquirer"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _constants = require("./../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** import inquirer */

/** import uuid */

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
      type: 'input',
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
  },

  /** Ask for ownerId input */
  askForOwnerId: function askForOwnerId() {
    var askForOwnerId = [{
      type: 'input',
      name: 'ownerId',
      message: 'Enter owner id:',
      default: (0, _v.default)(),
      validate: function validate(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a valid schema id';
        }
      }
    }];
    return _inquirer.default.prompt(askForOwnerId);
  },

  /** Ask for schema path */
  askForPathToSchema: function askForPathToSchema() {
    var askForSchemaPath = [{
      type: 'input',
      name: 'schemaPath',
      message: 'Enter path to schema:',
      validate: function validate(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a valid schema path';
        }
      }
    }];
    return _inquirer.default.prompt(askForSchemaPath);
  },

  /** Ask for sdoId input */
  askForSdoId: function askForSdoId() {
    var askForSdoId = [{
      type: 'input',
      name: 'sdoId',
      message: 'Enter sdo id:',
      default: (0, _v.default)(),
      validate: function validate(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a valid sdo id';
        }
      }
    }];
    return _inquirer.default.prompt(askForSdoId);
  },

  /** Ask for schema path */
  askForPathToSdos: function askForPathToSdos() {
    var askForSdoPath = [{
      type: 'input',
      name: 'sdosPath',
      message: 'Enter path to import sdos froms:',
      validate: function validate(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a valid sdo path';
        }
      }
    }];
    return _inquirer.default.prompt(askForSdoPath);
  }
};