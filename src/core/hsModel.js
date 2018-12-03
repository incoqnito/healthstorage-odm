// import RequestHandler from './handler/request'
const RequestHandler = require('./handler/request.js');

class HsModel {
  /**
   * Consturctor
   * @param {String} sdo
   */
  constructor (sdo) {
    this.init(sdo)
  }

  /**
   * Init properties
   * @param {Promise} sdo
   */
  init (sdo) {
    for (var field in sdo) {
      this[field] = sdo[field]
    }
  }

  /**
   * Destroy sdo object
   * @returns
   */
  destroy () {
    return RequestHandler.deleteSdoById(this.md.id)
  }

  /**
   * Update sdo object
   * @param {Object} sdo
   */
  update (updated) {
    this.mergeFields(updated)
    this.md.r += 1
    return RequestHandler.putSdoById(this.md.id, this).then(sdo => new HsModel(sdo))
  }

  /**
   * Merge object and field => value pairs
   * @param {Object} merge
   */
  mergeFields (merge) {
    if (merge === undefined) {
      throw new Error('Provide object to merge fields into')
    }

    for (var field in merge) {
      if (this[field] !== undefined) {
        this[field] = merge[field]
      }
    }
  }
}
export default HsModel
