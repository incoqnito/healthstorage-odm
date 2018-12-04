/** Import module */
const AJV = require('ajv');

/** Export module */
module.exports = new hsValidation();

/** Constants */
hsValidation.prototype.AJV = AJV;

/** Functions */
hsValidation.prototype.validateSchema = validateSchema;
hsValidation.prototype.validateProperties = validateProperties;

/** HealthStorageODM */
function hsValidation() {
  /** Set ajv */
  this.ajv = new AJV();
}

/** 
 * Validate schema 
 * @param {Object} schema
 * @returns {Boolean}
 */
function validateSchema (schema) {
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
 * Validate properties 
 * @param {Object} schema
 * @param {Object} properties
 * @returns {Boolean}
 */
function validateProperties (schema, properties) {
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
