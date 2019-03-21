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
  }()
};
exports.apiFuncLib = apiFuncLib;