"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hsModel = _interopRequireDefault(require("./hsModel"));

var _hsBlob = _interopRequireDefault(require("./hsBlob"));

var _hsAdapter = _interopRequireDefault(require("./handler/hsAdapter"));

var _hsSchema = _interopRequireDefault(require("./handler/hsSchema"));

var _hsDebugger = _interopRequireDefault(require("./lib/hsDebugger"));

var _hsConstants = require("./constants/hsConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HsInstance =
/*#__PURE__*/
function () {
  /**
   * Construct
   * @param {Object} opts instance object
   */
  function HsInstance(opts) {
    _classCallCheck(this, HsInstance);

    if (opts === undefined) throw new Error('No instance options provided for HsInstance');
    this.HsSchema = this.buildSchema(opts);
    this.HsAdapter = this.initHsAdapter(opts.client);
    this.debug = opts.client.debug || false;
  }
  /**
   * Get sort asc type
   * @return {String} ASC
   */


  _createClass(HsInstance, [{
    key: "buildSchema",

    /**
     * Create schema from options
     * @param {Object} schemaProps propties for schema builduing
     * @returns {Instance} HsSchema
     */
    value: function buildSchema(schemaProps) {
      return new _hsSchema.default(schemaProps);
    }
    /**
     * Create request instance for client
     * @param {Object} client client object
     * @returns {Instance} HsAdapter
     */

  }, {
    key: "initHsAdapter",
    value: function initHsAdapter(client) {
      return new _hsAdapter.default(client);
    }
    /**
     * Return new instance of model
     * @param {Object} mdoel HsModel
     */

  }, {
    key: "returnModel",
    value: function returnModel(object) {
      var model = new _hsModel.default(object, this.debug);
      if (this.debug) _hsDebugger.default.logConsole("HsInstance.returnModel", model, true);
      model.HsAdapter = this.HsAdapter;
      return model;
    }
    /**
     * Get schemas
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "findAllSchemas",
    value: function findAllSchemas(opts) {
      return _hsAdapter.default.getSchemas(opts.ids.join(','));
    }
    /**
     * Get schema by identifier
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "findSchemaById",
    value: function findSchemaById(opts) {
      return _hsAdapter.default.getSchema(opts.id);
    }
    /**
     * Create schema
     * @returns {Promise}
     */

  }, {
    key: "createSchema",
    value: function createSchema(opts) {
      var HsSchema = new HsSchema(opts);
      return _hsAdapter.default.createSchema(HsSchema.schema);
    }
    /**
     * Delete schema
     * @param {String} id
     * @returns {Promise}
     */

  }, {
    key: "deleteSchema",
    value: function deleteSchema(id) {
      return _hsAdapter.default.deleteSchema(id);
    }
    /**
     * Get all sdos from owner and schema
     * @param {Object} data
     * @returns {Promise}
     */

  }, {
    key: "findAll",
    value: function findAll(options) {
      var _this = this;

      return this.HsAdapter.getSdos(this.HsSchema.props.oId, this.HsSchema.props.id, options).then(function (response) {
        var list = [];
        if (_this.debug) _hsDebugger.default.logConsole("HsInstance.findAll", response, true);

        for (var sdo in response.body) {
          var model = _this.returnModel(response.body[sdo]);

          list.push(model);
        }

        if (_this.debug) _hsDebugger.default.logTable(list);
        return {
          list: list,
          headers: response.headers
        };
      });
    }
    /**
     * Get sdo by where
     * @param {String} id
     * @returns {Promise}
     * @issue filters not working on, currently implemented by find all and custom search
     */

  }, {
    key: "findOne",
    value: function findOne(where) {
      return this.findAll().then(function (sdos) {
        var matchedEntries = [];
        sdos.list.forEach(function (sdo) {
          Object.keys(where).forEach(function (key) {
            if (sdo[key] === where[key]) matchedEntries.push(sdo);
          });
        });
        return matchedEntries[0] !== undefined ? matchedEntries[0] : false;
      });
    }
    /**
     * Get sdo by identifier
     * @param {String} id
     * @returns {Promise}
     */

  }, {
    key: "findById",
    value: function findById(id) {
      var _this2 = this;

      return this.HsAdapter.getSdo({
        id: id
      }).then(function (sdo) {
        if (_this2.debug) _hsDebugger.default.logConsole("HsInstance.findById", sdo, true);

        var model = _this2.returnModel(sdo);

        model.lockValue = lockValue !== null ? JSON.parse(lockValue) : null;
        return model;
      });
    }
    /**
     * Get blob by identifier
     * @param {String} id
     * @returns {Promise}
     */

  }, {
    key: "findBlobById",
    value: function findBlobById(id) {
      var _this3 = this;

      return this.HsAdapter.getSdoBlob({
        id: id
      }).then(function (blob) {
        if (_this3.debug) _hsDebugger.default.logConsole("HsInstance.findBlobById", blob);
        return blob;
      });
    }
    /**
     * Get blob by identifier
     * @param {String} id
     * @returns {Promise}
     */

  }, {
    key: "findBlobFileById",
    value: function findBlobFileById(id, blobId) {
      var _this4 = this;

      return this.HsAdapter.getSdoBlobFile({
        id: id,
        blobId: blobId
      }).then(function (blob) {
        if (_this4.debug) _hsDebugger.default.logConsole("HsInstance.findBlobFileById", sdo, true);
        return blob;
      });
    }
    /**
     * Create a new sdo for given schema
     * @param {Object} data
     * @returns {Promise}
     * @issue API not returns created object, workaround implemented for sdo and sdoBlob
     */

  }, {
    key: "create",
    value: function create(data) {
      var _this5 = this;

      data = Object.assign(data, {
        md: this.HsSchema.generateMd()
      });
      if (this.debug) _hsDebugger.default.logConsole("HsInstance.create", data, true);
      var files = null;
      if (data.files !== undefined && data.files.length > 0) files = data.files;
      delete data.files;
      return this.HsAdapter.validateSdo(data).then(function (validated) {
        if (validated) {
          if (files === null) {
            return _this5.HsAdapter.createSdo(data).then(function (sdo) {
              return _this5.returnModel(sdo);
            });
          } else {
            data['files'] = files;

            var hsBlob = _this5.sdoBlobBridge(data);

            return _this5.HsAdapter.createSdoBlob(hsBlob.blobFormData).then(function (sdo) {
              return _this5.returnModel(_objectSpread({}, data, {
                'blobRefs': hsBlob._dataValues.sdo.blobRefs
              }));
            });
          }
        }
      });
    }
    /**
     * Check if sdo changed since specified item
     * @param {String} id sdo identifier
     * @param {String} r sdo revision
     * @returns {Promise}
     */

  }, {
    key: "changedSince",
    value: function changedSince(id, r) {
      var _this6 = this;

      return this.HsAdapter.sdoHasChanged(id, r).then(function (response) {
        if (_this6.debug) _hsDebugger.default.logConsole("HsInstance.changedSince", response, true);
        return response;
      });
    }
    /**
     * Bulk create sdos
     */

  }, {
    key: "bulkCreate",
    value: function bulkCreate(bulkList) {
      console.log('Bulk create sdos');
    }
    /** Update sdo by its identifier
     * @param {String} id
     * @param {Object} data
     */

  }, {
    key: "updateById",
    value: function updateById(data) {
      var _this7 = this;

      data.md.r += 1;
      if (this.debug) _hsDebugger.default.logConsole("HsInstance.changedSince", data, true);
      var files = null;

      if (data.files !== undefined && data.files.length >= 0) {
        files = data.files;
        delete data.files;
      }

      return this.HsAdapter.validateSdo(data).then(function (validated) {
        if (validated) {
          if (files !== null) {
            return _this7.HsAdapter.editSdo(data).then(function (sdo) {
              return _this7.returnModel(sdo);
            });
          } else {
            data['files'] = files;

            var hsBlob = _this7.sdoBlobBridge(data);

            return _this7.HsAdapter.updateSdoBlob(hsBlob.blobFormData).then(function (sdo) {
              return _this7.returnModel(_objectSpread({}, data, {
                'blobRefs': hsBlob._dataValues.sdo.blobRefs
              }));
            });
          }
        }
      });
    }
    /**
     * Update sdos by given where
     */

  }, {
    key: "update",
    value: function update(where, data) {
      console.log('Update sdo by where');
    }
    /**
     * Bulk update sdos
     * @param {Array} bulkList holds sdos for change
     * @returns {Promise}
     */

  }, {
    key: "bulkUpdate",
    value: function bulkUpdate(bulkList) {
      var _this8 = this;

      var collectedSods = [];

      for (var _sdo in bulkList) {
        bulkList[_sdo].md.r += 1;
        collectedSods.push(bulkList[_sdo]._dataValues);
      }

      return this.HsAdapter.editSdosBulk(collectedSods).then(function (response) {
        if (_this8.debug) _hsDebugger.default.logConsole("HsInstance.bulkUpdate", response, true);
        return response;
      });
    }
    /**
     * Archive sdo by its identifier
     */

  }, {
    key: "archiveById",
    value: function archiveById(id) {
      console.log('Archive sdo by its identifier');
    }
    /**
     * Archive sdos by given where
     */

  }, {
    key: "archive",
    value: function archive(where) {
      console.log('Archive sdos by where');
    }
    /**
     * Lock object by its identifier
     * @param {String} id
     * @returns {Object} lockValue
     */

  }, {
    key: "lockById",
    value: function lockById(id) {
      var _this9 = this;

      return this.HsAdapter.lockItem(id).then(function (lockValue) {
        if (_this9.debug) _hsDebugger.default.logConsole("HsInstance.lockById", lockValue, true);
        return lockValue;
      });
    }
    /**
     * Lock object by its identifier
     * @param {String} id
     * @returns {Object} lockValue
     */

  }, {
    key: "unlockById",
    value: function unlockById(id, lockValueId) {
      var _this10 = this;

      return this.HsAdapter.unlockItem(id, lockValueId).then(function (response) {
        if (_this10.debug) _hsDebugger.default.logConsole("HsInstance.unlockById", response, true);
        return response !== undefined;
      });
    }
    /**
     * Get lock value on sdo by its identifier and lock value
     * @param {String} sdoId
     * @param {String} lockValue
     */

  }, {
    key: "getLockDataById",
    value: function getLockDataById(sdoId, lockValueId) {
      var _this11 = this;

      return this.HsAdapter.getLockData(sdoId, lockValueId).then(function (response) {
        if (_this11.debug) _hsDebugger.default.logConsole("HsInstance.getLockDataById", response, true);
        return response;
      });
    }
    /**
     * Check if sdo is locked
     * @param {String} sdoId
     * @param {String} lockValue
     */

  }, {
    key: "isLockedById",
    value: function isLockedById(sdoId, lockValueId) {
      var _this12 = this;

      return this.HsAdapter.isLockedItem(sdoId, lockValueId).then(function (response) {
        if (_this12.debug) _hsDebugger.default.logConsole("isLockedById", response, true);
        return response;
      });
    }
    /**
     * Check if sdo exists with lock State
     * @param {String} sdoId
     * @param {Boolean} lockState
     */

  }, {
    key: "existsInLockStateById",
    value: function existsInLockStateById(sdoId, lockState) {
      var _this13 = this;

      return this.HsAdapter.existInLockState(sdoId, lockState).then(function (response) {
        if (_this13.debug) _hsDebugger.default.logConsole("HsInstance.existsInLockStateById", response, true);
        return response;
      });
    }
    /**
     * Delete sdo by its identifier
     * @param {String} id
     * @param {Object} data
     */

  }, {
    key: "deleteById",
    value: function deleteById(id) {
      var _this14 = this;

      return this.HsAdapter.deleteSdo(id).then(function (response) {
        if (_this14.debug) _hsDebugger.default.logConsole("HsInstance.deleteById", response, true);
        return response;
      });
    }
    /**
     * Get archive for sdo
     * @param {String} sdoId
     * @param {Integer} pageNo
     * @param {Integer} pageSize
     * @returns {Promise}
     */

  }, {
    key: "getArchiveBySdoId",
    value: function getArchiveBySdoId(sdoId) {
      var _this15 = this;

      var pageNo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      return this.HsAdapter.getSdoArchive(sdoId, pageNo, pageSize).then(function (response) {
        if (_this15.debug) _hsDebugger.default.logConsole("HsInstance.getArchiveBySdoId", response, true);
        return response;
      });
    }
    /**
     * Get archive for sdo
     * @param {String} sdoId
     * @returns {Promise}
     */

  }, {
    key: "getRevisionsArchiveBySdoId",
    value: function getRevisionsArchiveBySdoId(sdoId) {
      var _this16 = this;

      return this.HsAdapter.getSdoRevisionsArchive(sdoId).then(function (response) {
        if (_this16.debug) _hsDebugger.default.logConsole("HsInstance.getRevisionsArchiveBySdoId", response, true);
        return response;
      });
    }
    /**
     * Create a new sdo for given schema
     * @param {Object} data
     * @returns {Promise}
     */

  }, {
    key: "createBlob",
    value: function createBlob(sdoBlob) {
      var _this17 = this;

      var sdo = JSON.parse(sdoBlob.getAll('sdo'));
      sdo['md'] = this.HsSchema.generateMd();
      return this.HsAdapter.validateSdo(sdo).then(function (validated) {
        if (validated) {
          sdoBlob.set('sdo', JSON.stringify(sdo));
          return _this17.HsAdapter.createSdoBlob(sdoBlob).then(function (response) {
            if (_this17.debug) _hsDebugger.default.logConsole("createBlob", response, true);
            return response;
          });
        }
      });
    }
    /**
     * Find meta fields
     * @param {String} key meta field key
     * @returns {String}
     */

  }, {
    key: "findMetaField",
    value: function findMetaField(key) {
      var value = '';

      switch (key) {
        case 'id':
          value = this.MD_ID;
          break;

        case 'r':
          value = this.MD_REVISION;
          break;

        case 'tsp':
          value = this.MD_DATE;
          break;
      }

      return value;
    }
    /**
     * Data Bridge for blob creation
     * @param {Object} data 
     */

  }, {
    key: "sdoBlobBridge",
    value: function sdoBlobBridge(data) {
      return new _hsBlob.default(data);
    }
  }], [{
    key: "ASC",
    get: function get() {
      return _hsConstants.ASC;
    }
    /**
     * Get sort desc type
     * @return {String} DESC
     */

  }, {
    key: "DESC",
    get: function get() {
      return _hsConstants.DESC;
    }
    /**
     * Get meta id type
     * @return {String} MD_ID
     */

  }, {
    key: "MD_ID",
    get: function get() {
      return _hsConstants.MD_ID;
    }
    /**
     * Get meta revision type
     * @return {String} MD_REVISION
     */

  }, {
    key: "MD_REVISION",
    get: function get() {
      return _hsConstants.MD_REVISION;
    }
    /**
     * Get meta date type
     * @return {String} MD_DATE
     */

  }, {
    key: "MD_DATE",
    get: function get() {
      return _hsConstants.MD_DATE;
    }
  }]);

  return HsInstance;
}();

var _default = HsInstance;
exports.default = _default;