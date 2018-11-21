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

    if((validated.errors === undefined || validated.errors === null)) {
      return true;
    } else {
      throw  {
        'status': 400, 
        'text': "Schema could not be compiled."
      };
    }
  }

  /**
   * Validate schema
   * @param {Object} schema
   * @returns {Boolean}
   */
  validateProperties(schema, properties)
  {
    var validated = this.ajv.validate(schema, properties);
    if((validated)) {
      return true;
    } else {
      throw {
        'status': 400, 
        'text': "Properties could not validated against given schema"
      };
    }
  }
}

module.exports = new ValidationHandler();