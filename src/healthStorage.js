/** Import HsInstance */
const HS_CLIENT = require('./core/hsClient.js')
const HS_ADAPTER = require('./core/handler/hsAdapter.js')
const HS_SCHEMA = require('./core/handler/hsSchema.js')

/** String type */
import { STRING } from "./core/constants/hsConstants"
/** Number type */
import { NUMBER } from "./core/constants/hsConstants"
/** Integer type */
import { INTEGER } from "./core/constants/hsConstants"
/** Boolean type */
import { BOOLEAN } from "./core/constants/hsConstants"
/** Object type */
import { OBJECT } from "./core/constants/hsConstants"
/** Array type */
import { ARRAY } from "./core/constants/hsConstants"

/** Adapter */
import { HS_STORAGE_ADAPTER } from "./core/constants/hsConstants"
import { HS_SQL_ADAPTER } from "./core/constants/hsConstants"

/** Local server url fallback */
import { CLIENT } from "./core/constants/hsConstants"

class HealthStorageODM {
  /**
   * Construct
   * @param {Object} opts client object
   */
  constructor (opts) {
    if (opts === undefined) throw new Error('No client options provided for HealthStorageODM')
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
    if (opts === undefined) throw new Error('No client options provided for HealthStorageODM')
    if (opts.serverUrl === undefined) opts = CLIENT
    return new HS_CLIENT(opts)
  }

  /**
   * Create schema
   * @returns {Promise}
   */
  static createSchema (opts) {
    if (opts === undefined) throw new Error('No options provided for HealthStorageODM')

    var HsSchema = new HS_SCHEMA(opts)
    var HsAdapter = new HS_ADAPTER(CLIENT)

    return HsAdapter.createSchema(HsSchema.schema)
  }

  /**
   * Delete schema
   * @returns {Promise}
   */
  static deleteSchema (id) {
    var HsAdapter = new HS_ADAPTER(CLIENT)
    return HsAdapter.deleteSchema(id)
  }

  /**
   * Get schema
   * @returns {Promise}
   */
  static getSchema (opts, client = undefined) {
    if (opts === undefined) throw new Error('No options provided for HealthStorageODM')

    var HsAdapter = (client === undefined) ? new HS_ADAPTER(CLIENT) : new HS_ADAPTER(client)

    return HsAdapter.getSchema(opts.id)
  }

  /**
   * Get schemas
   * @returns {Promise}
   */
  static getSchemas (opts) {
    if (opts === undefined) throw new Error('No options provided for HealthStorageODM')

    var HsAdapter = new HS_ADAPTER(CLIENT)

    var ids = opts.ids.join(',')

    return HsAdapter.getSchemas(ids)
  }
}

export default HealthStorageODM