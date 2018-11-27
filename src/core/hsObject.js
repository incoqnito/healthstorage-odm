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

  update(updatedSdo) {
    console.log(updatedSdo)
    // return RequestHandler.putSdoById(id, updatedSdo).then(sdo => {
    //   return new HsObject(sdo);
    // });
  }
}
export default HsObject;
