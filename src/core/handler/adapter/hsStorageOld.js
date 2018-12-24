/** Import modules */
const AXIOS = require('axios')

/** Constants */
const SCHEMA_ENDPOINT = 'schemas'
const SCHEMA_VALIDATE_SDO_ENDPOINT = 'schemas/validateSdo'
const SCHEMA_EREASE_ENDPOINT = 'eraser/schemas'
const SDO_ENDPOINT = 'sdos'
const SDO_EREASE_ENDPOINT = 'eraser/sdos'
const SDO_LOCKS_ENDPOINT = 'sdos/{id}/locks'
const SDO_ISLOCKED_ENDPOINT = 'sdos/{id}/islocked'

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
   * Get schma by its identifier with highest revision
   * @param {String} sId
   * @returns {Object}
   */
  getSchemaBySid (sId) {
    return AXIOS.get(`${this.client.serverUrl}/${SCHEMA_ENDPOINT}/${sId}`, {
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
  deleteSchemaById (schemaId) {
    return AXIOS.delete(`${this.client.serverUrl}/${SCHEMA_EREASE_ENDPOINT}/${schemaId}?allRevisions=true`, {
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
  getSchemaBySidr (sId, r) {
    return AXIOS.get(`${this.client.serverUrl}/${SCHEMA_ENDPOINT}/${sId}/${r}`, {
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
   * Get schemas by identifiers with highest revision
   * @param {String} sId
   * @returns {Object}
   */
  getSchemasBySids (sIds) {
    return AXIOS.get(`${this.client.serverUrl}/${SCHEMA_ENDPOINT}/${encodeURI(sIds)}`, {
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
   * Get all archived revisions by id
   * @param {String} id sdo identifier
   * @returns {Promise}
   */
  getAllArchivedRevisionNumbersBySdoId (id) {
    console.log('Returns all sdo archived revisions by its identifier')
  }

  /**
   * Get all archived sdos by id
   * @param {String} id sdo identifier
   * @returns {Promise}
   */
  getAllArchivedSdosById (id) {
    console.log('Returns all archived sdos by its identifier')
  }

  /**
   * Delete sdo (only for development)
   * @issue Api currently not returning deleted id from backend, for now use given data in return
   * @returns {Promise}
   */
  deleteSdoById (id) {
    return AXIOS.delete(`${this.client.serverUrl}/${SDO_EREASE_ENDPOINT}/${id}`, {
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
  postSchema (schema) {
    return AXIOS.post(`${this.client.serverUrl}/${SCHEMA_ENDPOINT}`, JSON.stringify(schema), {
      headers: {
        'Content-Type': 'application/schema+json'
      }
    })
      .then(response => response.data.schema)
      .catch(error => error)
  }

  /**
   * Create sdo lock value
   * @param {String} id
   * @returns {Promise}
   */
  postLockById (id) {
    return AXIOS.post(`${this.client.serverUrl}/${SDO_LOCKS_ENDPOINT.replace('{id}', id)}`, {
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
  getLockById (id, lockValueId) {
    return AXIOS.post(`${this.client.serverUrl}/${SDO_LOCKS_ENDPOINT.replace('{id}', id)}/${lockValueId}`, {
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
  deleteLockById (id, lockValueId) {
    return AXIOS.delete(`${this.client.serverUrl}/${SDO_LOCKS_ENDPOINT.replace('{id}', id)}/${lockValueId}`, {
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
