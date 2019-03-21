"use strict";

var _healthStorage = _interopRequireDefault(require("../../../../dist/healthStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Import */

/** Require */
var program = require('commander');
/** Get version */


program.version('0.0.1').description('HsOdm Cli Sdo System');
/** Add schema */

program.command('sdosDown').option('-c, --client <client>', 'Add client data').option('-so, --sdoId <sdoId>', 'SdoId (optional)').option('-s, --schemaId <schemaId>', 'Schema Id').option('-o, --ownerId <ownerId>', 'Owner Id').action(function (options) {
  var client = options.client || {};
  var schemaId = options.schemaId !== undefined ? options.schemaId : false;
  var sdoId = options.sdoId !== undefined ? options.sdoId : false;
  var ownerId = options.ownerId !== undefined ? options.ownerId : false;

  if (!sdoId) {
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
          oId: ownerId,
          r: 1
        }
      });
      hsInstance.findAll().then(function (sdos) {
        return console.log(sdos);
      });
      console.log(hsInstance);
    }).catch(function (error) {
      console.log(error);
    });
  }
}).description('Add sdo/sdos to HsOdm');
program.parse(process.argv);