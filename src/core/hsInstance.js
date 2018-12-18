
/** Import modules */
const HS_MODEL = require('./HsModel.js')
const HS_SCHEMA = require('./handler/hsSchema.js')
const HS_REQUEST = require('./handler/hsRequest.js')

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
    if (opts === undefined) throw new Error('No instance options provided for HsInstance')
    this.HsSchema = this.buildSchema(opts)
    this.HsRequest = this.initHsRequest(opts.client)
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
   * @returns {Instance} HS_SCHEMA
   */
  buildSchema (schemaProps) {
    return new HS_SCHEMA(schemaProps)
  }

  /**
   * Create request instance for client
   * @param {Object} client client object
   * @returns {Instance} HS_REQUEST
   */
  initHsRequest (client) {
    return new HS_REQUEST(client)
  }

  /**
   * Return new instance of model
   * @param {Object} mdoel HS_MODEL
   */
  returnModel (object) {
    var model = new HS_MODEL(object)
    model.HsRequest = this.HsRequest
    return model
  }

  /**
   * Get all sdos from owner and schema
   * @param {Object} data
   * @returns {Promise}
   */
  findAll (options) {
    return this.HsRequest.getSdoByIds(this.HsSchema.props.oId, this.HsSchema.props.id, options).then(response => {
      var list = []
      for (var sdo in response.body) {
        list.push(this.returnModel(response.body[sdo]))
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
  findById (id) {
    return this.HsRequest.getSdoById(id).then(sdo => this.returnModel(sdo))
  }

  /**
   * Create schema
   * @returns {Promise}
   */
  createSchema () {
    return this.HsRequest.postSchema(this.HsSchema.schema)
  }

  /**
   * Create a new sdo for given schema
   * @param {Object} data
   * @returns {Promise}
   */
  create (data) {
    data = Object.assign(data, {md: this.HsSchema.generateMd()})
    return this.HsRequest.validateSdo(data).then(validated => {
      if (validated) {
        return this.HsRequest.postSdo(data).then(sdo => this.returnModel(sdo))
      }
    })
  }

  /**
   * Bulk create sdos
   */
  bulkCreate (bulkList) {
    console.log('Bulk create sdos')
  }

  /** Update sdo by its identifier
   * @param {String} id
   * @param {Object} data
   */
  updateById (id, data) {
    data.md.r += 1
    return this.HsRequest.validateSdo(data).then(validated => {
      if (validated) {
        return this.HsRequest.putSdoById(id, data).then(sdo => this.returnModel(sdo))
      }
    })
  }

  /**
   * Update sdos by given where
   */
  update (where, data) {
    console.log('Update sdo by where')
  }

  /**
   * Bulk update sdos
   */
  bulkUpdate (bulkList) {
    console.log('Bulk update sdos')
  }

  /**
   * Archive sdo by its identifier
   */
  archiveById (id) {
    console.log('Archive sdo by its identifier')
  }

  /**
   * Archive sdos by given where
   */
  archive (where) {
    console.log('Archive sdos by where')
  }

  /**
   * Lock object by its identifier
   * @param {String} id
   * @returns {Object} lockValue
   */
  lock (id) {
    return this.HsRequest.postLockById(id).then(lockValue => lockValue)
  }

  /**
   * Lock object by its identifier
   * @param {String} id
   * @returns {Object} lockValue
   */
  unlock (id, lockValueId) {
    return this.HsRequest.deleteLockById(id, lockValueId)
  }

  /**
   * Get lock value on sdo by its identifier and lock value
   * @param {String} id
   * @param {String} lockValue
   */
  getLock (id, lockValueId) {
    return this.HsRequest.getLockById(id, lockValueId)
  }

  /**
   * Delete sdo by its identifier
   * @param {String} id
   * @param {Object} data
   */
  deleteById (id) {
    return this.HsRequest.deleteSdoById(id)
  }

  /**
   * Delete sdos by filter
   */
  delete () {
    console.log('Delete sdos by where')
  }

  /**
   * Find meta fields
   * @param {String} key meta field key
   * @returns {String}
   */
  findMetaField (key) {
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
}
