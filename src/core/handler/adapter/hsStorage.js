/** Import modules */
import axios from "axios"

/** Constants */
import { PROXY } from "./../../constants/hsConstants"
const QSTRING = require('query-string')

/** Constants */
import { ENDPOINTS } from "./../../constants/hsConstants"

class HsStorage {
  /**
   * Construct
   * @param {Object} client client object
   */
  constructor (client) {
    if (client === undefined) throw new Error('No instance options provided for HsAdapter')
    this.client = client
  }

  /**
   * Get Endpoints
   * @returns {Object} ENDPOINTS api endpoints
   */
  get ENDPOINTS () {
    return ENDPOINTS
  }

  /**
   * Build request url
   * @param {Object} endpoint
   * @returns {String}
   */
  buildRequestUrl (endpoint, params = {}) {
    let queryString = ''
    let url = this.ENDPOINTS[endpoint.type][endpoint.method][endpoint.action]

    for (var idx in endpoint.routeParams) {
      url = url.replace('{' + idx + '}', endpoint.routeParams[idx])
    }

    if (params !== undefined && params !== '' && params !== {}) queryString = QSTRING.stringify(params)
    if (queryString !== '') queryString = `?${queryString}`

    return this.client.serverUrl + url + queryString
  }

  /**
   * Get schema
   * @param {Object} schema
   * @returns {Promise}
   */
  getSchema (opts) {
    axios.defaults.headers.common = opts.requestOptions.headers
    return axios.get(this.buildRequestUrl(opts.endpoint))
      .then(response => response.data)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "getSchema()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "getSchema()")
        }
      })
  }

  /**
   * Get schemas
   * @param {Object} opts
   * @returns {Promise}
   */
  getSchemas (opts) {
    axios.defaults.headers.common = opts.requestOptions.headers
    return axios.get(this.buildRequestUrl(opts.endpoint, opts.params))
      .then(response => response.data)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "getSchemas()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "getSchemas()")
        }
      })
  }

  /**
   * Create schema
   * @param {Object} schema
   * @returns {Promise}
   */
  createSchema (opts) {
    return axios.post(this.buildRequestUrl(opts.endpoint), JSON.stringify(opts.params), opts.requestOptions)
      .then(response => response.data.schema)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "createSchema()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "createSchema()")
        }
      })
  }

  /**
   * Delete schema
   * @param {String} schemaId
   * @returns {Promise}
   */
  deleteSchema (opts) {
    return axios.delete(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => response.status === 204)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "deleteSchema()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "deleteSchema()")
        }
      })
  }

  /**
   * Validate against schema
   * @param {Object} opts
   * @returns {Promise}
   */
  validateSdo (opts) {
    return axios.post(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions)
      .then(response => (response.status === 200))
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "validateSdo()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "validateSdo()")
        }
      })
  }

  /**
   * Get sdos
   * @param {Object} opts
   * @returns {Promise}
   */
  getSdos (opts) {
    axios.defaults.headers.common = opts.requestOptions.headers
    return axios.get(this.buildRequestUrl(opts.endpoint, opts.params), opts.requestOptions)
      .then(response => (response.data === undefined) ? response.status : { body: response.data, headers: response.headers })
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "getSdos()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "getSdos()")
        }
      })
  }

  /**
   * Get sdos filtered
   * @param {Object} opts
   * @returns {Promise}
   * @issue Throws API errors. Error 500
   */
  getSdosFiltered (opts) {
    return axios.post(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions)
      .then(response => (response.data === undefined || response.data.length <= 0) ? { body: [], headers: [] } : { body: response.data, headers: response.headers })
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "getSdosFiltered()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "getSdosFiltered()")
        }
      })
  }

  /**
   * Get sdo
   * @param {Object} opts
   * @returns {Promise}
   */
  getSdo (opts) {
    return axios.get(this.buildRequestUrl(opts.endpoint))
      .then(response => (response.data === undefined) ? response.status : response.data)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "getSdo()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "getSdo()")
        }
      })
  }

  /**
   * Create sdo
   * @param {Object} opts
   * @returns {Promise}
   * @issue API needs to return created sdo (defaults)
   */
  createSdo (opts) {
    axios.defaults.headers.common = opts.requestOptions.headers
    return axios.post(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions)
      .then(response => (response.status === 201) ? JSON.parse(response.config.data) : response.status)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "createSdo()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "createSdo()")
        }
      })
  }

  /**
   * Edit sdo
   * @param {Object} opts
   * @returns {Promise}
   * @issue API needs to return edited sdo
   */
  editSdo (opts) {
    return axios.put(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions)
      .then(response => opts.params)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "editSdo()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "editSdo()")
        }
      })
  }

  /**
   * Delete sdo
   * @param {Object} opts
   * @returns {Promise}
   * @issue API should return the deleted uuid after success
   */
  deleteSdo (opts) {
    axios.defaults.headers.common = opts.requestOptions.headers
    return axios.delete(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => (response.status === 204) ? opts.endpoint.routeParams.id : false)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "deleteSdo()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "deleteSdo()")
        }
      })
  }

  /**
   * Edit sdos in bulk action
   * @param {Object} opts
   * @returns {Promise}
   */
  editSdosBulk (opts) {
    return axios.put(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions)
      .then(response => response)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "editSdosBulk()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "editSdosBulk()")
        }
      })
  }

  /**
   * Changed sdo
   * @param {Object} opts
   * @returns {Promise}
   */
  sdoHasChanged (opts) {
    return axios.head(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => response)
      .catch(error => {
        if (error.response.status === 304) {
          return false
        } else {
          if(error.response !== undefined && error.response.status !== undefined) {
            throw this.createError(error.response.statusText, error.response.status, "sdoHasChanged()")
          } else {
            throw this.createError(500, 'Internal API Service Error', "sdoHasChanged()")
          }
        }
      })
  }

  /**
   * Lock item
   * @param {Object} opts
   * @returns {Promise}
   * @issue API throws 500 error when sod is locked, unlocked and locked again
   * @issue No way to keep lockValue on item. For now stored in local storage, and restored on list load to item
   */
  lockItem (opts) {
    return axios.post(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => {
        return (response.status === 201) ? response.data : response.status
      })
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "lockItem()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "lockItem()")
        }
      })
  }

  /**
   * Unlock item
   * @param {Object} opts
   * @returns {Promise}
   * @issue API throws 500 error when sod is locked, unlocked and locked again
   * @issue No way to keep lockValue on item. For now removed from local storage
   */
  unlockItem (opts) {
    return axios.delete(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => {
        return response.status === 204
      })
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "unlockItem()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "unlockItem()")
        }
      })
  }

  /**
   * Get lock data from item
   * @param {Object} opts
   * @returns {Promise}
   */
  getLockData (opts) {
    return axios.get(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => response.data)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "getLockData()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "getLockData()")
        }
      })
  }

  /**
   * Check item is locked
   * @param {Object} opts
   * @returns {Promise}
   */
  isLockedItem (opts) {
    return axios.get(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => response.data.isLocked)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "isLockedItem()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "isLockedItem()")
        }
      })
  }

  /**
   * Check if item exists in lock state
   * @param {Object} opts
   * @returns {Promise}
   * @issue API should return true or false, would be better than 204 or 404
   */
  existInLockState (opts) {
    return axios.head(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => response)
      .catch(error => {
        if (error.response.status === 404) {
          return false
        } else {
          if(error.response !== undefined && error.response.status !== undefined) {
            throw this.createError(error.response.statusText, error.response.status, "existInLockState()")
          } else {
            throw this.createError(500, 'Internal API Service Error', "existInLockState()")
          }
        }
      })
  }

  /**
   * Get archive for sdo identifier
   * @param {Object} opts
   * @returns {Promise}
   */
  getSdoArchive (opts) {
    return axios.get(this.buildRequestUrl(opts.endpoint))
      .then(response => (response.data === undefined) ? response.status : { body: response.data, headers: response.headers })
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "getSdoArchive()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "getSdoArchive()")
        }
      })
  }

  /**
   * Get archived revision numbers for sdo identifier
   * @param {Object} opts
   * @returns {Promise}
   */
  getSdoRevisionsArchive (opts) {
    return axios.get(this.buildRequestUrl(opts.endpoint))
      .then(response => (response.data === undefined) ? response.status : response.data)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "getSdoRevisionsArchive()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "getSodsRevisionsArchive()")
        }
      })
  }

  /**
   * Get sdoblob
   * @param {Object} opts
   * @returns {Promise}
   */
  getSdoBlob (opts) {
    axios.defaults.headers.common = opts.requestOptions.headers
    return axios.get(this.buildRequestUrl(opts.endpoint), opts.requestOptions.headers)
      .then(response => (response.data === undefined) ? response.status : response.data)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "getSdoBlob()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "getSdoBlob()")
        }
      })
  }

  /**
   * Get blob file
   * @param {Object} opts
   * @returns {Promise}
   */
  getSdoBlobFile (opts) {
    axios.defaults.headers.common = opts.requestOptions.headers
    return axios.get(this.buildRequestUrl(opts.endpoint), opts.requestOptions.headers)
      .then(response => (response.data === undefined) ? response.status : response.data)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "getSdoBlob()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "getSdoBlob()")
        }
      })
  }

  /**
   * Create sdoblob
   * @param {Object} opts
   * @returns {Promise}
   * @issue API needs to return created sdo (defaults)
   */
  createSdoBlob (opts) {
    axios.defaults.headers.common = opts.requestOptions.headers
    return axios.post(this.buildRequestUrl(opts.endpoint), opts.params)
      .then(response => response !== undefined && response.status === 201 ? response : false)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "updateSdoBlob()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "updateSdoBlob()")
        }
      })
  }

  /**
   * Update sdoblob
   * @param {Object} opts
   * @returns {Promise}
   * @issue API needs to return created sdo (defaults)
   */
  updateSdoBlob (opts) {
    axios.defaults.headers.common = opts.requestOptions.headers
    return axios.post(this.buildRequestUrl(opts.endpoint), opts.params)
      .then(response => response !== undefined && response.status === 201 ? response : false)
      .catch(error => {
        if(error.response !== undefined && error.response.status !== undefined) {
          throw this.createError(error.response.statusText, error.response.status, "updateSdoBlob()")
        } else {
          throw this.createError(500, 'Internal API Service Error', "updateSdoBlob()")
        }
      })
  }

  /**
   * 
   * @param {*} message 
   * @param {*} status 
   */
  createError (message, status, callee = 'No information passed') {
    let error = new Error(message) 
    error.status = status
    error.callee = callee
    error.text = message
    return error
  }
}

export default HsStorage