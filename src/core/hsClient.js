/** Import modules */
import HsModel from "./hsModel"
import HsSchema from "./handler/hsSchema"
import HsAdapter from "./handler/hsAdapter"

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
    HsModel.instance(new HsSchema(opts), new HsAdapter(this.client))
    return HsModel
  }
}

export default HsClient
