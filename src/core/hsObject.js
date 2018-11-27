import RequestHandler from './handler/request';
import Helper from './lib/helper';

class HsObject
{
  /**
   * Consturctor
   * @param {String} sdo 
   */
  constructor(sdo) {
    this.destroy = this.destroy;
    this.update = this.update;
    this.init(sdo);
  }

  /**
   * Init properties
   * @param {Promise} sdo 
   */
  init(sdo) {
    for(var field in sdo) {
      this[field] = sdo[field];
    }
  }

  /**
   * Destroy sdo object
   * @returns 
   */
  destroy() {
    return RequestHandler.deleteSdoById(this.md.id);
  }

  /**
   * Update sdo object
   * @param {Object} sdo 
   */
  update(sdo) {
    this.md.r += 1;
    sdo.md.r = this.md.r;
    return RequestHandler.putSdoById(this.md.id, sdo).then(sdo => new HsObject(sdo));
  }
}
export default HsObject;
