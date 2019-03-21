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

  /** get schema by id */
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
                  'id': schema.schema.$id.replace('urn:btssid:', "").split("/").shift() || uuid(),
                  'oId': ownerId
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
  }()
};
exports.apiFuncLib = apiFuncLib;