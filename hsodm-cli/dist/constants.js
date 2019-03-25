"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiEndpointActionInput = exports.apiEndpointActionChoices = exports.apiEndpointChoices = exports.localClient = void 0;

/** local client */
var localClient = {
  serverUrl: "http://localhost:8080",
  adapter: "hsStorageAdapter",
  debug: false
  /** api endpoints */

};
exports.localClient = localClient;
var apiEndpointChoices = [{
  'name': 'Schemas',
  'value': 'schema'
}, {
  'name': 'Sdos',
  'value': 'sdo'
}];
/** api endpoints actions */

exports.apiEndpointChoices = apiEndpointChoices;
var apiEndpointActionChoices = {
  'schema': [{
    'name': 'Get Schema',
    'value': 'single'
  }, {
    'name': 'Add Schema',
    'value': 'add'
  }, {
    'name': 'Delete Schema',
    'value': 'delete'
  }],
  'sdo': [{
    'name': 'Get Sdo',
    'value': 'single'
  }, {
    'name': 'Get All Sdos',
    'value': 'all'
  }, {
    'name': 'Add Sdos',
    'value': 'addBulk'
  }, {
    'name': 'Delete Sdos',
    'value': 'deleteBulk'
  }]
  /** api endpoint action input */

};
exports.apiEndpointActionChoices = apiEndpointActionChoices;
var apiEndpointActionInput = {
  'schema': {
    'single': {
      'func': 'getSchema'
    },
    'add': {
      'func': 'addSchema'
    },
    'delete': {
      'func': 'deleteSchema'
    }
  },
  'sdo': {
    'single': {
      'func': 'getSdo'
    },
    'all': {
      'func': 'getSdos'
    },
    'addBulk': {
      'func': 'addSdos'
    }
  }
};
exports.apiEndpointActionInput = apiEndpointActionInput;