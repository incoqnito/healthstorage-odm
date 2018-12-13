// import RequestHandler from './handler/request'
const HS_REQUEST = require('./handler/hsRequest.js')

module.exports = HsModel

/** HS Model */
function HsModel (sdo, client) {
  /** Check if sdo is defined */
  if (sdo === undefined) throw new Error('Object is not set in HsModel.')

  /** Request */
  var HsRequest = new HS_REQUEST(client)

  /**
   * Destroy sdo object
   * @returns
   */
  this.destroy = function () {
    return HsRequest.deleteSdoById(this.md.id)
  }

  /**
   * Update sdo object
   * @param {Object} sdo
   */
  this.update = function () {
    this.md.r += 1
    return HsRequest.putSdoById(this.md.id, this._dataValues).then(s => new HsModel(this, client))
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
    return HsRequest.postLockById(this.md.id).then(lockValue => {
      mergeFields({ 'lockValue': lockValue }, this)
      return new HsModel(this, client)
    })
  }

  /**
   * Delock sdo object
   * @returns {Object}
   */
  this.unlock = function () {
    return HsRequest.deleteLockById(this.md.id, this.lockValue).then(response => {
      mergeFields({ 'lockValue': '' }, this)
      return new HsModel(this, client)
    })
  }

  /**
   * Merge object and field => value pairs
   * @param {Object} merge
   */
  function mergeFields (merge, self) {
    if (merge === undefined) throw new Error('Provide object to merge fields into')

    for (var field in merge) {
      if (self[field] !== undefined) {
        self[field] = merge[field]
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
  function setGetDataValues (fldName, self) {
    Object.defineProperty(self, fldName, {
      get: function () {
        return self._dataValues[fldName]
      },
      set: function (newValue) {
        self.setRevision()
        self._dataValues[fldName] = newValue
      }
    })
  }

  /** Loop through properties */
  for (var fld in sdo) {
    if (fld === '_dataValues' || typeof fld === 'function') return
    this._dataValues[fld] = this[fld]
    setGetDataValues(fld, this)
  }
}
