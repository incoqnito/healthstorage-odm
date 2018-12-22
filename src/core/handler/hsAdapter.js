/** Import adapter */
const HS_STORAGE = require('./adapter/hsStorage.js')

module.exports = class HsAdapter {
  /**
   * Construct
   * @param {Object} client client object
   */
  constructor (client) {
    var hsAdapter = null
    switch (client.adapter) {
      case 'hsStorageAdapter':
        hsAdapter = new HS_STORAGE(client)
        break
      case 'hsSqlAdapter':
        console.log('HS SqlAdapter needs to be implementent')
        break
      default:
        hsAdapter = new HS_STORAGE(client)
        break
    }
    return hsAdapter
  }
}
