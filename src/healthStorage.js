/** Import */
import HsClient from './core/hsClient'
import HsSchema from './core/handler/hsSchema'
import HsAdapter from './core/handler/hsAdapter'

/** constants */
import {
  STRING, NUMBER, INTEGER, BOOLEAN, OBJECT, ARRAY, DATE,
  HS_STORAGE_ADAPTER, HS_SQL_ADAPTER,
  CLIENT
} from './core/constants/hsConstants'

class HealthStorageODM {
  /**
   * Construct
   * @param {Object} opts client object
   */
  constructor (opts) {
    return this.constructor.createClient(opts)
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
   * Get date type
   * @return {String} DATE
   */
  static get DATE () {
    return DATE
  }

  /**
   * Get local client
   * @return {String} CLIENT
   */
  static get CLIENT () {
    return CLIENT
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
   * @info under construction
   */
  static get HS_SQL_ADAPTER () {
    return HS_SQL_ADAPTER
  }

  /**
   * Static create client
   * @param {Object} opts client object
   * @returns {HS_INSTANCE} HealthStorgaeODM instace
   */
  static createClient (opts) {
    let client = Object.assign({}, this.CLIENT, opts)
    return new HsClient(client)
  }

  /**
   * Get schema by identifier
   * @param {Object} opts
   * @param {Object} client
   * @return {Mixed}
   */
  static getSchema (opts, client = {}) {
    let adapter = new HsAdapter(Object.assign({}, this.CLIENT, client))
    return adapter.getSchema(opts.id)
  }

  /**
   * Get schemas by identifiers
   * @param {Object} opts
   * @param {Object} client
   * @return {Mixed}
   * @info getSchemas Api Endpoint unknown format of concat ids
   */
  static getSchemas (opts, client) {
    let adapter = new HsAdapter(Object.assign({}, this.CLIENT, client))
    return opts.ids.map(schemaId => {
      return adapter.getSchema(schemaId)
    })
    // return adapter.getSchemas(opts.ids.join(',')) not supported currently
  }

  /**
   * Create schema
   * @param {Object} opts
   * @param {Object} client
   * @return {Mixed}
   */
  static createSchema (opts, client) {
    let schema = new HsSchema(opts)
    let adapter = new HsAdapter(Object.assign({}, this.CLIENT, client))
    return adapter.createSchema(schema.schema)
  }

  /**
   * Delete schema by identifier
   * @param {Object} opts
   * @param {Object} client
   * @return {Mixed}
   */
  static deleteSchema (id, client) {
    let adapter = new HsAdapter(Object.assign({}, this.CLIENT, client))
    return adapter.deleteSchema(id)
  }
}

export default HealthStorageODM
