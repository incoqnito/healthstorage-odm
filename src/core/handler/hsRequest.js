/** Import modules */
const AXIOS = require('axios')

/** Config */
const SDO_ENDPOINT = 'sdos'
const SDO_DELETE_ENDPOINT = 'eraser/sdos'
const SCHEMA_ENDPOINT = 'schemas'
const SCHEMA_DELETE_ENDPOINT = 'eraser/schemas'
const SDO_LOCKS_ENDPOINT = 'sdos/{id}/locks'
const SDO_ISLOCKED_ENDPOINT = 'sdos/{id}/islocked'

/** Export module */
module.exports = HsRequest

/** HealthStorageODM */
function HsRequest (client) {
  /** Check for client */
  if (client === undefined) throw new Error('Client for requests is not defined')

  /**
   * Get Sdos for given Schema
   * @returns {Promise}
   */
  this.getSdoByIds = function (oId, id, params) {
    return AXIOS.get(`${client.serverUrl}/${SDO_ENDPOINT}/${oId}/${id}`, {
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
  this.postSdo = function (sdo) {
    return AXIOS.post(`${client.serverUrl}/${SDO_ENDPOINT}/${sdo.md.id}`, sdo, {
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
  this.putSdoById = function (id, sdo) {
    return AXIOS.put(`${client.serverUrl}/${SDO_ENDPOINT}/${id}`, sdo, {
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
  this.getSdoById = function (id) {
    return AXIOS.get(`${client.serverUrl}/${SDO_ENDPOINT}/${id}`)
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
  this.deleteSdoById = function (id) {
    return AXIOS.delete(`${client.serverUrl}/${SDO_DELETE_ENDPOINT}/${id}`, {
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
  this.postSchema = function (schema) {
    return AXIOS.post(`${client.serverUrl}/${SCHEMA_ENDPOINT}`, JSON.stringify(schema), {
      headers: {
        'Content-Type': 'application/schema+json'
      }
    })
      .then(response => response.data.schema)
      .catch(error => error)
  }

  /**
   * Get schma by its identifier with highest revision
   * @param {String} sId
   * @returns {Object}
   */
  this.getSchemaBySid = function (sId) {
    return AXIOS.get(`${client.serverUrl}/${SCHEMA_ENDPOINT}/${sId}`, {
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
  this.deleteSchemaById = function (schemaId) {
    return AXIOS.delete(`${client.serverUrl}/${SCHEMA_DELETE_ENDPOINT}/${schemaId}?allRevisions=true`, {
      headers: {
        responseType: 'application/json'
      }
    })
      .then(response => response)
      .catch(error => error)
  }

  /**
   * Get schema by its identifier and revison
   * @param {String} sId
   * @returns {Object}
   */
  this.getSchemaBySidr = function (sId, r) {
    return AXIOS.get(`${client.serverUrl}/${SCHEMA_ENDPOINT}/${sId}/${r}`, {
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
  this.postLockById = function (id) {
    return AXIOS.post(`${client.serverUrl}/${SDO_LOCKS_ENDPOINT.replace('{id}', id)}`, {
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
  this.getLockById = function (id, lockValueId) {
    return AXIOS.post(`${client.serverUrl}/${SDO_LOCKS_ENDPOINT.replace('{id}', id)}/${lockValueId}`, {
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
  this.deleteLockById = function (id, lockValueId) {
    return AXIOS.delete(`${client.serverUrl}/${SDO_LOCKS_ENDPOINT.replace('{id}', id)}/${lockValueId}`, {
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
}
