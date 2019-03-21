"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

var _clear = _interopRequireDefault(require("clear"));

var _figlet = _interopRequireDefault(require("figlet"));

var _inquirer = _interopRequireDefault(require("./lib/inquirer"));

var _funcs = require("./lib/funcs");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/** require babel */
require("@babel/register");

require("@babel/polyfill");
/** interactive cli methos */


/** cli clear */
(0, _clear.default)();
/** add extra row */

console.log("\n");
/** cli header */

console.log(_chalk.default.blue(_figlet.default.textSync('HS-ODM', {
  horizontalLayout: 'full'
})));
/** run function */

var run =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var apiEndpoint, apiEndpointAction, choiceBasedAction;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _inquirer.default.askApiEndpointInteraction();

          case 2:
            apiEndpoint = _context.sent;
            _context.next = 5;
            return _inquirer.default.askApiEndpointActionInteraction(apiEndpoint.endpoint);

          case 5:
            apiEndpointAction = _context.sent;

            /** call inputs based on choice */
            choiceBasedAction = _constants.apiEndpointActionInput[apiEndpoint.endpoint][apiEndpointAction.action];
            /** call next runtime */

            _funcs.apiFuncLib[choiceBasedAction.func]();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function run() {
    return _ref.apply(this, arguments);
  };
}();
/** run programm */


run();