"use strict";

var _healthStorage = _interopRequireDefault(require("../../../../dist/healthStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Import */

/** Require */
var program = require('commander');
/** Get version */


program.version('0.0.1').description('HsOdm Cli Schema System');
/** Add schema */

program.command('schemaDown').option('-c, --client <client>', 'Add client data').option('-s, --schemaId <schemaId>', 'Add add schema id').action(function (options) {
  var client = options.client || {};
  var schemaId = options.schemaId !== undefined ? options.schemaId : false;

  if (schemaId !== false) {
    _healthStorage.default.deleteSchema(schemaId, client).then(function (response) {
      console.log("\n\n=========> Deleted schema id");

      if (response) {
        console.log(schemaId);
      } else {
        console.log("\n\nSomething went wrong.");
      }

      console.log("\n\n");
    }).catch(function (error) {
      console.log("\n\n=========> Error schema down");
      console.log(error.message);
      console.log("\n\n");
    });
  }
}).description('Remove a schema from HsOdm');
program.parse(process.argv);