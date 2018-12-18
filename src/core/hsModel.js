/** Constants */
const ASSIGN_TO_CLASS = ['HsRequest']

/** Export module */
module.exports = class HsModel {
  /**
   * Construct
   * @param {Object} opts instance object
   */
  constructor (object) {
    if (object === undefined) throw new Error('No options provided for HsModel')
    this._dataValues = {}
    this.initProperties(object)
    console.log(this)
  }

  get ASSIGN_TO_CLASS () {
    return ASSIGN_TO_CLASS
  }

  /**
   * Init properties of instance
   * @param {Object} properties instance properties
   */
  initProperties (properties) {
    for (let field in properties) {
      if (ASSIGN_TO_CLASS.indexOf(field) <= -1) {
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
   * @param {Object} sdo
   * @returns {Mixed}
   */
  returnModel (sdo) {
    var model = new HsModel(sdo)
    model.HsRequest = this.HsRequest
    return model
  }

  /**
   * Save data of instance manually
   * @param {Object} client client object
   * @returns {Instance} HS_REQUEST
   */
  save () {
    return this.update()
  }

  /**
   * Update instance data
   * @returns {Instance} HsModel
   */
  update () {
    this.md.r += 1
    return this.HsRequest.putSdoById(this.md.id, this._dataValues).then(sdo => this.returnModel(sdo))
  }

  /**
   * Lock sdo object
   * @returns {Object}
   */
  lock () {
    return this.HsRequest.postLockById(this.md.id).then(lockValue => {
      console.log(lockValue)
      return this
    })
  }

  /**
   * Delock sdo object
   * @returns {Object}
   */
  unlock () {
    return this.HsRequest.deleteLockById(this.md.id, this.lockValue).then(response => {
      console.log(response)
      return this
    })
  }

  /**
   * Check is locked sdo object
   * @returns {Object}
   */
  isLocked () {
    console.log('Check if sdo is locked')
  }

  /**
   * Destroy instance
   * @returns {Object} object
   */
  destroy () {
    return this.HsRequest.deleteSdoById(this.md.id)
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
}
