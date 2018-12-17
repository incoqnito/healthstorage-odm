
/** Import modules */
const HS_MODEL = require('./HsModel.js')
const HS_SCHEMA = require('./handler/hsSchema.js')
const HS_REQUEST = require('./handler/hsRequest.js')
const HS_VALIDATION = require('./handler/hsValidation.js')

/** Get constants */
const ASC = 'Ascending'
const DESC = 'Descending'
const MD_ID = 'id'
const MD_REVISION = 'r'
const MD_DATE = 'tsp'

module.exports = class HsInstance {
  /**
   * Construct
   * @param {Object} opts instance object
   */
  constructor (opts) {
    console.log('HsInstance constructor fired.')
    if (opts === undefined) throw new Error('No instance options provided for HealthStorageODM')
    this.HsSchema = this.buildSchema(opts)
  }

  /**
   * Get sort asc type
   * @return {String} ASC
   */
  get ASC () {
    return ASC
  }

  /**
   * Get sort desc type
   * @return {String} DESC
   */
  get DESC () {
    return DESC
  }

  /**
   * Get meta id type
   * @return {String} MD_ID
   */
  get MD_ID () {
    return MD_ID
  }

  /**
   * Get meta revision type
   * @return {String} MD_REVISION
   */
  get MD_REVISION () {
    return MD_REVISION
  }

  /**
   * Get meta date type
   * @return {String} MD_DATE
   */
  get MD_DATE () {
    return MD_DATE
  }

  /**
   * Create schema from options
   * @param {Object} schemaProps propties for schema builduing
   */
  buildSchema (schemaProps) {
    return new HS_SCHEMA(schemaProps)
  }
}

// /** HS Instance */
// function HsInstance (opts, client) {
//   /** Types */

//   /** Set schema by given values */
//   var HsSchema = new HS_SCHEMA(opts)

//   /** Request */
//   var HsRequest = new HS_REQUEST(client)

//   /**
//    * Create schema
//    * @returns {Promise}
//    */
//   this.createSchema = function () {
//     return HsRequest.postSchema(HsSchema.schema)
//   }

//   /**
//    * Get all sdos from owner and schema
//    * @param {Object} data
//    * @returns {Promise}
//    */
//   this.findAll = function (options) {
//     return HsRequest.getSdoByIds(HsSchema.props.oId, HsSchema.props.id, options).then(response => {
//       var list = []
//       for (var sdo in response.body) {
//         list.push(new HS_MODEL(response.body[sdo], client))
//       }
//       return {
//         list: list,
//         headers: response.headers
//       }
//     })
//   }

//   /**
//    * Get sdo by identifier
//    * @param {String} id
//    * @returns {Promise}
//    */
//   this.findById = function (id) {
//     return HsRequest.getSdoById(id).then(sdo => new HS_MODEL(sdo))
//   }

//   /**
//    * Create a new sdo for given schema
//    * @param {Object} data
//    * @returns {Promise}
//    */
//   this.create = function (data) {
//     data = Object.assign(data, { md: HsSchema.generateMd() })
//     HS_VALIDATION.validateProperties(HsSchema.schema, data)
//     return HsRequest.postSdo(data).then(sdo => new HS_MODEL(sdo, client))
//   }

//   /** Update sdo
//    * @param {String} id
//    * @param {Object} data
//    */
//   this.updateById = function (id, data) {
//     data.md.r += 1
//     HS_VALIDATION.validateProperties(HsSchema.schema, data)
//     return HsRequest.putSdoById(id, data).then(sdo => new HS_MODEL(sdo, client))
//   }

//   /**
//    * Delete sdo (only for development)
//    * @param {String} id
//    * @param {Object} data
//    */
//   this.deleteById = function (id) {
//     return HsRequest.deleteSdoById(id)
//   }

//   /**
//    * Find meta fields
//    * @returns {String}
//    */
//   this.findMetaField = function (key) {
//     var value = ''
//     switch (key) {
//       case 'id':
//         value = this.MD_ID
//         break
//       case 'r':
//         value = this.MD_REVISION
//         break
//       case 'tsp':
//         value = this.MD_DATE
//         break
//     }
//     return value
//   }

//   /**
//    * Create lock value on sdo by its identifier
//    * @param {String} id
//    */
//   this.createLockValueById = function (id) {
//     return HsRequest.postLockById(id).then(response => response)
//   }

//   /**
//    * Get lock value on sdo by its identifier and lock value
//    * @param {String} id
//    * @param {String} lockValue
//    */
//   this.getLockValueById = function (id, lockValueId) {
//     return HsRequest.getLockById(id, lockValueId)
//   }

//   /**
//    * Delete lock value on sdo by its identifier
//    * @param {String} id
//    * @param {String} lockValue
//    */
//   this.deleteLockValueById = function (id, lockValueId) {
//     return HsRequest.deleteLockById(id, lockValueId)
//   }

//   /**
//    * Get lock state on sdo by its identifier
//    * @param {String} id
//    * @param {String} lockValue
//    */
//   this.isLockedById = function (id, lockValue) {
//     // could not be done currently, lock is strange
//   }

//   /**
//    * Get lock state on sdo by its identifier (head)
//    * @param {String} id
//    * @param {String} lockValue
//    */
//   this.lockStatebyId = function (id, lockValue) {
//     // could not be done currently, lock is strange
//   }

//   return this
// }
