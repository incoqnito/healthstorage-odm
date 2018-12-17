/** Import HsInstance */

const HS_CLIENT = require('./core/hsClient.js')
const HS_REQUEST = require('./core/handler/hsRequest.js')
const HS_SCHEMA = require('./core/handler/hsSchema.js')

/** Debug flag */
const DEBUG = true
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
   * Static create client
   * @param {Object} opts client object
   * @returns {HS_INSTANCE} HealthStorgaeODM instace
   */
  createClient (opts) {
    if (opts === undefined) throw new Error('No client options provided for HealthStorageODM')
    if (opts.serverUrl === undefined) throw new Error('Client options set but no server url provided for HealthStorageODM')
    return new HS_CLIENT(opts)
  }
}

// /** HealthStorageODM */
// function HealthStorageODM () {

//   /**
//    * Create schema
//    * @returns {Promise}
//    */
//   this.createSchema = function (opts) {
//     var HsSchema = new HS_SCHEMA(opts)
//     var HsRequest = new HS_REQUEST(this.client)
//     return HsRequest.postSchema(HsSchema.schema)
//   }

//   /**
//    * Delete schema
//    * @returns {Promise}
//    */
//   this.deleteSchemaById = function (id) {
//     var HsRequest = new HS_REQUEST(this.client)
//     return HsRequest.deleteSchemaById(id)
//   }

//   /**
//    * Create sdos
//    */
//   this.createSdos = function (opts) {
//     var HsRequest = new HS_REQUEST(this.client)
//     for (var sdo in opts) {
//       HsRequest.postSdo(opts[sdo]).then(sdo => {
//         console.log(sdo)
//       })
//     }
//   }
// }
