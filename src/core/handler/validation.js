const AJV = require('ajv')

class ValidationHandler {
  /**
   * Consturctor
   */
  constructor () {
    this.ajv = this.AJV
  }

  /**
   * Get class
   * @returns {Object}
   */
  getClass () {
    return this
  }

  /**
   * AJV instance
   * @returns {Object}
   */
  get AJV () {
    return new AJV()
  }

  /**
   * Validate schema
   * @param {Object} schema
   * @returns {Boolean}
   */
  validateSchema (schema) {
    var validated = this.ajv.compile(schema)

    if ((validated.errors === undefined || validated.errors === null)) {
      return true
    } else {
      throw new Error({
        'status': 400,
        'text': 'Schema could not be compiled.'
      })
    }
  }

  /**
   * Validate schema
   * @param {Object} schema
   * @returns {Boolean}
   */
  validateProperties (schema, properties) {
    var validated = this.ajv.validate(schema, properties)

    if ((validated)) {
      return true
    } else {
      var errors = this.ajv.errors[0]
      throw new Error({
        'status': errors.dataPath + '.' + errors.keyword,
        'text': errors.message
      })
    }
  }
}

module.exports = new ValidationHandler()
