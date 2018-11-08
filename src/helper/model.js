
'use-strict';

import Validator from "./validator";
import AjvInvalidError from "./exceptions";
import NoTitleForModelError from "./exceptions";
import QueryBuilder from "./queryBuilder";

const JSON_QUERY = require('json-query');

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

    this.loadDb();

    if(this.getTitle() !== undefined) {
      this.setSchema(title);
      if(this.getSchema() !== undefined) this.setUid(this.getSchema());
    } else {
      throw new NoTitleForModelError("You provide no title for your model");
    }
  }

  /**
   * Load DB
   */
  loadDb()
  {
    this.db = require("./../__tests__/data/db.json");
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
   * Set options of model
   * @returns {String} options
   */
  getUid()
  {
    return this.uid;
  }

  /**
   * Get options of model
   * @param {String} options
   */
  setUid(schema)
  {
    this.uid = schema.schema.$id;
  }

  /**
   * Return a list of all found shemas
   * @param {Object} where eg. sort order
   * @param {Object} sort eg. sort order
   */
  findAll(where, sort)
  {
    return new Promise((resolve, reject) => {

      var whereQuery = QueryBuilder.buildQuery(where);
      var queryResult = JSON_QUERY(this.getTitle() + whereQuery, {data: this.db, allowRegexp: true});
      
      if(queryResult !== undefined) {
        resolve(queryResult.references[0]);
      } else {
        reject(queryResult);
      }
    });
  }

  /**
   * Return a single schema by its id
   * @param {String} id 
   */
  findOne(where)
  {
    return new Promise((resolve, reject) => {

      var whereQuery = QueryBuilder.buildQueryOne(where);
      var queryResult = JSON_QUERY(this.getTitle() + whereQuery, {data: this.db, allowRegexp: true});

      if(queryResult !== undefined) {
        var res = (queryResult.value !== null && queryResult.key != null) ? queryResult.references[0] : [];
        resolve(res);
      } else {
        reject(queryResult);
      }
    });
    // @TODO: GET /schemas/{id}
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