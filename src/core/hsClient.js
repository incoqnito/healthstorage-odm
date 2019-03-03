/** Import modules */
import HsInstance from "./hsInstance"

/** Export module */
class HsClient {
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
   * @returns {Instance} hsInstance
   */
  define (opts) {
    opts.client = this.client
    return new HsInstance(opts)
  }
}

export default HsClient
