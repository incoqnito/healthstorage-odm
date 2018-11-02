class Validator
{
  /**
   * Construct
   */
  constructor()
  {
    this.Ajv = require('ajv');
    this.ajv = new this.Ajv();
  }
}

module.exports = Validator;