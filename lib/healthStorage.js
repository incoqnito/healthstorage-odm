"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hsClient = _interopRequireDefault(require("./core/hsClient"));

var _hsSchema = _interopRequireDefault(require("./core/handler/hsSchema"));

var _hsAdapter = _interopRequireDefault(require("./core/handler/hsAdapter"));

var _hsConstants = require("./core/constants/hsConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HealthStorageODM =
/*#__PURE__*/
function () {
  /**
   * Construct
   * @param {Object} opts client object
   */
  function HealthStorageODM(opts) {
    _classCallCheck(this, HealthStorageODM);

    return this.constructor.createClient(opts);
  }
  /**
   * Get string type
   * @return {String} STRING
   */


  _createClass(HealthStorageODM, null, [{
    key: "createClient",

    /**
     * Static create client
     * @param {Object} opts client object
     * @returns {HS_INSTANCE} HealthStorgaeODM instace
     */
    value: function createClient(opts) {
      var client = Object.assign({}, this.CLIENT, opts);
      return new _hsClient.default(client);
    }
    /**
     * Get schema by identifier
     * @param {Object} opts
     * @param {Object} client
     * @return {Mixed}
     */

  }, {
    key: "getSchema",
    value: function getSchema(opts) {
      var client = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var adapter = new _hsAdapter.default(Object.assign({}, this.CLIENT, client));
      return adapter.getSchema(opts.id);
    }
    /**
     * Get schemas by identifiers
     * @param {Object} opts
     * @param {Object} client
     * @return {Mixed}
     * @info getSchemas Api Endpoint unknown format of concat ids
     */

  }, {
    key: "getSchemas",
    value: function getSchemas(opts, client) {
      var adapter = new _hsAdapter.default(Object.assign({}, this.CLIENT, client));
      return opts.ids.map(function (schemaId) {
        return adapter.getSchema(schemaId);
      }); // return adapter.getSchemas(opts.ids.join(',')) not supported currently
    }
    /**
     * Create schema
     * @param {Object} opts
     * @param {Object} client
     * @return {Mixed}
     */

  }, {
    key: "createSchema",
    value: function createSchema(opts, client) {
      var schema = new _hsSchema.default(opts);
      var adapter = new _hsAdapter.default(Object.assign({}, this.CLIENT, client));
      return adapter.createSchema(schema.schema);
    }
    /**
     * Delete schema by identifier
     * @param {Object} opts
     * @param {Object} client
     * @return {Mixed}
     */

  }, {
    key: "deleteSchema",
    value: function deleteSchema(id, client) {
      var adapter = new _hsAdapter.default(Object.assign({}, this.CLIENT, client));
      return adapter.deleteSchema(id);
    }
  }, {
    key: "STRING",
    get: function get() {
      return _hsConstants.STRING;
    }
    /**
     * Get number type
     * @return {String} NUMBER
     */

  }, {
    key: "NUMBER",
    get: function get() {
      return _hsConstants.NUMBER;
    }
    /**
     * Get integer type
     * @return {String} INTEGER
     */

  }, {
    key: "INTEGER",
    get: function get() {
      return _hsConstants.INTEGER;
    }
    /**
     * Get boolean type
     * @return {String} BOOLEAN
     */

  }, {
    key: "BOOLEAN",
    get: function get() {
      return _hsConstants.BOOLEAN;
    }
    /**
     * Get object type
     * @return {String} OBJECT
     */

  }, {
    key: "OBJECT",
    get: function get() {
      return _hsConstants.OBJECT;
    }
    /**
     * Get array type
     * @return {String} ARRAY
     */

  }, {
    key: "ARRAY",
    get: function get() {
      return _hsConstants.ARRAY;
    }
    /**
     * Get date type
     * @return {String} DATE
     */

  }, {
    key: "DATE",
    get: function get() {
      return _hsConstants.DATE;
    }
    /**
     * Get local client
     * @return {String} CLIENT
     */

  }, {
    key: "CLIENT",
    get: function get() {
      return _hsConstants.CLIENT;
    }
    /**
     * Get hs storage adapter
     * @return {String} HS_STORAGE_ADAPTER
     */

  }, {
    key: "HS_STORAGE_ADAPTER",
    get: function get() {
      return _hsConstants.HS_STORAGE_ADAPTER;
    }
    /**
     * Get hs sql adapter
     * @return {String} HS_SQL_ADAPTER
     * @info under construction
     */

  }, {
    key: "HS_SQL_ADAPTER",
    get: function get() {
      return _hsConstants.HS_SQL_ADAPTER;
    }
  }]);

  return HealthStorageODM;
}();

var _default = HealthStorageODM;
exports.default = _default;