"use strict";

var _healthStorage = _interopRequireDefault(require("../../../../dist/healthStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Import */

/** Require */
var program = require('commander');
/** Get version */


program.version('0.0.1').description('HsOdm Cli Schema System');
/** Add schema */

program.command('schemaGet').option('-c, --client <client>', 'Add client data').option('-s, --schemaId <schemaId>', 'Add schema ids').action(function (options) {
  var client = options.client || {};
  var schemaId = options.schemaId !== undefined ? options.schemaId : false;

  if (schemaId !== false) {
    _healthStorage.default.getSchema({
      'id': schemaId
    }, client).then(function (response) {
      console.log("\n\n=========> Found schemas");

      if (response) {
        console.log(response);
      } else {
        console.log("\n\nSomething went wrong.");
      }

      console.log("\n\n");
    }).catch(function (error) {
      console.log("\n\n=========> Error get schema");
      console.log(error.message);
      console.log("\n\n");
    });
  }
}).description('Get a schema by id from HsOdm');
program.parse(process.argv);