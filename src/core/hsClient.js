/** Export module */
module.exports = HsClient

/** HealthStorageODM */
function HsClient (opts) {
  /** Check if options are set */
  if (opts === undefined) throw new Error('No options provided for client')
  if (opts.clientUrl === undefined) throw new Error('No client url provided')
  if (opts.serverUrl === undefined) throw new Error('No api url provided')

  this.HsClient = {}

  /** Set axios */
  this.HsClient.clientUrl = opts.clientUrl
  this.HsClient.serverUrl = opts.serverUrl
}
