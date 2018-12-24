/** Import adapter */
const HS_STORAGE = require('./adapter/hsStorage.js')

/** GET type string */
const GET = 'get'
/** POST type string */
const POST = 'post'
/** PATCH type string */
const PATCH = 'patch'
/** PUT type string */
const PUT = 'put'
/** HEAD type string */
const HEAD = 'head'
/** DELETE type string */
const DELETE = 'delete'

module.exports = class HsAdapter {
  /**
   * Construct
   * @param {Object} client client object
   */
  constructor (client) {
    if (client === undefined) throw new Error('No client provided for HsAdapter')
    if (client.adapter === undefined) throw new Error('No adapter provided for HsAdapter')
    this.client = client
    this.adapter = new HS_STORAGE(client)
    console.log(client)

    // var hsAdapter = null
    // switch (client.adapter) {
    //   case 'hsStorageAdapter':
    //     hsAdapter = new HS_STORAGE(client)
    //     break
    //   case 'hsSqlAdapter':
    //     console.log('HS SqlAdapter needs to be implementent')
    //     break
    //   default:
    //     hsAdapter = new HS_STORAGE(client)
    //     break
    // }
    // return hsAdapter
  }

  /**
   * Get GET type string
   * @return {String} GET
   */
  get GET () {
    return GET
  }

  /**
   * Get POST type string
   * @return {String} POST
   */
  get POST () {
    return POST
  }

  /**
   * Get PUT type string
   * @return {String} PUT
   */
  get PUT () {
    return PUT
  }

  /**
   * Get HEAD type string
   * @return {String} HEAD
   */
  get HEAD () {
    return HEAD
  }

  /**
   * Validate sdo against schema adapter mapping
   * @param {Object} sdo
   * @returns {Promise}
   */
  validateSdo (sdo) {
    return this.adapter.validateSdo({
      'requestOptions': {
        'headers': {
          'responseType': 'application/json',
          'Content-Type': 'application/json'
        }
      },
      'endpoint': {
        'method': this.POST,
        'type': 'schema',
        'action': 'validateSdo',
        'routeParams': {
          id: sdo.md.id
        }
      },
      'params': sdo
    })
  }

  /**
   * Get sdos adapter mapping
   * @param {String} oId
   * @param {String} sId
   * @param {Object} params
   * @returns {Promise}
   */
  getSdos (oId, sId, params) {
    return this.adapter.getSdos({
      'requestOptions': false,
      'endpoint': {
        'method': this.GET,
        'type': 'sdo',
        'action': 'list',
        'routeParams': {
          oId: oId,
          sId: sId
        }
      },
      'params': params
    })
  }

  /**
   * Add sdo adapter mapping
   * @param {Object} sdo
   * @returns {Promise}
   */
  createSdo (sdo) {
    return this.adapter.createSdo({
      'requestOptions': {
        'headers': {
          'responseType': 'application/json'
        }
      },
      'endpoint': {
        'method': this.POST,
        'type': 'sdo',
        'action': 'add',
        'routeParams': {
          id: sdo.md.id
        }
      },
      'params': sdo
    })
  }

  /**
   * Add sdo adapter mapping
   * @param {Object} sdo
   * @returns {Promise}
   */
  editSdo (sdo) {
    return this.adapter.editSdo({
      'requestOptions': {
        'headers': {
          'responseType': 'application/json'
        }
      },
      'endpoint': {
        'method': this.PUT,
        'type': 'sdo',
        'action': 'edit',
        'routeParams': {
          id: sdo.md.id
        }
      },
      'params': sdo
    })
  }

  editSdosBulk (sdos) {
    return this.adapter.editSdo({
      'requestOptions': {
        'headers': {
          'responseType': 'application/json'
        }
      },
      'endpoint': {
        'method': this.PUT,
        'type': 'sdo',
        'action': 'bulkEdit',
        'routeParams': {
          oId: sdos[0].md.oId,
          sId: sdos[0].md.sId
        }
      },
      'params': sdos
    })
  }

  /**
   * Changed sdo adapter mapping
   * @param {Object} sdo
   * @returns {Promise}
   */
  changedSdo (sdo) {
    return this.adapter.changedSdo({
      'requestOptions': {
        'headers': {
          'responseType': 'application/json'
        }
      },
      'endpoint': {
        'method': this.HEAD,
        'type': 'sdo',
        'action': 'changed',
        'routeParams': {
          id: sdo.md.id,
          r: sdo.md.r
        }
      },
      'params': false
    })
  }
}
