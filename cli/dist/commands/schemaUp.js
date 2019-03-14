"use strict";

var _healthStorage = _interopRequireDefault(require("../../../dist/healthStorage"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Import */

/** Require */
var program = require('commander');
/** Get version */


program.version('0.0.1').description('HsOdm Cli Schema System');
/** Add schema */

program.command('schemaUp').option('-c, --client <client>', 'Add client data').option('-p, --path <path>', 'Add path to schema').option('-o, --ownerId <path>', 'Add owner id to schema').action(function (options) {
  var client = options.client || {};
  var schema = options.path !== undefined ? require(options.path.replace("./../", "./../../")) : false;
  var opts = {
    'title': schema.schema.title,
    'options': {
      'required': schema.schema.required,
      'id': schema.schema.$id.replace('urn:btssid:', "").split("/").shift() || (0, _uuid.default)(),
      'oId': options.ownerId
    },
    'properties': schema.schema.properties
  };

  _healthStorage.default.createSchema(opts, client).then(function (schema) {
    console.log("\n\n=========> Generated schema id");
    console.log(schema.$id.replace('urn:btssid:', "").split("/").shift());
    console.log("\n\n");
  }).catch(function (error) {
    console.log("\n\n=========> Error schema up");
    console.log(error.message);
    console.log("\n\n");
  });
}).description('Add a schema to HsOdm');
program.parse(process.argv);