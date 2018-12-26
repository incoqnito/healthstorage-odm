/** Import modules */
const AXIOS = require('axios')

/** Constants */
const SCHEMA_ENDPOINT = 'schemas'
const SCHEMA_EREASE_ENDPOINT = 'eraser/schemas'

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
}
