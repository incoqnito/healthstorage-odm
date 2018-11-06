
'use-strict';

import Validator from "./validator";
import AjvInvalidError from "./exceptions";
import NoTitleForModelError from "./exceptions";

class Model extends Validator
{

  /**
   * Cosntruct
   * @param {String} name Title of the SDO
   * @param  {Object} options Options object
   */
  constructor(title, properties, options) 
  {
    super();
    this.setTitle(title);
    this.setProperties(properties);
    this.setOptions(options);

    if(this.getTitle() !== undefined) {
      this.setSchema(title)
    } else {
      throw new NoTitleForModelError("You provide no title for your model");
    }
  }

  /**
   * Set title of model
   * @returns {String} title
   */
  getTitle()
  {
    return this.title;
  }

  /**
   * Set title of model
   * @param {String} title
   */
  setTitle(title)
  {
    this.title = title;
  }

  /**
   * Set options of model
   * @returns {String} options
   */
  getOptions()
  {
    return this.options;
  }

  /**
   * Get options of model
   * @param {String} options
   */
  setOptions(options)
  {
    this.options = options;
  }

  /**
   * Set properties of model
   * @returns {String} properties
   */
  getProperties()
  {
    return this.properties;
  }

  /**
   * Get properties of model
   * @param {String} properties
   */
  setProperties(properties)
  {
    this.properties = properties;
  }

  /**
   * Set a schema based on name
   * @param {String} schema
   */
  setSchema(title)
  {
    this.schema = require("./../../config/api/btss/" + title + ".json");
  }

  /**
   * Get a schema based on name
   * @param {String} schema
   */
  getSchema()
  {
    return this.schema;
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
   * @param {Object} properties
   */
  create(properties, options)
  {
    if(!this.validateProperties(properties)) throw new AjvInvalidError(JSON.stringify(this.ajv.errors));
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

  /**
   * Validate given properties against schema
   * @param {Object} properties
   * @returns {Boolean}
   */
  validateProperties(properties)
  {
    return this.ajv.validate(this.getSchema(), properties);
  }
}

module.exports = Model;