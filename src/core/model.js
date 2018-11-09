
'use-strict';

import Api from "./api.js";
import Validator from "./helper/validator";
import AjvInvalidError from "./helper/exceptions";
import NoTitleForModelError from "./helper/exceptions";
import QueryBuilder from "./helper/queryBuilder";

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

    if(this.getTitle() !== undefined) {
      this.setSchema(title);
      if(this.getSchema() !== undefined) this.setUid(this.getSchema());
    } else {
      throw new NoTitleForModelError("You provide no title for your model");
    }

    this.loadModel();
  }

  /**
   * Load DB
   */
  loadModel()
  {
    this.model = require("./../__tests__/data/db.json");
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
    var uidWithRevision = schema.schema.$id.replace("urn:btssid:", "");
    var uid = uidWithRevision.split("/")[0];
    this.uid = uid;
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
      var queryResult = JSON_QUERY(this.getTitle() + whereQuery, {data: this.model, allowRegexp: true});
      
      if(queryResult !== undefined && queryResult.value !== undefined) {
        resolve(queryResult.value);
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
      var queryResult = JSON_QUERY(this.getTitle() + whereQuery, {data: this.model, allowRegexp: true});

      if(queryResult !== undefined) {
        var res = (queryResult.value !== null) ? queryResult.value : [];
        resolve(res);
      } else {
        reject(queryResult);
      }
    });
    // @TODO: GET /schemas/{id}
  }

  /**
   * Return a single schema by its id
   * @param {String} id 
   */
  findById(id)
  {
    return new Promise((resolve, reject) => {
      if(this.model[this.getTitle()] !== undefined && this.model[this.getTitle()][id] !== undefined) {
        resolve(this.model[this.getTitle()][id]);
      } else {
        reject([]);
      }
    });
    // @TODO: GET /schemas/{id}
  }

  /**
   * Create a new schema based on defined type
   * @todo implement options
   * @param {Object} properties
   */
  create(properties, options)
  {
    if(!this.validateProperties(properties)) throw new AjvInvalidError(JSON.stringify(this.ajv.errors));

    return new Promise((resolve, reject) => {
      if(this.model !== undefined) {
        this.model = this.model.concat(properties);
        
        resolve(this.model);
      } else {
        reject([]);
      }
    });

    // @TODO: PUT /schemas/ 
  }

  /**
   * Update a schema by id and replace given fields
   * @param {String} id
   * @param {Object} fields
   */
  updateById(id, properties)
  {
    if(!this.validateProperties(properties)) throw new AjvInvalidError(JSON.stringify(this.ajv.errors));
    
    return new Promise((resolve, reject) => {
      if(this.model[this.getTitle()] !== undefined && this.model[this.getTitle()][id] !== undefined) {
        this.model[this.getTitle()][id] = Object.assign(this.model[this.getTitle()][id], properties);
        resolve(this.model[this.getTitle()][id]);
      } else {
        reject([]);
      }
    });
    // @TODO: POST /schemas/ 
  }

  /**
   * Update a schema by where and replace given fields
   * @param {Object} where
   * @param {Object} fields
   */
  update(where, properties)
  {
    return new Promise((resolve, reject) => {
      this.findAll().then(
        queryResult => {
          var changed = [];
          if(queryResult !== undefined && queryResult.value !== null && queryResult.key != null) {
            if(Array.isArray(queryResult.key)) {
              for(var id in queryResult.key) {
                if(this.model[this.getTitle()] !== undefined && this.model[this.getTitle()][id] !== undefined && properties != undefined && properties != {}) {
                  this.model[this.getTitle()][id] = Object.assign(this.model[this.getTitle()][id], properties);
                  changed.push(this.model[this.getTitle()][id]);
                }
              }
              } else {
              var id = queryResult.key;
              if(this.model[this.getTitle()] !== undefined && this.model[this.getTitle()][id] !== undefined && properties != undefined && properties != {}) {
                this.model[this.getTitle()][id] = Object.assign(this.model[this.getTitle()][id], properties);
                changed.push(this.model[this.getTitle()][id]);
              }
            }
            resolve(changed);
          }
        },
        error => {
          reject(error);
        }
      )
    });
  }

  /**
   * Delete a schema by is
   * @param {String} id
   */
  deleteById(id)
  {
    return new Promise((resolve, reject) => {
      if(this.model[this.getTitle()] !== undefined && this.model[this.getTitle()][id] !== undefined) {
        this.model[this.getTitle()].splice(id, 1);
        resolve(this.model[this.getTitle()]);
      } else {
        reject([]);
      }
    });
    // @TODO: DELETE /schemas/ 
  }

  /**
   * Delete a schema by is
   * @param {Object} where
   */
  delete(where)
  {
    return new Promise((resolve, reject) => {
      this.findAll().then(
        queryResult => {
          if(queryResult !== undefined && queryResult.value !== null && queryResult.key != null) {
            if(Array.isArray(queryResult.key)) {
              for(var id in queryResult.key) {
                if(this.model[this.getTitle()] !== undefined && this.model[this.getTitle()][id]) {
                  this.model[this.getTitle()].splice(id, 1);
                }
              }
            } else {
              var id = queryResult.key;
              if(this.model[this.getTitle()] !== undefined && this.model[this.getTitle()][id]) {
                this.model[this.getTitle()].splice(id, 1);
              }
            }
          }
          resolve(this.model[this.getTitle()]);
        },
        error => {
          reject(error);
        }
      )
    });
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