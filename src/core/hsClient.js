/** Export module */
module.exports = HsClient

/** Client data for development */
const DEVELOP = {
  serverUrl: 'http://localhost:8080'
}

/** HealthStorageODM */
function HsClient (opts) {
  /** Check for options, if not set use development data */
  if (opts === undefined) {
    console.log('No options provided for client. Automatically taken development environment.')
    opts = DEVELOP
  }

  /** Check for server url */
  if (opts.serverUrl === undefined) throw new Error('No server url provided.')

  /** Props */
  this.client = {}

  /** Set server url */
  this.client.serverUrl = opts.serverUrl
}
