'use-strict';

class SchemaHandler
{
  /**
   * Consturctor
   */
  constructor(title, properties, options) 
  {
    this.title = title;
    this.properties = properties;
    this.options = options;
    this.sId = options.id;
    this.oId = options.oId;
    this.r = options.r;

    this.schema = {
      "$schema": 'http://json-schema.org/draft-07/schema#',
      "title": this.title,
      "definitions": {
        "MetadataSdo": {
          "type": [
            "object",
            "null"
          ],
          "additionalProperties": false,
          "properties": {
            "id": {
              "type": "string",
              "pattern": "^(\\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\\}{0,1})$"
            },
            "r": {
              "type": "integer",
              "minimum": 1.0,
              "maximum": 2147483647.0
            },
            "eId": {
              "type": [
                  "string",
                  "null"
              ]
            },
            "sId": {
              "type": "string",
              "pattern": "^(\\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\\}{0,1})$"
            },
            "sr": {
              "type": "integer",
              "minimum": 1.0,
              "maximum": 2147483647.0
            },
            "oId": {
              "type": "string",
              "pattern": "^(\\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\\}{0,1})$"
            },
            "tsp": {
              "type": "string",
              "format": "date-time"
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
      "$id": "urn:btssid:" + this.options.id + "/" + this.options.r,
      "type": "object",
      "properties": {
        "md": {
          "$ref": "#/definitions/MetadataSdo"
        }
      },
      "required": options.required
    };
    
    if(this.properties !== undefined) Object.assign(this.schema.properties, properties);
  }

  /**
   * Get class
   * @returns {Object}
   */
  getClass()
  {
    return this;
  }

  /**
   * Set schema
   * @param {Object}
   */
  set schema(schema) 
  {
    this._schema = schema;
  }

  /**
   * Get schema
   * @returns {Object}
   */
  get schema()
  {
    return this._schema;
  }

  /**
   * Set sId
   * @param {String}
   */
  set sId(sId) 
  {
    this._sId = sId;
  }

  /**
   * Get sId
   * @returns {String}
   */
  get sId()
  {
    return this._sId;
  }

  /**
   * Set oId
   * @param {String}
   */
  set oId(oId) 
  {
    this._oId = oId;
  }

  /**
   * Get oId
   * @return {String}
   */
  get oId()
  {
    return this._oId;
  }

  /**
   * Set r
   * @param {Integer}
   */
  set r(r) 
  {
    this._r = r;
  }

  /**
   * Get r
   * @returns {Integer}
   */
  get r()
  {
    return this._r;
  }

  /**
   * Set title
   * @param {String}
   */
  set title(title) 
  {
    this._title = title;
  }

  /**
   * Get title
   * @returns {String}
   */
  get title()
  {
    return this._title;
  }

  /**
   * Set properties
   * @param {Object}
   */
  set properties(properties) 
  {
    this._properties = properties;
  }

  /**
   * Get properties
   * @returns {Object}
   */
  get properties()
  {
    return this._properties;
  }

  /**
   * Set options
   * @param {Object}
   */
  set options(options) 
  {
    this._options = options;
  }

  /**
   * Get options
   * @returns {Object}
   */
  get options()
  {
    return this._options;
  }

}

module.exports = SchemaHandler;