/** Import HsInstance */

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

/** Local server url fallback */
const LOCAL_CLIENT = {
  serverUrl: 'http://localhost:8080'
}

module.exports = class HealthStorageODM {
  /**
   * Construct
   * @param {Object} opts client object
   */
  constructor (opts) {
    if (opts === undefined) throw new Error('No client options provided for HealthStorageODM')
    return this.createClient(opts)
  }

  /**
   * Get string type
   * @return {String} STRING
   */
  static get STRING () {
    return STRING
  }

  /**
   * Get number type
   * @return {String} NUMBER
   */
  get NUMBER () {
    return NUMBER
  }

  /**
   * Get integer type
   * @return {String} INTEGER
   */
  get INTEGER () {
    return INTEGER
  }

  /**
   * Get boolean type
   * @return {String} BOOLEAN
   */
  get BOOLEAN () {
    return BOOLEAN
  }

  /**
   * Get object type
   * @return {String} OBJECT
   */
  get OBJECT () {
    return OBJECT
  }

  /**
   * Get array type
   * @return {String} ARRAY
   */
  get ARRAY () {
    return ARRAY
  }

  /**
   * Get local client
   * @return {String} LOCAL_CLIENT
   */
  get LOCAL_CLIENT () {
    return LOCAL_CLIENT
  }

  /**
   * Static create client
   * @param {Object} opts client object
   * @returns {HS_INSTANCE} HealthStorgaeODM instace
   */
  createClient (opts) {
    if (opts === undefined) throw new Error('No client options provided for HealthStorageODM')
    if (opts.serverUrl === undefined) opts = LOCAL_CLIENT
    return new HS_CLIENT(opts)
  }

  /**
   * Create schema
   * @returns {Promise}
   */
  createSchema (opts) {
    if (opts === undefined) throw new Error('No options provided for HealthStorageODM')

    var HsSchema = new HS_SCHEMA(opts)
    var HsRequest = new HS_REQUEST(LOCAL_CLIENT)

    return HsRequest.postSchema(HsSchema.schema)
  }

  /**
   * Delete schema
   * @returns {Promise}
   */
  deleteSchemaById (id) {
    var HsRequest = new HS_REQUEST(LOCAL_CLIENT)
    return HsRequest.deleteSchemaById(id)
  }
}
