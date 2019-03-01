
/** Import modules */
const HS_MODEL = require('./hsModel.js')
const HS_BLOB = require('./hsBlob.js')
const HS_SCHEMA = require('./handler/hsSchema.js')
const HS_ADAPTER = require('./handler/hsAdapter.js')

/** Get constants */
const ASC = 'Ascending'
const DESC = 'Descending'
const MD_ID = 'id'
const MD_REVISION = 'r'
const MD_DATE = 'tsp'
const BLOB_DIVIDE = "Content-Disposition: attachment; filename={fileRef}; filename*=utf-8''{fileRef}"

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
        let model = this.returnModel(response.body[sdo])
        let lockValue = model.getLockFromLocalStorage()
        model.lockValue = lockValue !== null ? JSON.parse(lockValue) : null
        list.push(model)
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
    return this.HsAdapter.getSdo({id: id}).then(sdo => {
      let model = this.returnModel(sdo)
      let lockValue = model.getLockFromLocalStorage()
      model.lockValue = lockValue !== null ? JSON.parse(lockValue) : null
      return model
    })
  }

  /**
   * Get blob by identifier
   * @param {String} id
   * @returns {Promise}
   */
  findBlobById (id) {
    return this.HsAdapter.getSdoBlob({id: id}).then(blob => {
        return blob
    })
  }

  /**
   * Get blob by identifier
   * @param {String} id
   * @returns {Promise}
   */
  findBlobFileById (id, blobId) {
    return this.HsAdapter.getSdoBlobFile({id: id, blobId: blobId}).then(blob => {
        return blob
    })
  }

  /**
   * Create a new sdo for given schema
   * @param {Object} data
   * @returns {Promise}
   * @issue API not returns created object, workaround implemented for sdo and sdoBlob
   */
  create (data) {
    data = Object.assign(data, {md: this.HsSchema.generateMd()})

    let files = null
    if(data.files !== undefined && data.files.length >= 0) {
      files = data.files
      delete data.files
    }

    return this.HsAdapter.validateSdo(data).then(validated => {
      if (validated) {
        if(files === null) {
          return this.HsAdapter.createSdo(data).then(sdo => this.returnModel(sdo))
        } else {
          data['files'] = files
          let hsBlob = this.sdoBlobBridge(data)
          return this.HsAdapter.createSdoBlob(hsBlob.blobFormData).then(sdo => this.returnModel({
              ...data,
              'blobRefs': hsBlob._dataValues.sdo.blobRefs
            }
          ))
        }
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
    return this.HsAdapter.sdoHasChanged(id, r).then(response => response)
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

    let files = null
    if(data.files !== undefined && data.files.length >= 0) {
      files = data.files
      delete data.files
    }

    return this.HsAdapter.validateSdo(data).then(validated => {
      if (validated) {
        if(files !== null) {
          return this.HsAdapter.editSdo(data).then(sdo => this.returnModel(sdo))
        } else {
          data['files'] = files
          let hsBlob = this.sdoBlobBridge(data)
          return this.HsAdapter.updateSdoBlob(hsBlob.blobFormData).then(sdo => this.returnModel(
            {
              ...data,
              'blobRefs': hsBlob._dataValues.sdo.blobRefs
            }
          ))
        }
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
    return this.HsAdapter.lockItem(id).then(lockValue => lockValue)
  }

  /**
   * Lock object by its identifier
   * @param {String} id
   * @returns {Object} lockValue
   */
  unlockById (id, lockValueId) {
    return this.HsAdapter.unlockItem(id, lockValueId)
  }

  /**
   * Get lock value on sdo by its identifier and lock value
   * @param {String} sdoId
   * @param {String} lockValue
   */
  getLockDataById (sdoId, lockValueId) {
    return this.HsAdapter.getLockData(sdoId, lockValueId)
  }

  /**
   * Check if sdo is locked
   * @param {String} sdoId
   * @param {String} lockValue
   */
  isLockedById (sdoId, lockValueId) {
    return this.HsAdapter.isLockedItem(sdoId, lockValueId)
  }

  /**
   * Check if sdo exists with lock State
   * @param {String} sdoId
   * @param {Boolean} lockState
   */
  existsInLockStateById (sdoId, lockState) {
    return this.HsAdapter.existInLockState(sdoId, lockState)
  }

  /**
   * Delete sdo by its identifier
   * @param {String} id
   * @param {Object} data
   */
  deleteById (id) {
    return this.HsAdapter.deleteSdo(id)
  }

  /**
   * Get archive for sdo
   * @param {String} sdoId
   * @param {Integer} pageNo
   * @param {Integer} pageSize
   * @returns {Promise}
   */
  getArchiveBySdoId (sdoId, pageNo = 1, pageSize = 10) {
    return this.HsAdapter.getSdoArchive(sdoId, pageNo, pageSize)
  }

  /**
   * Get archive for sdo
   * @param {String} sdoId
   * @returns {Promise}
   */
  getRevisionsArchiveBySdoId (sdoId) {
    return this.HsAdapter.getSdoRevisionsArchive(sdoId)
  }

  /**
   * Create a new sdo for given schema
   * @param {Object} data
   * @returns {Promise}
   */
  createBlob (sdoBlob) {
    let sdo = JSON.parse(sdoBlob.getAll('sdo'))
    sdo['md'] = this.HsSchema.generateMd()
    return this.HsAdapter.validateSdo(sdo).then(validated => {
      if (validated) {
        sdoBlob.set('sdo', JSON.stringify(sdo))
        return this.HsAdapter.createSdoBlob(sdoBlob).then(response => response)
      }
    })
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

  /**
   * Data Bridge for blob creation
   * @param {Object} data 
   */
  sdoBlobBridge(data) {
    return new HS_BLOB(data)
  }
}
