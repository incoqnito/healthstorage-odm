'use-strict';

import uuid from 'uuid/v4';

const SCHEMA_DRAFT = "http://json-schema.org/draft-07/schema#";
const UUID_PATTERN = "^(\\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\\}{0,1})$";
const BTSS_PREFIX = "urn:btssid:";
const INT_MIN = 1.0;
const INT_MAX = 2147483647.0;
const NULL = "null";
const OBJECT = "object";
const STRING = "string";
const INTEGER = "integer";
const DOUBLE = "double";
const BOOLEAN = "boolean";
const FORMAT_DATE = "date-time";

const MD = {
  id: '',
  r: 0,
  eId: '',
  sId: '',
  sr: 0,
  oId: '',
  tsp: ''
}

class SchemaHandler {
  /**
   * Consturctor
   */
  constructor(title, properties, options) {
    this.props = {};
    this.props.schema = {};
    this.props.id = options.id;
    this.props.oId = options.oId;
    this.props.r = options.r;
    this.initSchema(title, properties, options);
  }

  /**
   * Init
   */
  initSchema(title, properties, options) {
    if (properties === undefined) throw "No properties set for schema creation";

    this.props.schema = {
      "$schema": this.SCHEMA_DRAFT,
      "title": title,
      "definitions": {
        "MetadataSdo": {
          "type": [
            this.OBJECT,
            this.NULL
          ],
          "additionalProperties": true,
          "properties": {
            "id": {
              "type": this.STRING,
              "pattern": this.UUID_PATTERN
            },
            "r": {
              "type": this.INTEGER,
              "minimum": this.INT_MIN,
              "maximum": this.INT_MAX
            },
            "eId": {
              "type": [
                this.STRING,
                this.NULL
              ]
            },
            "sId": {
              "type": this.STRING,
              "pattern": this.UUID_PATTERN
            },
            "sr": {
              "type": "integer",
              "minimum": this.INT_MIN,
              "maximum": this.INT_MAX
            },
            "oId": {
              "type": this.STRING,
              "pattern": this.UUID_PATTERN
            },
            "tsp": {
              "type": this.STRING,
              "format": this.FORMAT_DATE
            }
          },
          "required": [
            "id",
            "r",
            "eId",
            "sId",
            "sr",
            "oId",
            "tsp"
          ]
        }
      },
      "$id": this.BTSS_PREFIX + options.id + "/" + options.r,
      "type": "object",
      "properties": {
        "md": {
          "$ref": "#/definitions/MetadataSdo"
        }
      },
      "required": options.required
    }

    Object.assign(this.props.schema.properties, properties);
  }

  /**
   * Get class
   * @returns {Object}
   */
  getClass() {
    return this;
  }

  /**
   * Get schema
   * @returns {Object}
   */
  get schema() {
    return this.props.schema;
  }

  /**
   * Get id
   * @returns {String}
   */
  get id() {
    return this.props.id;
  }

  /**
   * Get oId
   * @returns {String}
   */
  get oId() {
    return this.props.oId;
  }

  /**
   * Get oId
   * @returns {String}
   */
  get r() {
    return this.props.r;
  }

  /**
   * Get schema draft
   * @returns {String}
   */
  get SCHEMA_DRAFT() {
    return SCHEMA_DRAFT;
  }

  /**
   * Get btss prefix
   * @returns {String}
   */
  get BTSS_PREFIX() {
    return BTSS_PREFIX;
  }

  /**
   * Get schema draft
   * @returns {String}
   */
  get UUID_PATTERN() {
    return UUID_PATTERN;
  }

  /**
   * Get int min
   * @returns {String}
   */
  get INT_MIN() {
    return INT_MIN;
  }

  /**
   * Get int max
   * @returns {String}
   */
  get INT_MAX() {
    return INT_MAX;
  }

  /**
   * Get null field
   * @returns {String}
   */
  get NULL() {
    return NULL;
  }

  /**
   * Get object field
   * @returns {String}
   */
  get OBJECT() {
    return OBJECT;
  }

  /**
   * Get string field
   * @returns {String}
   */
  get STRING() {
    return STRING;
  }

  /**
   * Get integer field
   * @returns {String}
   */
  get INTEGER() {
    return INTEGER;
  }

  /**
   * Get double field
   * @returns {String}
   */
  get DOUBLE() {
    return DOUBLE;
  }

  /**
   * Get boolean field
   * @returns {String}
   */
  get BOOLEAN() {
    return BOOLEAN;
  }

  /**
   * Get format date field
   * @returns {String}
   */
  get FORMAT_DATE() {
    return FORMAT_DATE;
  }

  /**
   * Get md meta field
   * @returns {String}
   */
  get MD() {
    return MD;
  }

  /**
   * Get deep value from object path
   * @returns {MixedResult}
   */
  deepValue(path) {
    var object = this.schema;
    for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
      object = object[path[i]];
    };
    return object;
  };

  /**
   * Generate MD for creation on the fly
   * @returns {Object}
   */
  generateMd() {
    var md = this.MD;
    md.id = uuid();
    md.r = 1;
    md.eId = '';
    md.sId = this.id;
    md.sr = this.r;
    md.oId = this.oId;
    md.tsp = new Date().toISOString();

    return md;
  }
}

export default SchemaHandler;
