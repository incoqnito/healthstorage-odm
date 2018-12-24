
/** Import modules */
const HS_MODEL = require('./HsModel.js')
const HS_SCHEMA = require('./handler/hsSchema.js')
const HS_ADAPTER = require('./handler/hsAdapter.js')

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
    this.HsAdapter = this.initHsAdapter(opts.client)
  }

  /**
   * Get sort asc type
   * @return {String} ASC
   */
  static get ASC () {
    return ASC
  }

  /**
   * Get sort desc type
   * @return {String} DESC
   */
  static get DESC () {
    return DESC
  }

  /**
   * Get meta id type
   * @return {String} MD_ID
   */
  static get MD_ID () {
    return MD_ID
  }

  /**
   * Get meta revision type
   * @return {String} MD_REVISION
   */
  static get MD_REVISION () {
    return MD_REVISION
  }

  /**
   * Get meta date type
   * @return {String} MD_DATE
   */
  static get MD_DATE () {
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
   * @returns {Instance} HS_ADAPTER
   */
  initHsAdapter (client) {
    return new HS_ADAPTER(client)
  }

  /**
   * Return new instance of model
   * @param {Object} mdoel HS_MODEL
   */
  returnModel (object) {
    var model = new HS_MODEL(object)
    model.HsAdapter = this.HsAdapter
    return model
  }

  /**
   * Get all sdos from owner and schema
   * @param {Object} data
   * @returns {Promise}
   */
  findAll (options) {
    return this.HsAdapter.getSdos(this.HsSchema.props.oId, this.HsSchema.props.id, options).then(response => {
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
   * Get sdo by where
   * @param {String} id
   * @returns {Promise}
   */
  findOne (where) {
    console.log('Will search sdos for given where')
  }

  /**
   * Get sdo by identifier
   * @param {String} id
   * @returns {Promise}
   */
  findById (id) {
    return this.HsAdapter.getSdoById(id).then(sdo => this.returnModel(sdo))
  }

  /**
   * Create a new sdo for given schema
   * @param {Object} data
   * @returns {Promise}
   */
  create (data) {
    data = Object.assign(data, {md: this.HsSchema.generateMd()})
    return this.HsAdapter.validateSdo(data).then(validated => {
      if (validated) {
        return this.HsAdapter.createSdo(data).then(sdo => this.returnModel(sdo))
      }
    })
  }

  /**
   * Check if sdo changed since specified item
   * @param {String} id sdo identifier
   * @param {String} r sdo revision
   * @returns {Promise}
   */
  changedSince (id, r) {
    return this.HsAdapter.headSdoChangedSinced(id, r).then(response => console.log(response))
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
  updateById (data) {
    data.md.r += 1
    return this.HsAdapter.validateSdo(data).then(validated => {
      if (validated) {
        return this.HsAdapter.editSdo(data).then(sdo => this.returnModel(sdo))
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
   * @param {Array} bulkList holds sdos for change
   * @returns {Promise}
   */
  bulkUpdate (bulkList) {
    var collectedSods = []
    for (let sdo in bulkList) {
      bulkList[sdo].md.r += 1
      collectedSods.push(bulkList[sdo]._dataValues)
    }
    return this.HsAdapter.editSdosBulk(collectedSods).then(response => response)
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
  lockById (id) {
    return this.HsAdapter.postLockById(id).then(lockValue => lockValue)
  }

  /**
   * Lock object by its identifier
   * @param {String} id
   * @returns {Object} lockValue
   */
  unlockById (id, lockValueId) {
    return this.HsAdapter.deleteLockById(id, lockValueId)
  }

  /**
   * Get lock value on sdo by its identifier and lock value
   * @param {String} id
   * @param {String} lockValue
   */
  getLockById (id, lockValueId) {
    return this.HsAdapter.getLockById(id, lockValueId)
  }

  /**
   * Check if sdo is locked
   * @param {String} id
   * @param {String} lockValue
   */
  isLockedById (id, lockValue) {
    console.log('Check if the sdo is locked or not')
  }

  /**
   * Check if sdo exists with lock State
   * @param {String} id
   * @param {Boolean} lockState
   */
  isLockStateById (id, lockState) {
    console.log('Check if the sdo exists with lock state')
  }

  /**
   * Delete sdo by its identifier
   * @param {String} id
   * @param {Object} data
   */
  deleteById (id) {
    return this.HsAdapter.deleteSdoById(id)
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
