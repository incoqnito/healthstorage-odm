// import RequestHandler from './handler/request'
const HS_REQUEST = require('./handler/hsRequest.js')

module.exports = HsModel

/** HS Model */
function HsModel (sdo) {
  /** Check if sdo is defined */
  if (sdo === undefined) throw new Error('Object is not set in HsModel.')

  /**
   * Destroy sdo object
   * @returns
   */
  this.destroy = function () {
    return HS_REQUEST.deleteSdoById(this.md.id)
  }

  /**
   * Update sdo object
   * @param {Object} sdo
   */
  this.update = function (updated) {
    this.save()
    this.mergeFields(updated)
    this.md.r += 1
    return HS_REQUEST.putSdoById(this.md.id, this._dataValues).then(sdo => new HsModel(sdo))
  }

  /**
   * Save sdo
   */
  this.save = function () {
    if (this.revision === undefined) this.revision = {}
    var timestamp = new Date().getTime()
    var copyFromThis = this._dataValues
    this.revision[timestamp] = copyFromThis
    console.log(this)
  }

  /**
   * Lock sdo object
   * @returns {Object}
   */
  this.lock = function () {
    return HS_REQUEST.postLockById(this.md.id).then(lockValue => {
      this.mergeFields({ 'lockValue': lockValue })
      return new HsModel(this)
    })
  }

  /**
   * Delock sdo object
   * @returns {Object}
   */
  this.unlock = function () {
    return HS_REQUEST.deleteLockById(this.md.id, this.lockValue).then(response => {
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
