/** Import modules */
const AXIOS = require('axios')
const QSTRING = require('query-string')

/** Constants */
const ENDPOINTS = {
  'sdo': {
    'get': {
      'list': '/sdos/{oId}/{sId}',
      'single': '/sdos/{id}',
      'isLocked': '/sdos/{id}/islocked/{lockValue}',
      'archivedSdos': '/archive/sdos/{id}/{pageNo}/{pageSize}'
    },
    'post': {
      'list': '/sdos/{oId}/{sId}',
      'add': '/sdos/{id}',
      'lock': '/sdos/{id}/locks',
      'filtered': '/sdos/{ownerId}/{schemaId}'
    },
    'put': {
      'edit': '/sdos/{id}',
      'bulkEdit': '/sdos/c/{oId}/{sId}'
    },
    'head': {
      'changed': '/sdos/{id}/{r}',
      'existInLockState': '/sdos/{id}/islocked/{isLocked}'
    },
    'delete': {
      'single': '/eraser/sdos/{id}',
      'unlock': '/sdos/{id}/locks/{lockValue}'
    }
  },
  'schema': {
    'get': {
      'schema': '/schema/{id}',
      'schemaByRevision': '/schema/{id}/{r}',
      'validateSdo': '/schemas/validateSdo'
    },
    'post': {
      'create': '/schemas',
      'validateSdo': '/schemas/validateSdo'
    },
    'delete': {
      'allRevisions': '/eraser/schemas/{id}/?allRevisions=true'
    }
  }
}

