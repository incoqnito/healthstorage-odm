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

  destroy() {
    // destroy
  }

  update() {
    // update
  }
}
export default HsObject;
