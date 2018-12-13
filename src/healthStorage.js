/** Import HsInstance */
const HS_INSTANCE = require('./core/hsInstance.js')
const HS_CLIENT = require('./core/hsClient.js')
const HS_REQUEST = require('./core/handler/hsRequest.js')
const HS_SCHEMA = require('./core/handler/hsSchema.js')

/** String type */
const STRING = 'string'
/** Number type */
const NUMBER = 'number'
/** Integer type */
const INTEGER = 'integer'
/** Boolean type */
const BOOLEAN = 'boolean'
/** Object type */
const OBJECT = 'object'
/** Array type */
const ARRAY = 'array'

/** Export module */
module.exports = new HealthStorageODM()

/** Get constants */
HealthStorageODM.prototype.HS_INSTANCE = HS_INSTANCE
HealthStorageODM.prototype.HS_CLIENT = HS_CLIENT

/** HealthStorageODM */
function HealthStorageODM () {
  /** Types */
  this.STRING = STRING
  this.NUMBER = NUMBER
  this.INTEGER = INTEGER
  this.BOOLEAN = BOOLEAN
  this.OBJECT = OBJECT
  this.ARRAY = ARRAY

  /**
   * Create Client
   */
  this.createClient = function (opts) {
    return this.HS_CLIENT(opts)
  }

  /**
   * Define
   * @return {Object} HsInstance
   */
  this.define = function (opts) {
    return this.HS_INSTANCE(opts)
  }

  /**
   * Create schema
   * @returns {Promise}
   */
  this.createSchema = function (opts) {
    var HsSchema = new HS_SCHEMA(opts)
    return HS_REQUEST.postSchema(HsSchema.schema)
  }

  /**
   * Delete schema
   * @returns {Promise}
   */
  this.deleteSchemaById = function (id) {
    return HS_REQUEST.deleteSchemaById(id)
  }
}
