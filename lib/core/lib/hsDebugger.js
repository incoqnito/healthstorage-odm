"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** Export module */
var HsDebugger =
/*#__PURE__*/
function () {
  function HsDebugger() {
    _classCallCheck(this, HsDebugger);
  }

  _createClass(HsDebugger, null, [{
    key: "logConsole",

    /**
     * Log key value pair to console
     * @param {String} key 
     * @param {Mixed} value 
     * @param {Boolean} stringify 
     */
    value: function logConsole(key, value) {
      var stringify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!stringify) {
        console.log(key + ": " + value);
      } else {
        console.log(key + ": " + JSON.stringify(value, null, 2));
      }
    }
    /**
     * Log key value pair to console
     * @param {Mixed} mixed 
     */

  }, {
    key: "logTable",
    value: function logTable(mixed) {
      console.table(mixed);
    }
  }]);

  return HsDebugger;
}();

var _default = HsDebugger;
exports.default = _default;