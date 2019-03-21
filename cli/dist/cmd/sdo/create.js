"use strict";

var _healthStorage = _interopRequireDefault(require("../../../../dist/healthStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Import */

/** Require */
var program = require('commander');
/** Get version */


program.version('0.0.1').description('HsOdm Cli Sdo System');
/** Add schema */

program.command('sdosUp').option('-c, --client <client>', 'Add client data').option('-a, --sdoPath <sdoPath>', 'Add path to sdo').option('-s, --schemaId <schemaId>', 'Add path to schema').option('-o, --ownerId <owenerId>', 'Add path to schema').action(function (options) {
  var client = options.client || {};
  var schemaId = options.schemaId !== undefined ? options.schemaId : false;
  var sdos = options.sdoPath !== undefined ? require(options.sdoPath) : false;

  _healthStorage.default.getSchema({
    'id': schemaId
  }, client).then(function (schema) {
    var hsClient = new _healthStorage.default(client);
    var hsInstance = hsClient.define({
      title: schema.title,
      properties: schema.properties,
      options: {
        required: schema.required,
        id: schemaId,
        oId: options.ownerId,
        r: 1
      }
    });
    sdos.map(function (sdo) {
      console.log(sdo);
    }); // let promises = sdos.map(sdo => {
    //   return hsInstance.create(sdo)
    // })
    // Promise.all(promises)
    //     .then(sdoModel => {
    //       console.log(sdoModel)
    //       console.log("\n=========> Generated sdo id")
    //       console.log(sdoModel.md.id)
    //       console.log("\n")
    //     })
    //     .catch(error => {
    //       console.log("\n=========> Error sdos up")
    //       console.log(error.message)
    //       console.log("\n")
    //     })
  }).catch(function (error) {
    console.log("\n=========> Error schema found");
    console.log(error.message);
    console.log("\n");
  });
}).description('Add sdo/sdos to HsOdm');
program.parse(process.argv);