'use-strict';

const AJV = require('ajv');

class ValidationHandler
{
  /**
   * Consturctor
   */
  constructor() 
  {
    this.ajv = this.AJV;
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
   * AJV instance
   * @returns {Object}
   */
  get AJV()
  {
    var ajv = AJV;
    return new ajv();
  }

  /**
   * Validate schema
   * @param {Object} schema
   * @returns {Boolean}
   */
  validateSchema(schema)
  {
    var validated = this.ajv.compile(schema);
    return (validated.errors === undefined || validated.errors === null) ? true : false; 
  }

   /**
   * Validate schema
   * @param {Object} schema
   * @returns {Boolean}
   */
  validateProperties(schema, properties)
  {
    var validated = this.ajv.validate(schema, properties);
    return validated;
  }
}

module.exports = new ValidationHandler();