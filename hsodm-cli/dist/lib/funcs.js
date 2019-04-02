"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiFuncLib = void 0;

var _healthStorage = _interopRequireDefault(require("./../../../dist/healthStorage"));

var _inquirer = _interopRequireDefault(require("./inquirer"));

var _chalk = _interopRequireDefault(require("chalk"));

var _constants = require("./../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/** require babel */
require("@babel/register");

require("@babel/polyfill");
/** import inquirer */


/** cli func lib */
var apiFuncLib = {
  /** get schema by id */
  getSchema: function () {
    var _getSchema = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var schemaId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _inquirer.default.askForSchemaId();

            case 2:
              schemaId = _context.sent;

              _healthStorage.default.getSchema({
                'id': schemaId.schemaId
              }, _constants.localClient).then(function (response) {
                console.log(_chalk.default.greenBright("\n=========> Found schema\n"));
                console.log(response);
                console.log("\n");
              }).catch(function (error) {
                console.log(_chalk.default.redBright("\nError: " + error.message + "\n"));
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getSchema() {
      return _getSchema.apply(this, arguments);
    }

    return getSchema;
  }(),

  /** add schema */
  addSchema: function () {
    var _addSchema = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var schemaPath, ownerId, schema, opts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _inquirer.default.askForPathToSchema();

            case 2:
              schemaPath = _context2.sent;
              _context2.next = 5;
              return _inquirer.default.askForOwnerId();

            case 5:
              ownerId = _context2.sent;
              schema = require(schemaPath.schemaPath);
              opts = {
                'title': schema.schema.title,
                'options': {
                  'required': schema.schema.required,
                  'id': schema.schema.$id.replace('urn:btssid:', "").split("/").shift() || uuid()
                },
                'properties': schema.schema.properties
              };

              _healthStorage.default.createSchema(opts, _constants.localClient).then(function (schema) {
                console.log(_chalk.default.greenBright("\n=========> Created schema with id\n"));
                console.log(schema.$id.replace('urn:btssid:', "").split("/").shift());
                console.log("\n");
              }).catch(function (error) {
                console.log(_chalk.default.redBright("\nError: " + error.message + "\n"));
              });

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function addSchema() {
      return _addSchema.apply(this, arguments);
    }

    return addSchema;
  }(),

  /** add schema */
  deleteSchema: function () {
    var _deleteSchema = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var schemaId;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _inquirer.default.askForSchemaId();

            case 2:
              schemaId = _context3.sent;

              _healthStorage.default.deleteSchema(schemaId, _constants.localClient).then(function (response) {
                if (response) {
                  console.log(_chalk.default.greenBright("\n=========> Deleted schema with id\n"));
                  console.log(schemaId.schemaId);
                  console.log("\n");
                } else {
                  console.log(_chalk.default.redBright("\nError: Could not delete schema\n"));
                }
              }).catch(function (error) {
                return console.log(_chalk.default.redBright("\nError: " + error.message + "\n"));
              });

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function deleteSchema() {
      return _deleteSchema.apply(this, arguments);
    }

    return deleteSchema;
  }(),

  /** get sdos */
  getSdos: function () {
    var _getSdos = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var schemaId, ownerId;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _inquirer.default.askForSchemaId();

            case 2:
              schemaId = _context4.sent;
              _context4.next = 5;
              return _inquirer.default.askForOwnerId();

            case 5:
              ownerId = _context4.sent;

              _healthStorage.default.getSchema({
                'id': schemaId.schemaId
              }, _constants.localClient).then(function (schema) {
                var hsClient = new _healthStorage.default(_constants.localClient);
                var hsInstance = hsClient.define({
                  title: schema.title,
                  properties: schema.properties,
                  options: {
                    required: schema.required,
                    id: schemaId.schemaId,
                    oId: ownerId.ownerId,
                    r: 1
                  }
                });
                hsInstance.findAll().then(function (sdos) {
                  console.log(_chalk.default.greenBright("\n=========> Found sdo models\n"));
                  sdos.list.map(function (sdo) {
                    return console.log(sdo);
                  });
                  console.log("\n");
                }).catch(function (error) {
                  return console.log(_chalk.default.redBright("\nError sdo models: " + error.message + "\n"));
                });
              }).catch(function (error) {
                return console.log(_chalk.default.redBright("\nError hsodm: " + error.message + "\n"));
              });

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function getSdos() {
      return _getSdos.apply(this, arguments);
    }

    return getSdos;
  }(),

  /** get sdo by id */
  getSdo: function () {
    var _getSdo = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var schemaId, ownerId, sdoId;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _inquirer.default.askForSchemaId();

            case 2:
              schemaId = _context5.sent;
              _context5.next = 5;
              return _inquirer.default.askForOwnerId();

            case 5:
              ownerId = _context5.sent;
              _context5.next = 8;
              return _inquirer.default.askForSdoId();

            case 8:
              sdoId = _context5.sent;

              _healthStorage.default.getSchema({
                'id': schemaId.schemaId
              }, _constants.localClient).then(function (schema) {
                var hsClient = new _healthStorage.default(_constants.localClient);
                var hsInstance = hsClient.define({
                  title: schema.title,
                  properties: schema.properties,
                  options: {
                    required: schema.required,
                    id: schemaId.schemaId,
                    oId: ownerId.ownerId,
                    r: 1
                  }
                });
                hsInstance.findById(sdoId.sdoId).then(function (sdoModel) {
                  console.log(_chalk.default.greenBright("\n=========> Found sdo model\n"));
                  console.log(sdoModel);
                  console.log("\n");
                }).catch(function (error) {
                  return console.log(_chalk.default.redBright("\nError: " + error.message + "\n"));
                });
              }).catch(function (error) {
                return console.log(_chalk.default.redBright("\nError: " + error.message + "\n"));
              });

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function getSdo() {
      return _getSdo.apply(this, arguments);
    }

    return getSdo;
  }(),

  /** get sdo by id */
  addSdos: function () {
    var _addSdos = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var schemaId, ownerId, sdosPath;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _inquirer.default.askForSchemaId();

            case 2:
              schemaId = _context6.sent;
              _context6.next = 5;
              return _inquirer.default.askForOwnerId();

            case 5:
              ownerId = _context6.sent;
              _context6.next = 8;
              return _inquirer.default.askForPathToSdos();

            case 8:
              sdosPath = _context6.sent;

              _healthStorage.default.getSchema({
                'id': schemaId.schemaId
              }, _constants.localClient).then(function (schema) {
                var hsClient = new _healthStorage.default(_constants.localClient);
                var hsInstance = hsClient.define({
                  title: schema.title,
                  properties: schema.properties,
                  options: {
                    required: schema.required,
                    id: schemaId.schemaId,
                    oId: ownerId.ownerId,
                    r: 1
                  }
                });

                var sodsToImport = require(sdosPath.sdosPath);

                sodsToImport.map(function (sdo) {
                  hsInstance.create(sdo).then(function (sdoModel) {
                    console.log(_chalk.default.greenBright("\n=========> Created sdo model\n"));
                    console.log(sdoModel._dataValues);
                    console.log("\n");
                  }).catch(function (error) {
                    return console.log(_chalk.default.redBright("\nError sdo create: " + error.message + "\n"));
                  });
                });
              }).catch(function (error) {
                return console.log(_chalk.default.redBright("\nError schema find: " + error.message + "\n"));
              });

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function addSdos() {
      return _addSdos.apply(this, arguments);
    }

    return addSdos;
  }(),

  /** get sdo by id */
  deleteSdos: function () {
    var _deleteSdos = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var schemaId, ownerId;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _inquirer.default.askForSchemaId();

            case 2:
              schemaId = _context7.sent;
              _context7.next = 5;
              return _inquirer.default.askForOwnerId();

            case 5:
              ownerId = _context7.sent;

              _healthStorage.default.getSchema({
                'id': schemaId.schemaId
              }, _constants.localClient).then(function (schema) {
                var hsClient = new _healthStorage.default(_constants.localClient);
                var hsInstance = hsClient.define({
                  title: schema.title,
                  properties: schema.properties,
                  options: {
                    required: schema.required,
                    id: schemaId.schemaId,
                    oId: ownerId.ownerId,
                    r: 1
                  }
                });
                hsInstance.findAll().then(function (sdos) {
                  console.log(_chalk.default.greenBright("\n=========> Found sdo models to delete\n"));
                  sdos.list.map(function (sdo) {
                    sdo.destroy().then(function (deletedSdo) {
                      console.log(_chalk.default.greenBright("\n=========> Deleted sdo\n"));
                      console.log(deletedSdo);
                      console.log("\n");
                    }).catch(function (error) {
                      return console.log(_chalk.default.redBright("\nError sdo delete: " + error.message + "\n"));
                    });
                  });
                  console.log("\n");
                }).catch(function (error) {
                  return console.log(_chalk.default.redBright("\nError sdo found models: " + error.message + "\n"));
                });
              }).catch(function (error) {
                return console.log(_chalk.default.redBright("\nError schema find: " + error.message + "\n"));
              });

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function deleteSdos() {
      return _deleteSdos.apply(this, arguments);
    }

    return deleteSdos;
  }()
};
exports.apiFuncLib = apiFuncLib;