module.exports = class HsStorage {
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

    if (params !== {}) queryString = '?' + QSTRING.stringify(params)

    return this.client.serverUrl + url + queryString
  }

  /**
   * Get schema
   * @param {Object} schema
   * @returns {Promise}
   */
  getSchema (opts) {
    return AXIOS.get(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => response.data)
      .catch(error => {
        throw new Error({
          'status': error.response.status,
          'text': error.response.statusText
        })
      })
  }

  /**
   * Create schema
   * @param {Object} schema
   * @returns {Promise}
   */
  createSchema (opts) {
    return AXIOS.post(this.buildRequestUrl(opts.endpoint), JSON.stringify(opts.params), this.requestOptions)
      .then(response => response.data.schema)
      .catch(error => error)
  }

  /**
   * Delete schema
   * @param {String} schemaId
   * @returns {Object}
   */
  deleteSchemaById (opts) {
    return AXIOS.delete(this.buildRequestUrl(opts.endpoint), {
      headers: {
        responseType: 'application/json'
      }
    })
      .then(response => response)
      .catch(error => error)
  }

  /**
   * Validate against schema
   * @param {Object} opts
   * @returns {Promise}
   */
  validateSdo (opts) {
    return AXIOS.post(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions)
      .then(response => (response.status === 200))
      .catch(error => {
        return Promise.reject(new Error({
          'status': error.response.status,
          'text': error.response.statusText
        }))
      })
  }

  /**
   * Get sdos
   * @param {Object} opts
   * @returns {Promis}
   */
  getSdos (opts) {
    return AXIOS.get(this.buildRequestUrl(opts.endpoint, opts.params))
      .then(response => (response.data === undefined) ? response.status : { body: response.data, headers: response.headers })
      .catch(error => {
        return Promise.reject(new Error({
          'status': error.response.status,
          'text': error.response.statusText
        }))
      })
  }

  /**
   * Get sdos filtered
   * @param {Object} opts
   * @returns {Promis}
   * @issue Throws API errors. Error 500, sometimes NullReferenceException, if boolean used as type, field not working
   */
  getSdosFiltered (opts) {
    return AXIOS.post(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions)
      .then(response => (response.data === undefined) ? response.status : { body: response.data, headers: response.headers })
      .catch(error => {
        return Promise.reject(new Error({
          'status': error.response.status,
          'text': error.response.statusText
        }))
      })
  }

  /**
   * Get sdos
   * @param {Object} opts
   * @returns {Promis}
   */
  getSdo (opts) {
    return AXIOS.get(this.buildRequestUrl(opts.endpoint))
      .then(response => (response.data === undefined) ? response.status : { body: response.data, headers: response.headers })
      .catch(error => {
        return Promise.reject(new Error({
          'status': error.response.status,
          'text': error.response.statusText
        }))
      })
  }

  /**
   * Create sdo
   * @param {Object} opts
   * @returns {Promis}
   * @issue API needs to return created sdo (defaults)
   */
  createSdo (opts) {
    return AXIOS.post(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions)
      .then(response => (response.status === 201) ? JSON.parse(response.config.data) : response.status)
      .catch(error => {
        return Promise.reject(new Error({
          'status': error.response.status,
          'text': error.response.statusText
        }))
      })
  }

  /**
   * Edit sdo
   * @param {Object} opts
   * @returns {Promis}
   * @issue API needs to return edited sdo
   */
  editSdo (opts) {
    return AXIOS.put(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions)
      .then(response => opts.params)
      .catch(error => {
        return Promise.reject(new Error({
          'status': error.response.status,
          'text': error.response.statusText
        }))
      })
  }

  /**
   * Delete sdo
   * @param {Object} opts
   * @returns {Promise}
   * @issue API should return the deleted uuid after success
   */
  deleteSdo (opts) {
    return AXIOS.delete(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => (response.status === 204) ? opts.params.md.id : false)
      .catch(error => {
        return Promise.reject(new Error({
          'status': error.response.status,
          'text': error.response.statusText
        }))
      })
  }

  /**
   * Edit sdos in bulk action
   * @param {Object} opts
   * @returns {Promise}
   */
  editSdosBulk (opts) {
    return AXIOS.put(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions)
      .then(response => response)
      .catch(error => {
        return Promise.reject(new Error({
          'status': error.response.status,
          'text': error.response.statusText
        }))
      })
  }

  /**
   * Changed sdo
   * @param {Object} opts
   * @returns {Promis}
   */
  sdoHasChanged (opts) {
    return AXIOS.head(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => response)
      .catch(error => {
        if (error.response.status === 304) {
          return false
        } else {
          return Promise.reject(new Error({
            'status': error.response.status,
            'text': error.response.statusText
          }))
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
    return AXIOS.post(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => {
        if (response.status === 201) window.localStorage.setItem('LOCKED_' + opts.params.md.id, JSON.stringify(response.data))
        return (response.status === 201) ? response.data : response.status
      })
      .catch(error => {
        return Promise.reject(new Error({
          'status': error.response.status,
          'text': error.response.statusText
        }))
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
    return AXIOS.delete(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => {
        if (response.status === 204) window.localStorage.removeItem('LOCKED_' + opts.params.md.id)
        return response.status === 204
      })
      .catch(error => {
        return Promise.reject(new Error({
          'status': error.response.status,
          'text': error.response.statusText
        }))
      })
  }

  /**
   * Check item is locked
   * @param {Object} opts
   * @returns {Promise}
   */
  isLockedItem (opts) {
    return AXIOS.get(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => console.log(response))
      .catch(error => {
        return Promise.reject(new Error({
          'status': error.response.status,
          'text': error.response.statusText
        }))
      })
  }

  /**
   * Check if item exists in lock state
   * @param {Object} opts
   * @returns {Promise}
   * @issue API should return true or false, would be better than 204 or 404
   */
  existInLockState (opts) {
    return AXIOS.head(this.buildRequestUrl(opts.endpoint), opts.requestOptions)
      .then(response => response)
      .catch(error => {
        if (error.response.status === 404) {
          return false
        } else {
          return Promise.reject(new Error({
            'status': error.response.status,
            'text': error.response.statusText
          }))
        }
      })
  }

  /**
   * Get archive for sdo identifier
   * @param {Object} opts
   * @returns {Promise}
   */
  getSdoArchive (opts) {
    return AXIOS.get(this.buildRequestUrl(opts.endpoint))
      .then(response => (response.data === undefined) ? response.status : { body: response.data, headers: response.headers })
      .catch(error => {
        return Promise.reject(new Error({
          'status': error.response.status,
          'text': error.response.statusText
        }))
      })
  }

  /**
   * Get archive for sdo identifier
   */
  getArchivedRevisions () {
    console.log('Get list of archived revision numbers by identifier')
  }
}
