/** Import HsInstance */

const HS_CLIENT = require('./core/hsClient.js')
const HS_ADAPTER = require('./core/handler/hsAdapter.js')
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

/** Adapter */
const HS_STORAGE_ADAPTER = 'hsStorageAdapter'
const HS_SQL_ADAPTER = 'hsSqlAdapter'

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
  static get NUMBER () {
    return NUMBER
  }

  /**
   * Get integer type
   * @return {String} INTEGER
   */
  static get INTEGER () {
    return INTEGER
  }

  /**
   * Get boolean type
   * @return {String} BOOLEAN
   */
  static get BOOLEAN () {
    return BOOLEAN
  }

  /**
   * Get object type
   * @return {String} OBJECT
   */
  static get OBJECT () {
    return OBJECT
  }

  /**
   * Get array type
   * @return {String} ARRAY
   */
  static get ARRAY () {
    return ARRAY
  }

  /**
   * Get local client
   * @return {String} LOCAL_CLIENT
   */
  static get LOCAL_CLIENT () {
    return LOCAL_CLIENT
  }

  /**
   * Get hs storage adapter
   * @return {String} HS_STORAGE_ADAPTER
   */
  static get HS_STORAGE_ADAPTER () {
    return HS_STORAGE_ADAPTER
  }

  /**
   * Get hs sql adapter
   * @return {String} HS_SQL_ADAPTER
   */
  static get HS_SQL_ADAPTER () {
    return HS_SQL_ADAPTER
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
    var HsAdapter = new HS_ADAPTER(LOCAL_CLIENT)

    return HsAdapter.postSchema(HsSchema.schema)
  }

  /**
   * Delete schema
   * @returns {Promise}
   */
  deleteSchemaById (id) {
    var HsAdapter = new HS_ADAPTER(LOCAL_CLIENT)
    return HsAdapter.deleteSchemaById(id)
  }
}
