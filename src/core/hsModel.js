// import RequestHandler from './handler/request'
const HS_REQUEST = require('./handler/hsRequest.js')

module.exports = HsModel

/** HS Model */
function HsModel (sdo) {
  /** Check if sdo is defined */
  if (sdo === undefined) throw new Error('Object is not set in HsModel.')

  /** Request */
  this.HsRequest = new HS_REQUEST({})

  /**
   * Destroy sdo object
   * @returns
   */
  this.destroy = function () {
    return this.HsRequest.deleteSdoById(this.md.id)
  }

  /**
   * Update sdo object
   * @param {Object} sdo
   */
  this.update = function () {
    this.md.r += 1
    return this.HsRequest.putSdoById(this.md.id, this._dataValues).then(sdo => this)
  }

  /**
   * Save sdo
   */
  this.save = function () {
    return this.update()
  }

  /**
   * Revision todo
   */
  this.setRevision = function () {
    if (this.revision === undefined) this.revision = {}

    var timestamp = new Date().getTime()
    var copyFromThis = Object.assign({}, this._dataValues)

    this.revision[timestamp] = copyFromThis
  }

  /**
   * Lock sdo object
   * @returns {Object}
   */
  this.lock = function () {
    return this.HsRequest.postLockById(this.md.id).then(lockValue => {
      this.mergeFields({ 'lockValue': lockValue })
      return new HsModel(this)
    })
  }

  /**
   * Delock sdo object
   * @returns {Object}
   */
  this.unlock = function () {
    return this.HsRequest.deleteLockById(this.md.id, this.lockValue).then(response => {
      this.mergeFields({ 'lockValue': '' })
      return new HsModel(this)
    })
  }

  /**
   * Merge object and field => value pairs
   * @param {Object} merge
   */
  this.mergeFields = function (merge) {
    if (merge === undefined) throw new Error('Provide object to merge fields into')

    for (var field in merge) {
      if (this[field] !== undefined) {
        this[field] = merge[field]
      }
    }
  }

  /** Init properties */
  for (var field in sdo) {
    if (typeof this[field] !== 'function') this[field] = sdo[field]
  }

  /** Meta */
  this._dataValues = {}

  /**
   * Set dynamic get/set for properties
   * @param {String} fldName
   */
  this.setGetDataValues = function (fldName) {
    Object.defineProperty(this, fldName, {
      get: function () {
        return this._dataValues[fldName]
      },
      set: function (newValue) {
        this.setRevision()
        this._dataValues[fldName] = newValue
      }
    })
  }

  /** Loop through properties */
  for (var fld in sdo) {
    if (fld === '_dataValues' || typeof fld === 'function') return
    this._dataValues[fld] = this[fld]
    this.setGetDataValues(fld)
  }
}
