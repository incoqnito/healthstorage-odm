/** Constants */
import { ASSIGN_TO_CLASS } from "./constants/hsConstants"

/** Class */
import HsDebugger from "./lib/hsDebugger"

/** Export module */
class HsModel {
  /**
   * Construct
   * @param {Object} opts instance object
   */
  constructor (opts, debug) {
    if (opts === undefined) throw new Error('No options provided for HsModel')
    this._dataValues = {}
    this._unstored = {}
    this._unstored.debug = debug || false
    this.initProperties(opts)
  }




  /**
   * Create local revision for object
   */
  setRevision () {
    if (this.revision === undefined) this.revision = {}

    var timestamp = new Date().getTime()
    var copyFromThis = Object.assign({}, this._dataValues)

    this.revision[timestamp] = copyFromThis
  }

  /**
   * Get blob file
   * @info currently only one file supported
   */
  getBlobFile() {
    return this.HsAdapter.getSdoBlobFile({id: this.md.id, blobId: this.blobRefs[0]})
  }
}

export default HsModel
