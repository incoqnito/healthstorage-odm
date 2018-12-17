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
   * Init properties of instance
   * @param {Object} properties instance properties
   */
  initProperties (properties) {
    for (var field in properties) {
      if (typeof this[field] !== 'function') {
        this[field] = properties[field]
      }
    }
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
    return this.HsRequest.putSdoById(this.md.id, this).then(sdo => new HsModel(sdo))
  }

  /**
   * Lock sdo object
   * @returns {Object}
   */
  lock () {
    return this.HsRequest.postLockById(this.md.id).then(lockValue => {
      console.log(lockValue)
      return new HsModel(this)
    })
  }

  /**
   * Delock sdo object
   * @returns {Object}
   */
  unlock () {
    return this.HsRequest.deleteLockById(this.md.id, this.lockValue).then(response => {
      console.log(response)
      return new HsModel(this)
    })
  }

  /**
   * Destroy instance
   * @returns {Object} object
   */
  destroy () {
    return this.HsRequest.deleteSdoById(this.md.id)
  }

  /**
   * Merge object and field => value pairs
   * @param {Object} merge
   */
  mergeFields (merge) {
    if (merge === undefined) throw new Error('Provide object to merge fields into')
    for (var field in merge) {
      if (this[field] !== undefined) {
        this[field] = merge[field]
      }
    }
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
