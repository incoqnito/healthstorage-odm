
'use-strict';

import SchemaHandler from "./handler/schema";
import RequestHandler from "./handler/request";
import ValidationHandler from "./handler/validation";

const ASC = "Ascending";
const DESC = "Descending";
const META_ID = 'id';
const META_REVISION = 'r';
const META_DATE = 'tsp';

class Model {
  /**
   * Consturctor
   * @param {String} title 
   * @param {Object} properties 
   * @param {Object} options 
   */
  constructor(title, properties, options) {
    this.schemaHandler = new SchemaHandler(title, properties, options);
    this.schema = this.schemaHandler.schema;
    ValidationHandler.validateSchema(this.schema);
  }

  /**
   * Return asc type field
   * @returns  {String}
   */
  get ASC() {
    return ASC;
  }

  /**
   * Return desc type field
   * @returns  {String}
   */
  get DESC() {
    return DESC;
  }

  /**
   * Return meta id type field
   * @returns  {String}
   */
  get META_ID() {
    return META_ID;
  }

  /**
   * Return meta revision type field
   * @returns  {String}
   */
  get META_REVISION() {
    return META_REVISION;
  }

  /**
   * Return meta revision type field
   * @returns  {String}
   */
  get META_DATE() {
    return META_DATE;
  }

  findMetaField(key) {
    var value = "";

    switch (key) {
      case 'id':
        value = this.META_ID;
        break;
      case 'r':
        value = this.META_REVISION;
        break;
      case 'tsp':
        value = this.META_DATE;
        break;
    }

    return value;
  }

  /**
   * Get schema
   * @returns {String}
   */
  get schema() {
    return this._schema;
  }

  /**
   * Set schema property
   * @param {String} schema
   */
  set schema(schema) {
    this._schema = schema;
  }

  /**
   * Get properties property
   * @returns {String}
   */
  get properties() {
    return this._properties;
  }

  /**
   * Set properties property
   * @param {String} properties
   */
  set properties(properties) {
    this._properties = properties;
  }

  /**
   * Get options property
   * @returns {String}
   */
  get options() {
    return this._options;
  }

  /**
   * Set options property
   * @param {String} options
   */
  set options(options) {
    this._options = options;
  }

  /**
   * Create a new sdo for given schema 
   * @param {Object} data 
   * @returns {Promise}
   * 
   * @todo Implement meta data
   */
  create(data) {
    data = Object.assign(data, {md: this.schemaHandler.generateMd()});
    ValidationHandler.validateProperties(this.schema, data);
    return RequestHandler.postSdo(data);
  }

  /**
   * Update sdo
   * @param {String} id 
   * @param {Object} data 
   */
  updateById(id, data) {
    data.md.r += 1;
    ValidationHandler.validateProperties(this.schema, data);
    return RequestHandler.putSdoById(id, data);
  }

  /**
   * Delete sdo (only for development)
   * @param {String} id 
   * @param {Object} data 
   */
  deleteById(id) {
    return RequestHandler.deleteSdoById(id);
  }

  /**
   * Get all sdos from owner and schema
   * @param {Object} data 
   * @returns {Promise}
   * 
   * @todo Implement options
   */
  findAll(options) {
    return RequestHandler.getSdoByIds(this.schemaHandler.oId, this.schemaHandler.id, options);
  }

  /**
   * Get sdo by identifier
   * @param {String} id 
   * @returns {Promise}
   */
  findById(id) {
    return RequestHandler.getSdoById(id);
  }
}

export default Model;
