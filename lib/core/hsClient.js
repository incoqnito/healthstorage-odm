"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hsModel = _interopRequireDefault(require("./hsModel"));

var _hsSchema = _interopRequireDefault(require("./handler/hsSchema"));

var _hsAdapter = _interopRequireDefault(require("./handler/hsAdapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** Export module */
var HsClient =
/*#__PURE__*/
function () {
  /**
   * Constructor
   * @param {Object} client client object
   */
  function HsClient(client) {
    _classCallCheck(this, HsClient);

    this.client = client;
  }
  /**
   * Static define
   * @param {Object} opts define object
   * @returns {Instance} hsInstance
   */


  _createClass(HsClient, [{
    key: "define",
    value: function define(opts) {
      _hsModel.default.instance(new _hsSchema.default(opts), new _hsAdapter.default(this.client));

      return _hsModel.default;
    }
  }]);

  return HsClient;
}();

var _default = HsClient;
exports.default = _default;