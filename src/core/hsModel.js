/** Constants */
import { ASSIGN_TO_CLASS } from "./constants/hsConstants"

/** Class */
import HsDebugger from "./lib/hsDebugger"

/** Export module */
class HsModel {
  /**
   * Construct
   * @param {Object} opts instance object
   */
  constructor (opts, debug) {
    if (opts === undefined) throw new Error('No options provided for HsModel')
    this._dataValues = {}
    this._unstored = {}
    this._unstored.debug = debug || false
    this.initProperties(opts)
  }

  /**
   * Get assign to class properties
   * @returns {Array}
   */
  get ASSIGN_TO_CLASS () {
    return ASSIGN_TO_CLASS
  }

  /**
   * Init properties of instance
   * @param {Object} properties instance properties
   */
  initProperties (properties) {
    for (let field in properties) {
      if (this.ASSIGN_TO_CLASS.indexOf(field) <= -1) {
        this._dataValues[field] = properties[field]
      } else {
        this[field] = properties[field]
      }
    }

    for (let key in this._dataValues) {
      Object.defineProperty(this, key, {
        get: function () { return this._dataValues[key] },
        set: function (value) {
          if (this._dataValues[key] !== value) {
            this.setRevision()
            this._dataValues[key] = value
          }
        }
      })
    }
  }

  /**
   * Return extended model
   * @param {Object} item
   * @returns {Mixed}
   */
  returnModel (item) {
    var model = new HsModel(item, this._unstored.debug)
    if(this._unstored.debug) HsDebugger.logConsole("HsModel.returnModel", model, true)
    model.HsAdapter = this.HsAdapter
    return model
  }

  /**
   * Save data of instance manually
   * @param {Object} client client object
   * @returns {Instance} HS_ADAPTER
   */
  save () {
    return this.update()
  }

  /**
   * Check if sdo changed since
   * @returns {Promise}
   */
  changedSince () {
    return this.HsAdapter.sdoHasChanged(this._dataValues.md.id, this._dataValues.md.r).then(changedSince => {
      if(this._unstored.debug) HsDebugger.logConsole("HsModel.changedSince", changedSince, true)
      return changedSince
    })
  }

  /**
   * Update instance data
   * @returns {Instance} HsModel
   */
  update () {
    this.md.r += 1

    if(this._unstored.debug) HsDebugger.logConsole("HsModel.update", changedSince, true)

    if(this._dataValues.blobRefs === undefined && this._dataValues.blobRefs.length <= 0) {
      return this.HsAdapter.editSdo(this._dataValues).then(sdo => this.returnModel(sdo))
    } else {
      return this.HsAdapter.editSdoBlob(this._dataValues).then(sdo => this.returnModel(sdo))
    }
  }

  /**
   * Lock sdo object
   * @returns {Object}
   */
  lock () {
    return this.HsAdapter.lockItem(this._dataValues.md.id).then(lockValue => {

      if(this._unstored.debug) HsDebugger.logConsole("HsModel.lock", lockValue, true)

      this.lockValue = lockValue
      return this.returnModel(this._dataValues)
    })
  }

  /**
   * Unlock sdo object
   * @returns {Object}
   */
  unlock () {
    return this.HsAdapter.unlockItem(this._dataValues.md.id, this.lockValue.value).then(response => {

      if(this._unstored.debug) HsDebugger.logConsole("HsModel.unlock", response, true)

      if (response) this.lockValue = null
      return this.returnModel(this._dataValues)
    })
  }

  /**
   * Get locked from local storage
   * @returns {Object} localStroage item
   */
  getLockFromLocalStorage () {
    return window.localStorage.getItem('LOCKED_' + this.md.id) || null
  }

  /**
   * Get locked
   * @returns {Object}
   */
  getLock () {
    return this.HsAdapter.getLockData(this.md.id, this.lockValue.value).then(response => {
      if(this._unstored.debug) HsDebugger.logConsole("HsModel.getLock", response, true)
      return response
    })
  }

  /**
   * Check is locked sdo object
   * @returns {Object}
   */
  isLocked () {
    if (this.lockValue !== undefined && this.lockValue !== null) {
      return this.HsAdapter.isLockedItem(this.md.id, this.lockValue.value).then(response => {
        if(this._unstored.debug) HsDebugger.logConsole("HsModel.isLocked", response, true)
        return response
      })
    } else {
      return false
    }
  }

  /**
   * Check sdo exists with lock state
   * @returns {Object}
   */
  existInLockState (lockState = true) {
    return this.HsAdapter.existInLockState(this.md.id, lockState).then(response => {
      if(this._unstored.debug) HsDebugger.logConsole("HsModel.existInLockState", response, true)
      return response
    })
  }

  /**
   * Destroy instance
   * @returns {Object} object
   */
  destroy () {
    return this.HsAdapter.deleteSdo(this.md.id).then(deletedSdo => {
      if(this._unstored.debug) HsDebugger.logConsole("HsModel.destroy", deletedSdo, true)
      return deletedSdo
    })
  }

  /**
   * Create local revision for object
   */
  setRevision () {
    if (this.revision === undefined) this.revision = {}

    var timestamp = new Date().getTime()
    var copyFromThis = Object.assign({}, this._dataValues)

    this.revision[timestamp] = copyFromThis
  }

  /**
   * Get archive for sdo
   */
  getArchive (pageNo = 1, pageSize = 10) {
    return this.HsAdapter.getSdoArchive(this.md.id, pageNo, pageSize)
  }

  /**
   * Get archived revision numbers for sdo
   */
  getArchiveRevisionNumbers () {
    return this.HsAdapter.getSdoRevisionsArchive(this.md.id)
  }

  /**
   * Get blob file
   * @info currently only one file supported
   */
  getBlobFile() {
    return this.HsAdapter.getSdoBlobFile({id: this.md.id, blobId: this.blobRefs[0]})
  }
}

export default HsModel
