// import RequestHandler from './handler/request'
const HS_REQUEST = require('./handler/hsRequest.js');

module.exports = hsModel;

/** HS Model */
function hsModel(sdo) {

  /** Check if sdo is defined */
  if (sdo === undefined) throw new Error("Object is not set in hsModel.");

  /** Init properties */
  for (var field in sdo) {
    if(typeof this[field] !== 'function') this[field] = sdo[field]
  }

  /**
   * Destroy sdo object
   * @returns
   */
  this.destroy = function() {
    return HS_REQUEST.deleteSdoById(this.md.id);
  }

  /**
   * Update sdo object
   * @param {Object} sdo
   */
  this.update = function(updated) {
    this.mergeFields(updated)
    this.md.r += 1
    return HS_REQUEST.putSdoById(this.md.id, this).then(sdo => new hsModel(sdo))
  }

  /**
   * Lock sdo object
   * @returns
   */
  this.lock = function() {
    return HS_REQUEST.postLockById(this.md.id).then(lockValue => {
      this.mergeFields({'locked': lockValue})
      return new hsModel(this);
    });
  }

  /**
   * Merge object and field => value pairs
   * @param {Object} merge
   */
  this.mergeFields = function(merge) {
    if (merge === undefined) throw new Error('Provide object to merge fields into')
    
    for (var field in merge) {
      if (this[field] !== undefined) {
        this[field] = merge[field]
      }
    }
  }
}
