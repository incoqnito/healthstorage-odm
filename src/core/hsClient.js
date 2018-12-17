/** Import modules */
const HS_INSTANCE = require('./hsInstance.js')

/** Export module */
module.exports = class HsClient {
  /**
   * Constructor
   * @param {Object} client client object
   */
  constructor (client) {
    this.serverUrl = client.serverUrl
  }

  /**
   * Static define
   * @param {Object} opts define object
   * @returns {Instance} HealthStorgaeODM instace
   */
  define (opts) {
    console.log('HsClient define fired.')
    return new HS_INSTANCE(opts)
  }
}
