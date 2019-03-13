"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _hsHelper = _interopRequireDefault(require("./../lib/hsHelper"));

var _hsConstants = require("./../constants/hsConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HsSchema =
/*#__PURE__*/
function () {
  /**
   * Construct
   * @param {Object} opts instance object
   */
  function HsSchema(schemaProps) {
    _classCallCheck(this, HsSchema);

    if (schemaProps === undefined) throw new Error('No schema properties provided for HsSchema');
    if (schemaProps.title === undefined || schemaProps.title.trim() === '') throw new Error('No title provided for HsSchema.');
    if (schemaProps.properties === undefined) throw new Error('No properties provided for HsSchema.');
    if (schemaProps.options === undefined) throw new Error('No options provided for HsSchema.');
    this.props = {};
    this.props.title = schemaProps.title;
    this.props.properties = schemaProps.properties;
    this.props.required = schemaProps.options.required;
    this.props.id = schemaProps.options.id !== undefined ? schemaProps.options.id : (0, _v.default)();
    this.props.oId = schemaProps.options.oId !== undefined ? schemaProps.options.oId : '';
    this.props.r = schemaProps.options.r !== undefined ? schemaProps.options.r : 1;
    this.schema = this.createSchema();
  }
  /**
   * Get schema draft version
   * @return {String} SCHEMA_DRAFT
   */


  _createClass(HsSchema, [{
    key: "createSchema",

    /**
     * Create schema
     * @return {Object} schema
     */
    value: function createSchema() {
      var schema = {
        '$schema': this.SCHEMA_DRAFT,
        'title': this.props.title,
        'definitions': {
          'MetadataSdo': {
            'type': [this.OBJECT, this.NULL],
            'additionalProperties': true,
            'properties': {
              'id': {
                'type': this.STRING,
                'pattern': this.UUID_PATTERN
              },
              'r': {
                'type': this.INTEGER,
                'minimum': this.INT_MIN,
                'maximum': this.INT_MAX
              },
              'eId': {
                'type': [this.STRING, this.NULL]
              },
              'sId': {
                'type': this.STRING,
                'pattern': this.UUID_PATTERN
              },
              'sr': {
                'type': 'integer',
                'minimum': this.INT_MIN,
                'maximum': this.INT_MAX
              },
              'oId': {
                'type': this.STRING,
                'pattern': this.UUID_PATTERN
              },
              'tsp': {
                'type': this.STRING,
                'format': this.FORMAT_DATE
              }
            },
            'required': ['id', 'r', 'eId', 'sId', 'sr', 'oId', 'tsp']
          }
        },
        '$id': this.BTSS_PREFIX + this.props.id + '/' + this.props.r,
        'type': 'object',
        'properties': {
          'md': {
            '$ref': '#/definitions/MetadataSdo'
          }
        },
        'required': this.props.required
      };
      Object.assign(schema.properties, this.properties);
      return schema;
    }
    /**
     * Create md data for schema
     * @param {Object} schema
     * @returns {Object}
     */

  }, {
    key: "generateMd",
    value: function generateMd() {
      var metaFromSchema = _hsHelper.default.findValueByPath(this.schema, 'definitions.MetadataSdo.properties');

      var md = {};

      for (var key in metaFromSchema) {
        switch (key) {
          case 'id':
            md[key] = (0, _v.default)();
            break;

          case 'r':
            md[key] = 1;
            break;

          case 'sId':
            md[key] = this.props.id;
            break;

          case 'sr':
            md[key] = 1;
            break;

          case 'oId':
            md[key] = this.props.oId;
            break;

          case 'tsp':
            md[key] = new Date().toISOString();
            break;

          default:
            md[key] = '';
            break;
        }
      }

      return md;
    }
  }, {
    key: "SCHEMA_DRAFT",
    get: function get() {
      return _hsConstants.SCHEMA_DRAFT;
    }
    /**
     * Get uuid pattern regex
     * @return {String} UUID_PATTERN
     */

  }, {
    key: "UUID_PATTERN",
    get: function get() {
      return _hsConstants.UUID_PATTERN;
    }
    /**
     * Get btss pattern prefix
     * @return {String} BTSS_PREFIX
     */

  }, {
    key: "BTSS_PREFIX",
    get: function get() {
      return _hsConstants.BTSS_PREFIX;
    }
    /**
     * Get int min value
     * @return {String} INT_MIN
     */

  }, {
    key: "INT_MIN",
    get: function get() {
      return _hsConstants.INT_MIN;
    }
    /**
     * Get int max value
     * @return {String} INT_MAX
     */

  }, {
    key: "INT_MAX",
    get: function get() {
      return _hsConstants.INT_MAX;
    }
    /**
     * Get null type
     * @return {String} NULL
     */

  }, {
    key: "NULL",
    get: function get() {
      return _hsConstants.NULL;
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
     * Get string type
     * @return {String} STRING
     */

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
     * Get double type
     * @return {String} DOUBLE
     */

  }, {
    key: "DOUBLE",
    get: function get() {
      return _hsConstants.DOUBLE;
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
     * Get format date type
     * @return {String} FORMAT_DATE
     */

  }, {
    key: "FORMAT_DATE",
    get: function get() {
      return _hsConstants.FORMAT_DATE;
    }
  }]);

  return HsSchema;
}();

var _default = HsSchema;
exports.default = _default;