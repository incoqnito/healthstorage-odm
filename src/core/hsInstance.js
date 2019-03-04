
/** Import modules */
import HsModel from './hsModel'
import HsBlob from './hsBlob'
import HsAdapter from "./handler/hsAdapter"
import HsSchema from "./handler/hsSchema"
import HsDebugger from "./lib/hsDebugger"

/** Get constants */
import { ASC } from "./constants/hsConstants"
import { DESC } from "./constants/hsConstants"
import { MD_ID } from "./constants/hsConstants"
import { MD_REVISION } from "./constants/hsConstants"
import { MD_DATE } from "./constants/hsConstants"

class HsInstance {
  /**
   * Construct
   * @param {Object} opts instance object
   */
  constructor (opts) {
    if (opts === undefined) throw new Error('No instance options provided for HsInstance')
    
    this.HsSchema = this.buildSchema(opts)
    this.HsAdapter = this.initHsAdapter(opts.client)
  
    this.debug = opts.client.debug || false
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
   * @returns {Instance} HsSchema
   */
  buildSchema (schemaProps) {
    return new HsSchema(schemaProps)
  }

  /**
   * Create request instance for client
   * @param {Object} client client object
   * @returns {Instance} HsAdapter
   */
  initHsAdapter (client) {
    return new HsAdapter(client)
  }

  /**
   * Return new instance of model
   * @param {Object} mdoel HsModel
   */
  returnModel (object) {
    var model = new HsModel(object, this.debug)
    if(this.debug) HsDebugger.logConsole("HsInstance.returnModel", model, true)
    model.HsAdapter = this.HsAdapter
    return model
  }

  /**
   * Get schemas
   * @param {Object} opts
   * @returns {Promise}
   */
  findAllSchemas (opts) {
    return HsAdapter.getSchemas(opts.ids.join(','))
  }

  /**
   * Get schema by identifier
   * @param {Object} opts
   * @returns {Promise}
   */
  findSchemaById (opts) {
    return HsAdapter.getSchema(opts.id)
  }

  /**
   * Create schema
   * @returns {Promise}
   */
  createSchema (opts) {
    var HsSchema = new HsSchema(opts)
    return HsAdapter.createSchema(HsSchema.schema)
  }

  /**
   * Delete schema
   * @param {String} id
   * @returns {Promise}
   */
  deleteSchema (id) {
    return HsAdapter.deleteSchema(id)
  }

  /**
   * Get all sdos from owner and schema
   * @param {Object} data
   * @returns {Promise}
   */
  findAll (options) {
    return this.HsAdapter.getSdos(this.HsSchema.props.oId, this.HsSchema.props.id, options).then(response => {
      var list = []
      
      if(this.debug) HsDebugger.logConsole("HsInstance.findAll", response, true)

      for (var sdo in response.body) {
        let model = this.returnModel(response.body[sdo])
        let lockValue = model.getLockFromLocalStorage()
        model.lockValue = lockValue !== null ? JSON.parse(lockValue) : null
        list.push(model)
      }

      if(this.debug) HsDebugger.logTable(list)

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

      if(this.debug) HsDebugger.logConsole("HsInstance.findById", sdo, true)

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
        if(this.debug) HsDebugger.logConsole("HsInstance.findBlobById", blob)
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
        if(this.debug) HsDebugger.logConsole("HsInstance.findBlobFileById", sdo, true)
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

    if(this.debug) HsDebugger.logConsole("HsInstance.create", data, true)

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
    return this.HsAdapter.sdoHasChanged(id, r).then(response => {
      if(this.debug) HsDebugger.logConsole("HsInstance.changedSince", response, true)
      return response
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
  updateById (data) {
    data.md.r += 1

    if(this.debug) HsDebugger.logConsole("HsInstance.changedSince", data, true)

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
    return this.HsAdapter.editSdosBulk(collectedSods).then(response => {
      if(this.debug) HsDebugger.logConsole("HsInstance.bulkUpdate", response, true)
      return response
    })
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
    return this.HsAdapter.lockItem(id).then(lockValue => {
      if(this.debug) HsDebugger.logConsole("HsInstance.lockById", lockValue, true)
      return lockValue
    })
  }

  /**
   * Lock object by its identifier
   * @param {String} id
   * @returns {Object} lockValue
   */
  unlockById (id, lockValueId) {
    return this.HsAdapter.unlockItem(id, lockValueId).then(response => {
      if(this.debug) HsDebugger.logConsole("HsInstance.unlockById", response, true)
      return response !== undefined
    })
  }

  /**
   * Get lock value on sdo by its identifier and lock value
   * @param {String} sdoId
   * @param {String} lockValue
   */
  getLockDataById (sdoId, lockValueId) {
    return this.HsAdapter.getLockData(sdoId, lockValueId).then(response => {
      if(this.debug) HsDebugger.logConsole("HsInstance.getLockDataById", response, true)
      return response
    })
  }

  /**
   * Check if sdo is locked
   * @param {String} sdoId
   * @param {String} lockValue
   */
  isLockedById (sdoId, lockValueId) {
    return this.HsAdapter.isLockedItem(sdoId, lockValueId).then(response => {
      if(this.debug) HsDebugger.logConsole("isLockedById", response, true)
      return response
    })
  }

  /**
   * Check if sdo exists with lock State
   * @param {String} sdoId
   * @param {Boolean} lockState
   */
  existsInLockStateById (sdoId, lockState) {
    return this.HsAdapter.existInLockState(sdoId, lockState).then(response => {
      if(this.debug) HsDebugger.logConsole("HsInstance.existsInLockStateById", response, true)
      return response
    })
  }

  /**
   * Delete sdo by its identifier
   * @param {String} id
   * @param {Object} data
   */
  deleteById (id) {
    return this.HsAdapter.deleteSdo(id).then(response => {
      if(this.debug) HsDebugger.logConsole("HsInstance.deleteById", response, true)
      return response
    })
  }

  /**
   * Get archive for sdo
   * @param {String} sdoId
   * @param {Integer} pageNo
   * @param {Integer} pageSize
   * @returns {Promise}
   */
  getArchiveBySdoId (sdoId, pageNo = 1, pageSize = 10) {
    return this.HsAdapter.getSdoArchive(sdoId, pageNo, pageSize).then(response => {
      if(this.debug) HsDebugger.logConsole("HsInstance.getArchiveBySdoId", response, true)
      return response
    })
  }

  /**
   * Get archive for sdo
   * @param {String} sdoId
   * @returns {Promise}
   */
  getRevisionsArchiveBySdoId (sdoId) {
    return this.HsAdapter.getSdoRevisionsArchive(sdoId).then(response => {
      if(this.debug) HsDebugger.logConsole("HsInstance.getRevisionsArchiveBySdoId", response, true)
      return response
    })
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
        return this.HsAdapter.createSdoBlob(sdoBlob).then(response => {
          if(this.debug) HsDebugger.logConsole("createBlob", response, true)
          return response
        })
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
    return new HsBlob(data)
  }
}

export default HsInstance
