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
   * Get PATCH type string
   * @return {String} PATCH
   */
  get PATCH () {
    return PATCH
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
   * Get schema by params adapter mapping
   * @param {Object} routeParams using sId and/nand revision
   * @param {String} action schema or schemaByRevision
   * @returns {Promise}
   */
  getSchema (routeParams, action) {
    return this.adapter.createSchema({
      ...this.REQUEST_DATA,
      ...{
        'requestOptions': {
          'headers': {
            'accept': 'application/schema+json',
            'responseType': 'application/schema+json'
          }
        },
        'endpoint': {
          'method': this.GET,
          'type': 'schema',
          'action': action,
          'routeParams': routeParams
        }
      }
    })
  }

  /**
   * Create schema adapter mapping
   * @param {Object} sdo
   * @returns {Promise}
   */
  createSchema (schema) {
    return this.adapter.createSchema({
      ...this.REQUEST_DATA,
      ...{
        'requestOptions': {
          'headers': {
            'Content-Type': 'application/schema+json'
          }
        },
        'endpoint': {
          'method': this.POST,
          'type': 'schema',
          'action': 'create'
        },
        'params': schema
      }
    })
  }

  /**
   * Delete schema by id adapter mapping
   * @param {Object} sdo
   * @returns {Promise}
   */
  deleteSchema (sId) {
    return this.adapter.deleteSchema({
      ...this.REQUEST_DATA,
      ...{
        'requestOptions': {
          'headers': {
            'Content-Type': 'application/json'
          }
        },
        'endpoint': {
          'method': this.DELETE,
          'type': 'schema',
          'action': 'allRevisions',
          'routeParams': {
            'id': sId
          }
        }
      }
    })
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
            'id': sdo.md.id
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
   * @param {Object} filter
   * @returns {Promise}
   */
  getSdos (oId, sId, options, filter) {
    if (filter === undefined) {
      return this.adapter.getSdos({
        ...this.REQUEST_DATA,
        ...{
          'endpoint': {
            'method': this.GET,
            'type': 'sdo',
            'action': 'list',
            'routeParams': {
              'oId': oId,
              'sId': sId
            }
          },
          'params': options
        }
      })
    } else {
      return this.adapter.getSdos({
        ...this.REQUEST_DATA,
        ...{
          'endpoint': {
            'method': this.POST,
            'type': 'sdo',
            'action': 'filtered',
            'routeParams': {
              'oId': oId,
              'sId': sId
            }
          },
          'param': filter
        }
      })
    }
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
              'id': opts.id
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
            'id': sdo.md.id
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
            'id': sdo.md.id
          }
        },
        'params': sdo
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
            'id': sdo.md.id
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
            'oId': sdos[0].md.oId,
            'sId': sdos[0].md.sId
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
            'id': sdo.md.id,
            'r': sdo.md.r
          }
        }
      }
    })
  }

  /**
   * Lock sdo mapping
   * @param {Object} sdo
   */
  lockItem (sdo) {
    if (window.localStorage.getItem('LOCKED_' + sdo.md.id) === null) {
      return this.adapter.lockItem({
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
              'id': sdo.md.id
            }
          },
          'params': sdo
        }
      })
    } else {
      throw new Error('Item already locked.')
    }
  }

  /**
   * Unlock sdo mapping
   * @param {Object} sdo
   */
  unlockItem (sdo) {
    return this.adapter.unlockItem({
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
            'id': sdo.md.id,
            'lockValue': sdo.lockValue.value
          }
        },
        'params': sdo
      }
    })
  }

  /**
   * Is locked sdo mapping
   * @param {Object} sdo
   */
  isLockedItem (sdo) {
    return this.adapter.unlockItem({
      ...this.REQUEST_DATA,
      ...{
        'requestOptions': {
          'headers': {
            'accept': 'application/json',
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.GET,
          'type': 'sdo',
          'action': 'isLocked',
          'routeParams': {
            'id': sdo.md.id,
            'lockValue': sdo.lockValue.value
          }
        }
      }
    })
  }

  /**
   * Exists in lock state sdo mapping
   * @param {Object} sdo
   */
  existInLockState (sdo, lockState) {
    return this.adapter.existInLockState({
      ...this.REQUEST_DATA,
      ...{
        'requestOptions': {
          'headers': {
            'accept': 'application/json',
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.HEAD,
          'type': 'sdo',
          'action': 'existInLockState',
          'routeParams': {
            'id': sdo.md.id,
            'isLocked': lockState
          }
        }
      }
    })
  }

  /**
   * Get archive by sdo mapping
   * @param {String} id
   * @param {Integer} pageNum
   * @param {Integer} pageSize
   */
  getSdoArchive (id, pageNo, pageSize) {
    return this.adapter.getSdoArchive({
      ...this.REQUEST_DATA,
      ...{
        'endpoint': {
          'method': this.GET,
          'type': 'sdo',
          'action': 'archivedSdos',
          'routeParams': {
            'id': id,
            'pageNo': pageNo,
            'pageSize': pageSize
          }
        }
      }
    })
  }
}
