/** Import modules */
const AXIOS = require('axios')

/** Config */
const SRVURL = 'http://localhost:8080'
const SDO_ENDPOINT = 'sdos'
const SDO_DELETE_ENDPOINT = 'eraser/sdos'
const SCHEMA_ENDPOINT = 'schemas'
const SCHEMA_DELETE_ENDPOINT = 'eraser/schemas'
const SDO_LOCKS_ENDPOINT = 'sdos/{id}/locks'
const SDO_ISLOCKED_ENDPOINT = 'sdos/{id}/islocked'

/** Export module */
module.exports = new HsRequest()

/** Functions */
HsRequest.prototype.getSdoByIds = getSdoByIds
HsRequest.prototype.postSdo = postSdo
HsRequest.prototype.putSdoById = putSdoById
HsRequest.prototype.getSdoById = getSdoById
HsRequest.prototype.deleteSdoById = deleteSdoById
HsRequest.prototype.getSchemaBySid = getSchemaBySid
HsRequest.prototype.getSchemaBySidr = getSchemaBySidr
HsRequest.prototype.postSchema = postSchema
HsRequest.prototype.deleteSchemaById = deleteSchemaById
HsRequest.prototype.postLockById = postLockById
HsRequest.prototype.getLockById = getLockById
HsRequest.prototype.deleteLockById = deleteLockById

/** HealthStorageODM */
function HsRequest () {
  /** Set axios */
  this.axios = AXIOS
}

/**
 * Get Sdos for given Schema
 * @returns {Promise}
 */
function getSdoByIds (oId, id, params) {
  return this.axios.get(`${SRVURL}/${SDO_ENDPOINT}/${oId}/${id}`, {
    params
  })
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
 * @issue Api currently not returning created sdo object from backend, for now use given data in return
 * @returns {Promise}
 */
function postSdo (sdo) {
  return this.axios.post(`${SRVURL}/${SDO_ENDPOINT}/${sdo.md.id}`, sdo, {
    headers: {
      responseType: 'application/json'
    }
  })
    .then(response => (response.status === 201) ? JSON.parse(response.config.data) : response.status)
    .catch(error => {
      return Promise.reject(new Error({
        'status': error.response.status,
        'text': error.response.statusText
      }))
    })
}

/**
 * Update sdo
 * @issue Api currently not returning created sdo object from backend, for now use given data in return
 * @returns {Promise}
 */
function putSdoById (id, sdo) {
  return this.axios.put(`${SRVURL}/${SDO_ENDPOINT}/${id}`, sdo, {
    headers: {
      responseType: 'application/json'
    }
  })
    .then(response => sdo)
    .catch(error => {
      return Promise.reject(new Error({
        'status': error.response.status,
        'text': error.response.statusText
      }))
    })
}

/**
 * Get Sdos for given Schema
 * @returns {Promise}
 */
function getSdoById (id) {
  return this.axios.get(`${SRVURL}/${SDO_ENDPOINT}/${id}`)
    .then(response => (response.data === undefined) ? response.status : response.data)
    .catch(error => {
      return Promise.reject(new Error({
        'status': error.response.status,
        'text': error.response.statusText
      }))
    })
}

/**
 * Delete sdo (only for development)
 * @issue Api currently not returning deleted id from backend, for now use given data in return
 * @returns {Promise}
 */
function deleteSdoById (id) {
  return this.axios.delete(`${SRVURL}/${SDO_DELETE_ENDPOINT}/${id}`, {
    headers: {
      responseType: 'application/json'
    }
  })
    .then(response => id)
    .catch(error => {
      return Promise.reject(new Error({
        'status': error.response.status,
        'text': error.response.statusText
      }))
    })
}

/**
 * Post schma
 * @param {String} sId
 * @returns {Object}
 */
function postSchema (schema) {
  return this.axios.post(`${SRVURL}/${SCHEMA_ENDPOINT}`, JSON.stringify(schema), {
    headers: {
      'Content-Type': 'application/schema+json'
    }
  })
    .then(response => response.data.schema.$id)
    .catch(error => error)
}

/**
 * Get schma by its identifier with highest revision
 * @param {String} sId
 * @returns {Object}
 */
function getSchemaBySid (sId) {
  return this.axios.get(`${SRVURL}/${SCHEMA_ENDPOINT}/${sId}`, {
    headers: {
      accept: 'application/schema+json',
      responseType: 'application/schema+json'
    }
  })
    .then(response => response.data)
    .catch(error => {
      throw new Error({
        'status': error.response.status,
        'text': error.response.statusText
      })
    })
}

/**
 * Delete schema
 * @param {String} schemaId
 * @returns {Object}
 */
function deleteSchemaById (schemaId) {
  return this.axios.delete(`${SRVURL}/${SCHEMA_DELETE_ENDPOINT}/${schemaId}?allRevisions=true`, {
    headers: {
      responseType: 'application/json'
    }
  })
    .then(response => response)
    .catch(error => error)
}

/**
 * Get schma by its identifier and revison
 * @param {String} sId
 * @returns {Object}
 */
function getSchemaBySidr (sId, r) {
  return this.axios.get(`${SRVURL}/${SCHEMA_ENDPOINT}/${sId}/${r}`, {
    headers: {
      accept: 'application/schema+json',
      responseType: 'application/schema+json'
    }
  })
    .then(response => response.data)
    .catch(error => {
      throw new Error({
        'status': error.response.status,
        'text': error.response.statusText
      })
    })
}

/**
 * Create sdo lock value
 * @param {String} id
 * @returns {Promise}
 */
function postLockById (id) {
  return this.axios.post(`${SRVURL}/${SDO_LOCKS_ENDPOINT.replace('{id}', id)}`, {
    headers: {
      accept: 'application/json',
      responseType: 'application/json'
    }
  })
    .then(response => (response.status === 201) ? response.data.value : response.status)
    .catch(error => {
      return Promise.reject(new Error({
        'status': error.response.status,
        'text': error.response.statusText
      }))
    })
}

/**
 * Get lock value
 * @param {String} id
 * @returns {Promise}
 */
function getLockById (id, lockValueId) {
  return this.axios.post(`${SRVURL}/${SDO_LOCKS_ENDPOINT.replace('{id}', id)}/${lockValueId}`, {
    headers: {
      accept: 'application/json',
      responseType: 'application/json'
    }
  })
    .then(response => console.log(response))
    .catch(error => {
      return Promise.reject(new Error({
        'status': error.response.status,
        'text': error.response.statusText
      }))
    })
}

/**
 * Delete lock value
 * @param {String} id
 * @returns {Promise}
 */
function deleteLockById (id, lockValueId) {
  return this.axios.delete(`${SRVURL}/${SDO_LOCKS_ENDPOINT.replace('{id}', id)}/${lockValueId}`, {
    headers: {
      accept: 'application/json',
      responseType: 'application/json'
    }
  })
    .then(response => response.data)
    .catch(error => {
      return Promise.reject(new Error({
        'status': error.response.status,
        'text': error.response.statusText
      }))
    })
}
