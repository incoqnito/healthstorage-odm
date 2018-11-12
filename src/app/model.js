
'use-strict';

import uuid from 'uuid/v4';
import ValidationHandler from "./handler/validation";
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
    this.title = title;
    this.properties = properties;
    this.options = options;

    this.md = {
      id: uuid(),
      r: 1,
      eId: '',
      sId: this.options.id,
      sr: 1,
      oId: this.options.oId,
      tsp: new Date().toISOString()
    }
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
  create(data)
  {
    data.md = this.md;
    return RequestHandler.apiPostSdo(this.options.id, data);
  }

  /**
   * Update sdo
   * @param {String} id 
   * @param {Object} data 
   */
  update(id, data)
  {
    return RequestHandler.apiPutSdo(id, data);
  }

  /**
   * Get all sdos from owner and schema
   * @param {Object} data 
   * @returns {Promise}
   * 
   * @todo Implement options
   */
  findAll()
  {
    return RequestHandler.apiGetSdos(this.options.oId, this.options.id);
  }

  /**
   * Get sdo by identifier
   * @param {String} id 
   * @returns {Promise}
   */
  findById(id)
  {
    return RequestHandler.apiGetSdo(id);
  }
}

module.exports = Model;