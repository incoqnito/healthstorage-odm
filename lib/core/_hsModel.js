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
   * Get assign to class properties
   * @returns {Array}
   */


  _createClass(HsModel, [{
    key: "initProperties",

    /**
     * Init properties of instance
     * @param {Object} properties instance properties
     */
    value: function initProperties(properties) {
      var _this = this;

      for (var field in properties) {
        if (this.ASSIGN_TO_CLASS.indexOf(field) <= -1) {
          this._dataValues[field] = properties[field];
        } else {
          this[field] = properties[field];
        }
      }

      var _loop = function _loop(key) {
        Object.defineProperty(_this, key, {
          get: function get() {
            return this._dataValues[key];
          },
          set: function set(value) {
            if (this._dataValues[key] !== value) {
              this.setRevision();
              this._dataValues[key] = value;
            }
          }
        });
      };

      for (var key in this._dataValues) {
        _loop(key);
      }
    }
    /**
     * Return extended model
     * @param {Object} item
     * @returns {Mixed}
     */

  }, {
    key: "returnModel",
    value: function returnModel(item) {
      if (item.files !== undefined) delete item.files;
      var model = new HsModel(item, this._unstored.debug);
      if (this._unstored.debug) _hsDebugger.default.logConsole("HsModel.returnModel", model, true);
      model.HsAdapter = this.HsAdapter;
      return model;
    }
    /**
     * Save data of instance manually
     * @param {Object} client client object
     * @returns {Instance} HS_ADAPTER
     */

  }, {
    key: "save",
    value: function save() {}
    /**
     * Check if sdo changed since
     * @returns {Promise}
     */

  }, {
    key: "changedSince",
    value: function changedSince() {
      var _this2 = this;

      return this.HsAdapter.sdoHasChanged(this._dataValues.md.id, this._dataValues.md.r).then(function (changedSince) {
        if (_this2._unstored.debug) _hsDebugger.default.logConsole("HsModel.changedSince", changedSince, true);
        return changedSince;
      });
    }
    /**
     * Update instance data
     * @returns {Instance} HsModel
     */

  }, {
    key: "update",
    value: function update() {
      var _this3 = this;

      this.md.r += 1;
      if (this._unstored.debug) _hsDebugger.default.logConsole("HsModel.update", this, true);

      if (this._dataValues.blobRefs === undefined) {
        return this.HsAdapter.editSdo(this._dataValues).then(function (sdo) {
          return _this3.returnModel(sdo);
        });
      } else {
        return this.HsAdapter.editSdoBlob(this._dataValues).then(function (sdo) {
          return _this3.returnModel(sdo);
        });
      }
    }
    /**
     * Lock sdo object
     * @returns {Object}
     */

  }, {
    key: "lock",
    value: function lock() {
      var _this4 = this;

      return this.HsAdapter.lockItem(this._dataValues.md.id).then(function (lockValue) {
        if (_this4._unstored.debug) _hsDebugger.default.logConsole("HsModel.lock", lockValue, true);
        _this4.lockValue = lockValue;
        return _this4.returnModel(_this4._dataValues);
      });
    }
    /**
     * Unlock sdo object
     * @returns {Object}
     */

  }, {
    key: "unlock",
    value: function unlock() {
      var _this5 = this;

      return this.HsAdapter.unlockItem(this._dataValues.md.id, this.lockValue.value).then(function (response) {
        if (_this5._unstored.debug) _hsDebugger.default.logConsole("HsModel.unlock", response, true);
        if (response) _this5.lockValue = null;
        return _this5.returnModel(_this5._dataValues);
      });
    }
    /**
     * Get locked
     * @returns {Object}
     */

  }, {
    key: "getLock",
    value: function getLock() {
      var _this6 = this;

      return this.HsAdapter.getLockData(this.md.id, this.lockValue.value).then(function (response) {
        if (_this6._unstored.debug) _hsDebugger.default.logConsole("HsModel.getLock", response, true);
        return response;
      });
    }
    /**
     * Check is locked sdo object
     * @returns {Object}
     */

  }, {
    key: "isLocked",
    value: function isLocked() {
      var _this7 = this;

      if (this.lockValue !== undefined && this.lockValue !== null) {
        return this.HsAdapter.isLockedItem(this.md.id, this.lockValue.value).then(function (response) {
          if (_this7._unstored.debug) _hsDebugger.default.logConsole("HsModel.isLocked", response, true);
          return response;
        });
      } else {
        return false;
      }
    }
    /**
     * Check sdo exists with lock state
     * @returns {Object}
     */

  }, {
    key: "existInLockState",
    value: function existInLockState() {
      var _this8 = this;

      var lockState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return this.HsAdapter.existInLockState(this.md.id, lockState).then(function (response) {
        if (_this8._unstored.debug) _hsDebugger.default.logConsole("HsModel.existInLockState", response, true);
        return response;
      });
    }
    /**
     * Destroy instance
     * @returns {Object} object
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this9 = this;

      return this.HsAdapter.deleteSdo(this.md.id).then(function (deletedSdo) {
        if (_this9._unstored.debug) _hsDebugger.default.logConsole("HsModel.destroy", deletedSdo, true);
        return deletedSdo;
      });
    }
    /**
     * Create local revision for object
     */

  }, {
    key: "setRevision",
    value: function setRevision() {
      if (this.revision === undefined) this.revision = {};
      var timestamp = new Date().getTime();
      var copyFromThis = Object.assign({}, this._dataValues);
      this.revision[timestamp] = copyFromThis;
    }
    /**
     * Get archive for sdo
     */

  }, {
    key: "getArchive",
    value: function getArchive() {
      var pageNo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      return this.HsAdapter.getSdoArchive(this.md.id, pageNo, pageSize);
    }
    /**
     * Get archived revision numbers for sdo
     */

  }, {
    key: "getArchiveRevisionNumbers",
    value: function getArchiveRevisionNumbers() {
      return this.HsAdapter.getSdoRevisionsArchive(this.md.id);
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
  }, {
    key: "ASSIGN_TO_CLASS",
    get: function get() {
      return _hsConstants.ASSIGN_TO_CLASS;
    }
  }]);

  return HsModel;
}();

var _default = HsModel;
exports.default = _default;