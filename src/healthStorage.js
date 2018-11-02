'use-strict';

import Validator from "./helper/Validator";

const STRING = string;

class HealthStorage extends Validator
{ 

  static STRING;

  /**
   * Cosntruct
   * @param {String} name Title of the SDO
   * @param  {Object} options Options object
   */
  constructor(title, options) 
  {
    super(title, options);
    this.name = title;
    this.options = options;
  }

  /**
   * Define function 
   * @param {String} name Title of the SDO
   * @param  {Object} options Options object
   */
  static define(title, options) 
  {
    return new this(title, options);
  }

  /**
   * Return SDO title
   * @returns {String}
   */
  getTitle()
  {
    return this.name;
  }

  /**
   * 
   */
  static get constant1() {
    return constant1;
  }
  
  /**
   * Return SDO mimetype
   * @returns {String}
   */
  getMimetype()
  {
    return this.mimetype;
  }

  /**
   * Return SDO options
   * @returns {Object}
   */
  getOptions()
  {
    return this.options;
  }

  /**
   * Return a list of all found shemas
   * @param {Object} where eg. sort order
   * @param {Object} sort eg. sort order
   */
  findAll(where, sort)
  {
    // @TODO: GET /schemas/ 
  }

  /**
   * Return a single schema by its id
   * @param {String} id 
   */
  findById(id)
  {
    // @TODO: GET /schemas/{id}
  }

  /**
   * Return a single schema 
   * @param {Object} where
   */
  findOne(where)
  {
    // @TODO: GET /schemas/{where}
  }

  /**
   * Create a new schema based on defined type
   * @param {Object} options
   */
  create(options)
  {
    // @TODO: PUT /schemas/ 
  }

  /**
   * Update a schema by id and replace given fields
   * @param {String} id
   * @param {Object} fields
   */
  updateById(id, fields)
  {
    // @TODO: POST /schemas/ 
  }

  /**
   * Update a schema by where and replace given fields
   * @param {Object} where
   * @param {Object} fields
   */
  update(where, fields)
  {
    // @TODO: POST /schemas/ 
  }

  /**
   * Delete a schema by is
   * @param {String} id
   */
  deleteById(id)
  {
    // @TODO: DELETE /schemas/ 
  }

  /**
   * Delete a schema by is
   * @param {Object} where
   */
  delete(where)
  {
    // @TODO: DELETE /schemas/ 
  }
}

module.exports = HealthStorage;