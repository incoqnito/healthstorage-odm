"use strict";

var _healthStorage = _interopRequireDefault(require("../../../../dist/healthStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Import */

/** Require */
var program = require('commander');
/** Get version */


program.version('0.0.1').description('HsOdm Cli Schema System');
/** Add schema */

program.command('schemasGet').option('-c, --client <client>', 'Add client data').option('-s, --schemaIds <schemaIds>', 'Add schema ids comma seperated').action(function (options) {
  var client = options.client || {};
  var schemaIds = options.schemaIds !== undefined ? options.schemaIds : false;

  if (schemaIds !== false) {
    var promises = _healthStorage.default.getSchemas({
      'ids': schemaIds.split(",")
    }, client);

    promises.map(function (promise) {
      Promise.resolve(promise).then(function (schema) {
        var sTitle = schema.title || "No id matched for schema";
        console.log("\n=========> Found schema: " + sTitle + "\n");

        if (schema) {
          console.log(schema);
        } else {
          console.log("\n\nSomething went wrong.");
        }

        console.log("\n\n");
      }).catch(function (error) {
        console.log("\n\n=========> Error get schema");
        console.log(error.message);
        console.log("\n\n");
      });
    });
  }
}).description('Get a schema by id from HsOdm');
program.parse(process.argv);