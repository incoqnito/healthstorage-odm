/** Constants */
const ASSIGN_TO_CLASS = ['HsAdapter']

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
  changedSinced () {
    return this.HsAdapter.headSdoChangedSinced(this.md.id, this.md.r).then(changedSince => console.log(changedSince))
  }

  /**
   * Update instance data
   * @returns {Instance} HsModel
   */
  update () {
    this.md.r += 1
    return this.HsAdapter.putSdoById(this.md.id, this._dataValues).then(sdo => this.returnModel(sdo))
  }

  /**
   * Lock sdo object
   * @returns {Object}
   */
  lock () {
    return this.HsAdapter.postLockById(this.md.id).then(lockValue => {
      console.log(lockValue)
      return this
    })
  }

  /**
   * Delock sdo object
   * @returns {Object}
   */
  unlock () {
    return this.HsAdapter.deleteLockById(this.md.id, this.lockValue).then(response => {
      console.log(response)
      return this
    })
  }

  /**
   * Get locked
   * @returns {Object}
   */
  getLock () {
    console.log('Get lock from sdo')
  }

  /**
   * Check is locked sdo object
   * @returns {Object}
   */
  isLocked () {
    console.log('Check if sdo is locked')
  }

  /**
   * Check sdo exists with lock state
   * @returns {Object}
   */
  isLockState () {
    console.log('Check if sdo exists with lock state')
  }

  /**
   * Destroy instance
   * @returns {Object} object
   */
  destroy () {
    return this.HsAdapter.deleteSdoById(this.md.id)
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
