"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hsConstants = require("./constants/hsConstants");

var _hsDebugger = _interopRequireDefault(require("./lib/hsDebugger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** Export module */
var HsModel =
/*#__PURE__*/
function () {
  /**
   * Construct
   * @param {Object} opts instance object
   */
  function HsModel(opts, debug) {
    _classCallCheck(this, HsModel);

    if (opts === undefined) throw new Error('No options provided for HsModel');
    this._dataValues = {};
    this._unstored = {};
    this._unstored.debug = debug || false;
    this.initProperties(opts);
  }
  /**
   * Create local revision for object
   */


  _createClass(HsModel, [{
    key: "setRevision",
    value: function setRevision() {
      if (this.revision === undefined) this.revision = {};
      var timestamp = new Date().getTime();
      var copyFromThis = Object.assign({}, this._dataValues);
      this.revision[timestamp] = copyFromThis;
    }
    /**
     * Get blob file
     * @info currently only one file supported
     */

  }, {
    key: "getBlobFile",
    value: function getBlobFile() {
      return this.HsAdapter.getSdoBlobFile({
        id: this.md.id,
        blobId: this.blobRefs[0]
      });
    }
  }]);

  return HsModel;
}();

var _default = HsModel;
exports.default = _default;