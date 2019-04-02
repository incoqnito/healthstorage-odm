"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** Export module */
var HsHelper =
/*#__PURE__*/
function () {
  function HsHelper() {
    _classCallCheck(this, HsHelper);
  }

  _createClass(HsHelper, null, [{
    key: "findValueByPath",

    /**
     * Find object value by given path
     * @param {Object} obj
     * @param {String} path
     * @returns {Object}
     */
    value: function findValueByPath(obj, path) {
      var object = obj;
      var splitPath = path.split('.');

      for (var i = 0, len = splitPath.length; i < len; i++) {
        object = object[splitPath[i]];
      }

      ;
      return object;
    }
  }]);

  return HsHelper;
}();

var _default = HsHelper;
exports.default = _default;