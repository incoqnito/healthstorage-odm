/** Import hsInstance */
const HS_INSTANCE = require('./core/hsInstance.js');
const HS_REQUEST = require('./core/handler/hsRequest.js');
const HS_SCHEMA = require('./core/handler/hsSchema.js');

/** String type */
const STRING = 'string'
/** Number type */
const NUMBER = 'number'
/** Integer type */
const INTEGER = 'integer'
/** Boolean type */
const BOOLEAN = 'boolean'

/** Export module */
module.exports = new HealthStorageODM();

/** Get constants */
HealthStorageODM.prototype.HS_INSTANCE = HS_INSTANCE;

/** HealthStorageODM */
function HealthStorageODM() {

  /** Types */
  this.STRING = STRING;
  this.NUMBER = NUMBER;
  this.INTEGER = INTEGER;
  this.BOOLEAN = BOOLEAN;

  /** 
   * Define 
   * @return {Object} hsInstance 
   */
  this.define = function(opts) {
    return this.HS_INSTANCE(opts)
  }

  /**
   * Create schema 
   * @returns {Promise}
   */
  this.createSchema = function(opts) {
    var hsSchema = new HS_SCHEMA(opts);
    return HS_REQUEST.postSchema(hsSchema.schema);
  }
}
