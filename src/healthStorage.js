'use-strict';

import Validator from "./helper/validator";
import AjvInvalidError from "./helper/exceptions";

const BLUEPRINT = require("./schema/blueprint.json");
const STRING = "string";

class HealthStorage extends Validator
{ 
  /**
   * Cosntruct
   * @param {String} name Title of the SDO
   * @param  {Object} options Options object
   */
  constructor(title, properties, options) 
  {
    super(title, options);
    this.title = title;
    this.properties = properties;
    this.options = options;

    this.setSchema();
  }

  /**
   * Define function 
   * @param {String} name Title of the SDO
   * @param {Object} options Options object
   */
  static define(title, properties, options) 
  {
    return new this(title, properties, options);
  }

  /**
   * Return string type field
   * @returns  {String}
   */
  static get STRING() 
  {
    return STRING;
  }

  /**
   * Return blueprint schema object
   * @returns  {Object}
   */
  static get BLUEPRINT() 
  {
    return BLUEPRINT;
  }

  /**
   * Return schema title
   * @returns {String}
   */
  getTitle()
  {
    return this.name;
  }

  /**
   * Return schema options
   * @returns {Object}
   */
  getOptions()
  {
    return this.options;
  }

  /**
   * Return schema properties
   * @returns {Object}
   */
  getProperties()
  {
    return this.properties;
  }

  /**
   * Return schema options required list
   * @returns {Arry}
   */
  getRequired()
  {
    return (this.options.required !== undefined) ? this.options.required : undefined;
  }

  /**
   * Return schema options required list
   * @returns {Arry}
   */
  getAdditionalProperties()
  {
    return (this.options.additionalProperties !== undefined) ? this.options.additionalProperties : undefined;
  }

  /**
   * Return schema
   * @returns {Object}
   */
  getSchema()
  {
    return this.schema;
  }

  /**
   * Assign properties an options to schema and complie
   * @param {Object} properties
   */
  setSchema()
  {
    var blueprint = BLUEPRINT;

    blueprint.title = this.getTitle();
    Object.assign(blueprint.properties, this.getProperties());
    if(this.getRequired() !== undefined) blueprint.required = blueprint.required.concat(this.getRequired());
    if(this.getAdditionalProperties() !== undefined) blueprint.additionalProperties = this.getAdditionalProperties();

    var compiledSchema = this.ajv.compile(blueprint);
    if(compiledSchema.errors !== null) throw new ValidationError("the provided blueprint is not valid after merging your options");
    
    this.schema = compiledSchema.schema;
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
}

module.exports = HealthStorage;