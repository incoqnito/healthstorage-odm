"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hsConstants = require("./constants/hsConstants");

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
   * @return {String} ASC
   */


  _createClass(HsModel, [{
    key: "create",

    /**
     * Create a new sdo for given schema
     * @param {Object} data
     * @returns {Promise}
     * @issue API not returns created object, workaround implemented for sdo and sdoBlob
     */
    value: function create(props) {
      var propsForSdo = Object.assign(props, {
        md: HsModel.HsSchema.generateMd()
      });
      return HsModel.HsAdapter.validateSdo(propsForSdo).then(function (validated) {
        if (validated) {
          return HsModel.HsAdapter.createSdo(propsForSdo).then(function (sdo) {
            return new HsModel(sdo);
          });
        }
      });
    }
    /**
     * Init props of instance
     * @param {Object} props
     */

  }, {
    key: "initProperties",
    value: function initProperties(props) {
      var _this = this;

      this._props = props;

      var _loop = function _loop(key) {
        Object.defineProperty(_this, key, {
          get: function get() {
            return this._props[key];
          },
          set: function set(value) {
            if (this._props[key] !== value) {
              this._props[key] = value;
            }
          }
        });
      };

      for (var key in this._props) {
        _loop(key);
      }
    }
    /**
     * Save created model with its properties
     */

  }, {
    key: "save",
    value: function save() {
      return this.create(this._props);
    }
  }], [{
    key: "instance",

    /**
     * Create new instance of model with given schema
     * @param {Object} schema 
     */
    value: function instance(schema, adapter) {
      this.HsSchema = schema;
      this.HsAdapter = adapter;
    }
    /**
     * Get all sdos from owner and schema
     * @param {Object} data
     * @returns {Promise}
     */

  }, {
    key: "findAll",
    value: function findAll(options) {
      return HsModel.HsAdapter.getSdos(HsModel.HsSchema.props.oId, HsModel.HsSchema.props.id, options).then(function (response) {
        var list = response.body.map(function (sdo) {
          return new HsModel(sdo);
        });
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
      if (where === undefined) return Promise.resolve({});
      return this.findAll().then(function (sdos) {
        var matchedEntries = [];
        sdos.list.forEach(function (models) {
          Object.keys(where).forEach(function (key) {
            if (models[key] === where[key]) matchedEntries.push(models);
          });
        });
        return matchedEntries[0] !== undefined ? matchedEntries[0] : false;
      });
    }
  }, {
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

  return HsModel;
}();

exports.default = HsModel;