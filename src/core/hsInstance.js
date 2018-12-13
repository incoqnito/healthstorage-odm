
/** Import modules */
const HS_MODEL = require('./HsModel.js')
const HS_SCHEMA = require('./handler/hsSchema.js')
const HS_REQUEST = require('./handler/hsRequest.js')
const HS_VALIDATION = require('./handler/hsValidation.js')

/** Export module */
module.exports = HsInstance

/** Get constants */
const ASC = 'Ascending'
const DESC = 'Descending'
const MD_ID = 'id'
const MD_REVISION = 'r'
const MD_DATE = 'tsp'

/** HS Instance */
function HsInstance (opts, client) {
  /** Types */
  this.ASC = ASC
  this.DESC = DESC
  this.MD_ID = MD_ID
  this.MD_REVISION = MD_REVISION
  this.MD_DATE = MD_DATE

  /** Set schema by given values */
  this.HsSchema = new HS_SCHEMA(opts)

  /** Request */
  this.HsRequest = new HS_REQUEST(client)

  /**
   * Get all sdos from owner and schema
   * @param {Object} data
   * @returns {Promise}
   */
  this.findAll = function (options) {
    return this.HsRequest.getSdoByIds(this.HsSchema.props.oId, this.HsSchema.props.id, options).then(response => {
      var list = []
      for (var sdo in response.body) {
        list.push(new HS_MODEL(response.body[sdo], client))
      }
      return {
        list: list,
        headers: response.headers
      }
    })
  }

  /**
   * Get sdo by identifier
   * @param {String} id
   * @returns {Promise}
   */
  this.findById = function (id) {
    return this.HsRequest.getSdoById(id).then(sdo => new HS_MODEL(sdo))
  }

  /**
   * Create a new sdo for given schema
   * @param {Object} data
   * @returns {Promise}
   */
  this.create = function (data) {
    data = Object.assign(data, { md: this.HsSchema.generateMd() })
    HS_VALIDATION.validateProperties(this.HsSchema.schema, data)
    return this.HsRequest.postSdo(data).then(sdo => new HS_MODEL(sdo, client))
  }

  /** Update sdo
   * @param {String} id
   * @param {Object} data
   */
  this.updateById = function (id, data) {
    data.md.r += 1
    HS_VALIDATION.validateProperties(this.HsSchema.schema, data)
    return this.HsRequest.putSdoById(id, data).then(sdo => new HS_MODEL(sdo, client))
  }

  /**
   * Delete sdo (only for development)
   * @param {String} id
   * @param {Object} data
   */
  this.deleteById = function (id) {
    return this.HsRequest.deleteSdoById(id)
  }

  /**
   * Find meta fields
   * @returns {String}
   */
  this.findMetaField = function (key) {
    var value = ''
    switch (key) {
      case 'id':
        value = this.MD_ID
        break
      case 'r':
        value = this.MD_REVISION
        break
      case 'tsp':
        value = this.MD_DATE
        break
    }
    return value
  }

  /**
   * Create lock value on sdo by its identifier
   * @param {String} id
   */
  this.createLockValueById = function (id) {
    return this.HsRequest.postLockById(id).then(response => response)
  }

  /**
   * Get lock value on sdo by its identifier and lock value
   * @param {String} id
   * @param {String} lockValue
   */
  this.getLockValueById = function (id, lockValueId) {
    return this.HsRequest.getLockById(id, lockValueId)
  }

  /**
   * Delete lock value on sdo by its identifier
   * @param {String} id
   * @param {String} lockValue
   */
  this.deleteLockValueById = function (id, lockValueId) {
    return this.HsRequest.deleteLockById(id, lockValueId)
  }

  /**
   * Get lock state on sdo by its identifier
   * @param {String} id
   * @param {String} lockValue
   */
  this.isLockedById = function (id, lockValue) {

  }

  /**
   * Get lock state on sdo by its identifier (head)
   * @param {String} id
   * @param {String} lockValue
   */
  this.lockStatebyId = function (id, lockValue) {

  }

  return this
}
