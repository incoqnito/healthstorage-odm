
'use-strict';

import uuid from 'uuid/v4';
import SchemaHandler from "./handler/schema";
import RequestHandler from "./handler/request";
import ValidationHandler from "./handler/validation";

const ASC = "Ascending";
const DESC = "Descending";
const META_ID = 'id';
const META_REVISION = 'r';
const META_DATE = 'tsp';

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

    ValidationHandler.validateSchema(this.schema.schema);

    this.md = {
      id: '',
      r: 1,
      eId: '',
      sId: this.schema.options.id,
      sr: 1,
      oId: this.schema.options.oId,
      tsp: ''
    }
  }

    /**
   * Return asc type field
   * @returns  {String}
   */
  get ASC() 
  {
    return ASC;
  }

  /**
   * Return desc type field
   * @returns  {String}
   */
  get DESC() 
  {
    return DESC;
  }

  /**
   * Return meta id type field
   * @returns  {String}
   */
  get META_ID() 
  {
    return META_ID;
  }

  /**
   * Return meta revision type field
   * @returns  {String}
   */
  get META_REVISION() 
  {
    return META_REVISION;
  }

  /**
   * Return meta revision type field
   * @returns  {String}
   */
  get META_DATE() 
  {
    return META_DATE;
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
   * Create a uuid 
   * @returns {String}
   */
  uuid() 
  {
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  }

  /**
   * Create a new sdo for given schema 
   * @param {Object} data 
   * @returns {Promise}
   * 
   * @todo Implement meta data
   */
  create(data)
  {
    var md = this.md;
    md.id = this.uuid();
    md.tsp = new Date().toISOString();

    data = Object.assign(data, {md: md});

    ValidationHandler.validateProperties(this.schema.schema, data);

    return RequestHandler.postSdo(data);
  }

  /**
   * Update sdo
   * @param {String} id 
   * @param {Object} data 
   */
  updateById(id, data)
  {
    data.md.r += 1;
    
    ValidationHandler.validateProperties(this.schema.schema, data);

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