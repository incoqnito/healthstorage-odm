"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hsBlob = _interopRequireDefault(require("./hsBlob"));

var _hsConstants = require("./constants/hsConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HsModel =
/*#__PURE__*/
function () {
  /**
   * Constructor
   * @param {Object} schema 
   * @param {Object} opts 
   */
  function HsModel(opts) {
    _classCallCheck(this, HsModel);

    this._props = {};
    this.initProperties(opts);
  }
  /**
   * Get sort asc type
   * @return {String}
   */


  _createClass(HsModel, [{
    key: "initProperties",

    /**
     * Init props of instance
     * @param {Object} props
     */
    value: function initProperties(props) {
      if (props.md !== undefined && props.md.id !== undefined) this['_id'] = props.md.id;
      if (props.md !== undefined && props.md.r !== undefined) this['__v'] = props.md.r;

      for (var key in props) {
        this[key] = props[key];
      }
    }
    /**
     * Save created model with its properties
     * @return {Promise}
     */

  }, {
    key: "save",
    value: function save() {
      return HsModel.create(this);
    }
    /**
     * Update model with given data
     * @return {Promise}
     */

  }, {
    key: "update",
    value: function update() {
      return HsModel.updateById(this);
    }
    /**
     * Delete model by identifier
     * @return {Promise}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      return HsModel.deleteById(this._id);
    }
    /**
     * Get attached File from model
     * @return {Promise}
     */

  }, {
    key: "getFile",
    value: function getFile() {
      return HsModel.findBlobFileById(this._id, this.blobRefs[0]);
    }
    /**
     * Archive model
     * @return {Promise}
     */

  }, {
    key: "archive",
    value: function archive() {
      return HsModel.archiveById(this._id);
    }
    /**
     * Get archived revison numbers for model
     * @return {Promise}
     */

  }, {
    key: "getArchivedRevisions",
    value: function getArchivedRevisions() {
      return HsModel.getRevisionsArchiveBySdoId(this._id);
    }
    /**
     * Get archived sdos mof model
     * @param {Integer} pageNo
     * @param {Integer} pageSize
     * @return {Promise}
     */

  }, {
    key: "getArchive",
    value: function getArchive() {
      var pageNo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
      return HsModel.getArchiveBySdoId(this._id, pageNo, pageSize);
    }
    /**
     * Check model last change since
     * @return {Promise}
     */

  }, {
    key: "changedSince",
    value: function changedSince() {
      return HsModel.changedSinceByIdAndRevision(this._id, this.__v);
    }
    /**
     * Lock model
     * @return {Promise}
     */

  }, {
    key: "lock",
    value: function lock() {
      return HsModel.lockById(this._id);
    }
    /**
     * Unlock model
     * @return {Promise}
     */

  }, {
    key: "unlock",
    value: function unlock() {
      return HsModel.unlockById(this._id);
    }
    /**
     * Get lock data for model
     * @return {Promise}
     */

  }, {
    key: "getLockData",
    value: function getLockData() {
      return HsModel.getLockDataById(this._id, this.lockValue.value);
    }
    /**
     * Check if model is locked
     * @return {Promise}
     */

  }, {
    key: "isLocked",
    value: function isLocked() {
      return HsModel.isLockedById(this._id);
    }
    /**
     * Check if model exists in specific lock state
     * @param {String} lockState
     * @return {Promise}
     */

  }, {
    key: "isInLockState",
    value: function isInLockState(lockState) {
      return HsModel.existsInLockStateById(this._id, lockState);
    }
  }], [{
    key: "instance",

    /**
     * Create new instance of model with given schema
     * @param {Object} schema 
     */
    value: function instance(schema, adapter, identifier) {
      this.HsSchema = schema;
      this.HsAdapter = adapter;
      this.HsIdentifier = identifier;
    }
    /**
     * Get all sdos from owner and schema
     * @param {Object} data
     * @returns {Promise}
     */

  }, {
    key: "find",
    value: function find(options) {
      return HsModel.HsAdapter.getSdos(HsModel.HsSchema.props.oId, HsModel.HsSchema.props.id, options).then(function (response) {
        return response.body.map(function (sdo) {
          return new HsModel(sdo);
        });
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
      return HsModel.HsAdapter.getSdo({
        id: id
      }).then(function (sdo) {
        var model = new HsModel(sdo);
        model.lockValue = lockValue !== null ? JSON.parse(lockValue) : null;
        return model;
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
      var filterRequest = HsModel.FILTER_REQUEST;
      filterRequest.filter.filters = Object.keys(where).map(function (whereKey) {
        var filterObject = Object.assign({}, HsModel.FILTER_REQUEST_FILTER, {
          'field': whereKey,
          'opeator': HsModel.EQUAL,
          'value': where[whereKey]
        });
        console.log(filterObject);
        return filterObject;
      });
      if (where === undefined) return Promise.resolve({});
      return this.find().then(function (sdos) {
        var matchedEntries = [];
        sdos.forEach(function (model) {
          Object.keys(where).forEach(function (key) {
            if (model[key] === where[key]) matchedEntries.push(model);
          });
        });
        return matchedEntries[0] !== undefined ? matchedEntries[0] : false;
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
      return HsModel.HsAdapter.getSdoBlob({
        id: id
      }).then(function (blob) {
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
      return HsModel.HsAdapter.getSdoBlobFile({
        id: id,
        blobId: blobId
      }).then(function (blob) {
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
    value: function create(props) {
      var propsForSdo = Object.assign(props, {
        md: HsModel.HsSchema.generateMd()
      });
      var files = null;
      if (propsForSdo.files !== undefined && propsForSdo.files.length > 0) files = propsForSdo.files;
      delete propsForSdo.files;
      return HsModel.HsAdapter.validateSdo(propsForSdo).then(function (validated) {
        if (validated) {
          if (files === null) {
            return HsModel.HsAdapter.createSdo(propsForSdo).then(function (sdo) {
              return new HsModel(sdo);
            });
          } else {
            propsForSdo['files'] = files;
            var hsBlob = HsModel.sdoBlobBridge(propsForSdo);
            return HsModel.HsAdapter.createSdoBlob(hsBlob.blobFormData).then(function (sdo) {
              return HsModel(_objectSpread({}, propsForSdo, {
                'blobRefs': hsBlob.sdo.blobRefs
              }));
            });
          }
        }
      });
    }
    /**
     * Check if sdo changed since specified item
     * @param {String} sdoId
     * @param {String} r
     * @returns {Promise}
     */

  }, {
    key: "changedSinceByIdAndRevision",
    value: function changedSinceByIdAndRevision(sdoId, r) {
      return HsModel.HsAdapter.sdoHasChanged(sdoId, r).then(function (response) {
        return response;
      });
    }
    /** 
     * Update sdo by its identifier
     * @param {Object} data
     * @returns {HsModel} 
     */

  }, {
    key: "updateById",
    value: function updateById(data) {
      data.md.r += 1;
      return HsModel.HsAdapter.validateSdo(data).then(function (validated) {
        if (validated) {
          return HsModel.HsAdapter.editSdo(data).then(function (sdo) {
            return new HsModel(sdo);
          });
        }
      });
    }
    /**
     * Update sdos by given where
     * @param {Object} where 
     * @param {Object} data 
     */

  }, {
    key: "updateWhere",
    value: function updateWhere(where, data) {
      console.log('Update sdo by where');
    }
    /**
     * Bulk create sdos
     * @param {Array} bulkList
     * @returns {Promise}
     */

  }, {
    key: "bulkCreate",
    value: function bulkCreate(bulkList) {
      console.log('Bulk create sdos');
    }
    /**
     * Bulk update sdos
     * @param {Array} bulkList
     * @returns {Promise}
     */

  }, {
    key: "bulkUpdate",
    value: function bulkUpdate(bulkList) {
      var collectedSods = bulkList.map(function (item) {
        item.md.r += 1;
        return item;
      });
      return HsModel.HsAdapter.editSdosBulk(collectedSods).then(function (response) {
        return response;
      });
    }
    /**
     * Archive sdo by its identifier
     * @returns {Promise}
     */

  }, {
    key: "archiveById",
    value: function archiveById(id) {
      console.log('Archive sdo by its identifier');
    }
    /**
     * Archive sdos by given where
     * @returns {Promise}
     */

  }, {
    key: "archiveWhere",
    value: function archiveWhere(where) {
      console.log('Archive sdos by where');
    }
    /**
     * Lock object by its identifier
     * @param {String} id
     * @returns {Object}
     */

  }, {
    key: "lockById",
    value: function lockById(id) {
      return HsModel.HsAdapter.lockItem(id).then(function (lockValue) {
        return lockValue;
      });
    }
    /**
     * Lock object by its identifier
     * @param {String} id
     * @returns {Object}
     */

  }, {
    key: "unlockById",
    value: function unlockById(id, lockValueId) {
      return HsModel.HsAdapter.unlockItem(id, lockValueId).then(function (response) {
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
      return HsModel.HsAdapter.getLockData(sdoId, lockValueId).then(function (response) {
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
      return HsModel.HsAdapter.isLockedItem(sdoId, lockValueId).then(function (response) {
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
      return HsModel.HsAdapter.existInLockState(sdoId, lockState).then(function (response) {
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
      return HsModel.HsAdapter.deleteSdo(id).then(function (response) {
        return response;
      });
    }
    /**
     * Delete sdo by where
     * @param {String} id
     * @param {Object} data
     */

  }, {
    key: "deleteWhere",
    value: function deleteWhere(where) {
      console.log("Delete sdos by where");
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
      var pageNo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      return HsModel.HsAdapter.getSdoArchive(sdoId, pageNo, pageSize).then(function (response) {
        return response.body.length !== undefined ? response.body : false;
      });
    }
    /**
     * Get revisons archive for sdo
     * @param {String} sdoId
     * @returns {Promise}
     */

  }, {
    key: "getRevisionsArchiveBySdoId",
    value: function getRevisionsArchiveBySdoId(sdoId) {
      return HsModel.HsAdapter.getSdoRevisionsArchive(sdoId).then(function (response) {
        return response;
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
          value = HsModel.MD_ID;
          break;

        case 'r':
          value = HsModel.MD_REVISION;
          break;

        case 'tsp':
          value = HsModel.MD_DATE;
          break;
      }

      return value;
    }
    /**
     * Create a new sdo for given schema
     * @param {Object} data
     * @returns {Promise}
     */

  }, {
    key: "createBlob",
    value: function createBlob(sdoBlob) {
      var sdo = JSON.parse(sdoBlob.getAll('sdo'));
      sdo['md'] = HsModel.HsSchema.generateMd();
      return HsModel.HsAdapter.validateSdo(sdo).then(function (validated) {
        if (validated) {
          sdoBlob.set('sdo', JSON.stringify(sdo));
          return HsModel.HsAdapter.createSdoBlob(sdoBlob).then(function (response) {
            return response;
          });
        }
      });
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
  }, {
    key: "ASC",
    get: function get() {
      return _hsConstants.ASC;
    }
    /**
     * Get sort desc type
     * @return {String}
     */

  }, {
    key: "DESC",
    get: function get() {
      return _hsConstants.DESC;
    }
    /**
     * Get meta id type
     * @return {String}
     */

  }, {
    key: "MD_ID",
    get: function get() {
      return _hsConstants.MD_ID;
    }
    /**
     * Get meta revision type
     * @return {String}
     */

  }, {
    key: "MD_REVISION",
    get: function get() {
      return _hsConstants.MD_REVISION;
    }
    /**
     * Get meta date type
     * @return {String}
     */

  }, {
    key: "MD_DATE",
    get: function get() {
      return _hsConstants.MD_DATE;
    }
    /**
     * Get filter request
     * @return {Object}
     */

  }, {
    key: "FILTER_REQUEST",
    get: function get() {
      return _hsConstants.FILTER_REQUEST;
    }
    /**
     * Get filter request sort options
     * @return {Object}
     */

  }, {
    key: "FILTER_REQUEST_SORT",
    get: function get() {
      return _hsConstants.FILTER_REQUEST_SORT;
    }
    /**
     * Get filter request filter options
     * @return {Object}
     */

  }, {
    key: "FILTER_REQUEST_FILTER",
    get: function get() {
      return _hsConstants.FILTER_REQUEST_FILTER;
    }
    /**
     * Get equal compare type
     * @return {String}
     */

  }, {
    key: "EQUAL",
    get: function get() {
      return _hsConstants.EQUAL;
    }
    /**
     * Get not equal compare type
     * @return {String}
     */

  }, {
    key: "NOT_EQUAL",
    get: function get() {
      return _hsConstants.NOT_EQUAL;
    }
    /**
     * Get contains compare type
     * @return {String}
     */

  }, {
    key: "CONTAINS",
    get: function get() {
      return _hsConstants.CONTAINS;
    }
    /**
     * Get not contains compare type
     * @return {String}
     */

  }, {
    key: "NOT_CONTAIN",
    get: function get() {
      return _hsConstants.NOT_CONTAIN;
    }
    /**
     * Get lower than compare type
     * @return {String}
     */

  }, {
    key: "LOWER_THAN",
    get: function get() {
      return _hsConstants.LOWER_THAN;
    }
    /**
     * Get lower equal than compare type
     * @return {String}
     */

  }, {
    key: "LOWER_EQUAL_THAN",
    get: function get() {
      return _hsConstants.LOWER_EQUAL_THAN;
    }
    /**
     * Get greater than compare type
     * @return {String}
     */

  }, {
    key: "GREATER_THAN",
    get: function get() {
      return _hsConstants.GREATER_THAN;
    }
    /**
     * Get greater equal than compare type
     * @return {String}
     */

  }, {
    key: "GREATER_EQUAL_THAN",
    get: function get() {
      return _hsConstants.GREATER_EQUAL_THAN;
    }
    /**
     * Get starts with compare type
     * @return {String}
     */

  }, {
    key: "START_WITH",
    get: function get() {
      return _hsConstants.START_WITH;
    }
    /**
     * Get ends with compare type
     * @return {String}
     */

  }, {
    key: "END_WITH",
    get: function get() {
      return _hsConstants.END_WITH;
    }
    /**
     * Get logic and type
     * @return {String}
     */

  }, {
    key: "AND",
    get: function get() {
      return _hsConstants.AND;
    }
    /**
     * Get logic or type
     * @return {String}
     */

  }, {
    key: "OR",
    get: function get() {
      return _hsConstants.OR;
    }
  }]);

  return HsModel;
}();

exports.default = HsModel;