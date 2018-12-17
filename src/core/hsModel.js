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
      if (typeof this[field] !== 'function') this[field] = properties[field]
    }
  }

  /**
   * Dynamic get/set for properties
   * @param {String} fldName
   * @param {Object} self
   */
  setGetDataValues (fldName) {
    Object.defineProperty(this, fldName, {
      get: function () {
        return this._dataValues[fldName]
      },
      set: function (newValue) {
        // this.setRevision()
        this._dataValues[fldName] = newValue
      }
    })
  }

  /**
   * Save data of instance manually
   * @param {Object} client client object
   * @returns {Instance} HS_REQUEST
   */
  save () {
    this.update()
  }

  /**
   * Update instance data
   * @returns {Instance} HsModel
   */
  update () {
    this.md.r += 1
    return this.HsRequest.putSdoById(this.md.id, this._dataValues).then(s => new HsModel(this, this.client))
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
}

// module.exports = HsModel

// /** HS Model */
// function HsModel (sdo, client) {
//   /**
//    * Revision todo
//    */
//   this.setRevision = function () {
//     if (this.revision === undefined) this.revision = {}

//     var timestamp = new Date().getTime()
//     var copyFromThis = Object.assign({}, this._dataValues)

//     this.revision[timestamp] = copyFromThis
//   }

//   /**
//    * Lock sdo object
//    * @returns {Object}
//    */
//   this.lock = function () {
//     return HsRequest.postLockById(this.md.id).then(lockValue => {
//       mergeFields({ 'lockValue': lockValue }, this)
//       return new HsModel(this, client)
//     })
//   }

//   /**
//    * Delock sdo object
//    * @returns {Object}
//    */
//   this.unlock = function () {
//     return HsRequest.deleteLockById(this.md.id, this.lockValue).then(response => {
//       mergeFields({ 'lockValue': '' }, this)
//       return new HsModel(this, client)
//     })
//   }

// }
