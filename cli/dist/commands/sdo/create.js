"use strict";

var _healthStorage = _interopRequireDefault(require("../../../../dist/healthStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Import */

/** Require */
var program = require('commander');
/** Get version */


program.version('0.0.1').description('HsOdm Cli Sdo System');
/** Add schema */

program.command('sdosUp').option('-c, --client <client>', 'Add client data').option('-q, --sdoPath <sdoPath>', 'Add path to sdo').option('-p, --schemaPath <schemaPath>', 'Add path to schema').option('-o, --ownerId <owenerId>', 'Add path to schema').action(function (options) {
  var client = options.client || {};
  var schema = options.schemaPath !== undefined ? require(options.schemaPath) : false;
  var sdos = options.sdoPath !== undefined ? require(options.sdoPath) : false;
  var sId = schema.schema.$id.replace('urn:btssid:', "").split("/").shift();
  var hsClient = new _healthStorage.default(client);
  var hsInstance = hsClient.define({
    title: schema.schema.title,
    properties: schema.schema.properties,
    options: {
      required: schema.schema.required,
      id: sId,
      oId: options.ownerId,
      r: 1
    }
  });
  sdos.map(function (sdo) {
    var promise = hsInstance.create(sdo);
    Promise.resolve(promise).then(function (sdoModel) {
      console.log("\n=========> Generated sdo id");
      console.log(sdoModel.md.id);
      console.log("\n");
    }).catch(function (error) {
      console.log("\n=========> Error schema up");
      console.log(error.message);
      console.log("\n");
    });
  });
}).description('Add sdo/sdos to HsOdm');
program.parse(process.argv);