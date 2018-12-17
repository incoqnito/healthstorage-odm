/** Import modules */
const HS_INSTANCE = require('./hsInstance.js')

/** Export module */
module.exports = class HsClient {
  /**
   * Constructor
   * @param {Object} client client object
   */
  constructor (client) {
    this.client = client
  }

  /**
   * Static define
   * @param {Object} opts define object
   * @returns {Instance} HS_INSTANCE
   */
  define (opts) {
    opts.client = this.client
    return new HS_INSTANCE(opts)
  }
}
