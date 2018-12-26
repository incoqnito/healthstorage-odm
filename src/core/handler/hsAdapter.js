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
/** Request data */
const REQUEST_DATA = {
  'requestOptions': {},
  'endpoint': {
    'method': '',
    'type': '',
    'action': '',
    'routeParams': {}
  },
  'params': {}
}

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
   * Get REQUEST_DATA type string
   * @return {String} REQUEST_DATA
   */
  get REQUEST_DATA () {
    return REQUEST_DATA
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
   * Get DELETE type string
   * @return {String} DELETE
   */
  get DELETE () {
    return DELETE
  }

  /**
   * Validate sdo against schema adapter mapping
   * @param {Object} sdo
   * @returns {Promise}
   */
  validateSdo (sdo) {
    return this.adapter.validateSdo({
      ...this.REQUEST_DATA,
      ...{
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
      }
    })
  }

  /**
   * Get sdos adapter mapping
   * @param {String} oId
   * @param {String} sId
   * @returns {Promise}
   */
  getSdos (oId, sId) {
    return this.adapter.getSdos({
      ...this.REQUEST_DATA,
      ...{
        'endpoint': {
          'method': this.GET,
          'type': 'sdo',
          'action': 'list',
          'routeParams': {
            oId: oId,
            sId: sId
          }
        }
      }
    })
  }

  /**
   * Get sdo by id oder where
   * @param {Object} opts
   */
  getSdo (opts) {
    if (opts.id !== undefined) {
      return this.adapter.getSdo({
        ...this.REQUEST_DATA,
        ...{
          'endpoint': {
            'method': this.GET,
            'type': 'sdo',
            'action': 'single',
            'routeParams': {
              id: opts.id
            }
          }
        }
      })
    } else {
      // Todo implement filter
    }
  }

  /**
   * Add sdo adapter mapping
   * @param {Object} sdo
   * @returns {Promise}
   */
  createSdo (sdo) {
    return this.adapter.createSdo({
      ...this.REQUEST_DATA,
      ...{
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
      }
    })
  }

  /**
   * Edit sdo adapter mapping
   * @param {Object} sdo
   * @returns {Promise}
   */
  editSdo (sdo) {
    return this.adapter.editSdo({
      ...this.REQUEST_DATA,
      ...{
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
      }
    })
  }

  /**
   * Edit sdo bulk adapter mapping
   * @param {Object} sdos
   * @returns {Promise}
   */
  editSdosBulk (sdos) {
    return this.adapter.editSdo({
      ...this.REQUEST_DATA,
      ...{
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
      }
    })
  }

  /**
   * Changed sdo adapter mapping
   * @param {Object} sdo
   * @returns {Promise}
   */
  sdoHasChanged (sdo) {
    return this.adapter.sdoHasChanged({
      ...this.REQUEST_DATA,
      ...{
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
        }
      }
    })
  }

  /**
   * Lock sdo mapping
   * @param {Object} sdo
   */
  lockSdo (sdo) {
    return this.adapter.lockSdo({
      ...this.REQUEST_DATA,
      ...{
        'requestOptions': {
          'headers': {
            'accept': 'application/json',
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.POST,
          'type': 'sdo',
          'action': 'lock',
          'routeParams': {
            id: sdo.md.id
          }
        }
      }
    })
  }

  /**
   * Unlock sdo mapping
   * @param {Object} sdo
   */
  unlockSdo (sdo) {
    return this.adapter.unlockSdo({
      ...this.REQUEST_DATA,
      ...{
        'requestOptions': {
          'headers': {
            'accept': 'application/json',
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.DELETE,
          'type': 'sdo',
          'action': 'unlock',
          'routeParams': {
            id: sdo.md.id,
            lockValue: sdo.lockValue
          }
        }
      }
    })
  }

  /**
   * Delete sdo mapping
   * @param {Object} sdo
   */
  deleteSdo (sdo) {
    return this.adapter.deleteSdo({
      ...this.REQUEST_DATA,
      ...{
        'requestOptions': {
          'headers': {
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.DELETE,
          'type': 'sdo',
          'action': 'single',
          'routeParams': {
            id: sdo.md.id
          }
        },
        'params': sdo
      }
    })
  }
}
