
'use-strict';

import uuid from 'uuid/v4';
import SchemaHandler from "./handler/schema";
import RequestHandler from "./handler/request";

class Model
{
  /**
   * Consturctor
   * @param {String} title 
   * @param {Object} properties 
   * @param {Object} options 
   */
  constructor(title, properties, options)
  {
    this.schema = new SchemaHandler(title, properties, options);
    //if(!ValidationHandler.validateSchema(this.schema.schema)) throw new SchemaValidationError("Schema is invalid.");

    this.md = {
      id: uuid(),
      r: 1,
      eId: '',
      sId: this.schema.options.id,
      sr: 1,
      oId: this.schema.options.oId,
      tsp: new Date().toISOString()
    }
  }

  /**
   * Set schema property
   * @returns {String}
   */
  set schema(schema)
  {
    this._schema = schema;
  }

  /**
   * Get schema property
   * @returns {String}
   */
  get schema()
  {
    return this._schema;
  }

  /**
   * Get title property
   * @returns {String}
   */
  get title()
  {
    return this._title;
  }

  /**
   * Set title property
   * @param {String} title
   */
  set title(title)
  {
    this._title = title;
  }

  /**
   * Get properties property
   * @returns {String}
   */
  get properties()
  {
    return this._properties;
  }

  /**
   * Set properties property
   * @param {String} properties
   */
  set properties(properties)
  {
    this._properties = properties;
  }

  /**
   * Get options property
   * @returns {String}
   */
  get options()
  {
    return this._options;
  }

  /**
   * Set options property
   * @param {String} options
   */
  set options(options)
  {
    this._options = options;
  }

  /**
   * Create a new sdo for given schema 
   * @param {Object} data 
   * @returns {Promise}
   * 
   * @todo Implement meta data
   */
  create(data, uuid)
  {
    this.md.id = (uuid !== undefined) ? uuid : this.md.id;
    //data.md = this.md;
    //if(!ValidationHandler.validateProperties(this.schema.schema, data)) throw new PropertyValidationError("The provided data could not be validated against schema.");
    return RequestHandler.postSdo(this.schema.options.id, data);
  }

  /**
   * Update sdo
   * @param {String} id 
   * @param {Object} data 
   */
  updateById(id, data)
  {
    //if(!ValidationHandler.validateProperties(this.schema.schema, data)) throw new PropertyValidationError("The provided data could not be validated against schema.");
    return RequestHandler.putSdo(id, data);
  }

  /**
   * Delete sdo (only for development)
   * @param {String} id 
   * @param {Object} data 
   */
  delete(id)
  {
    return RequestHandler.deleteSdo(id);
  }

  /**
   * Get all sdos from owner and schema
   * @param {Object} data 
   * @returns {Promise}
   * 
   * @todo Implement options
   */
  findAll(options)
  {
    return RequestHandler.getSdos(this.schema.options.oId, this.schema.options.id, options);
  }

  /**
   * Get sdo by identifier
   * @param {String} id 
   * @returns {Promise}
   */
  findById(id)
  {
    return RequestHandler.getSdo(id);
  }
}

export default Model;