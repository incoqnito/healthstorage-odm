const axios = require('axios')

const SRVURL = 'http://localhost:8080'

const SDO_ENDPOINT = 'sdos'
const SDO_DELETE_ENDPOINT = 'eraser/sdos'
const SCHEMA_ENDPOINT = 'schemas'

class RequestHandler {
  /**
   * Get class
   * @return {Object}
   */
  getClass () {
    return this
  }

  /**
   * Get schma by its identifier with highest revision
   * @param {String} sId
   * @returns {Object}
   */
  getSchemaBySid (sId) {
    return axios.get(`${SRVURL}/${SDO_ENDPOINT}/${sId}`, {
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
   * Get schma by its identifier and revison
   * @param {String} sId
   * @returns {Object}
   */
  getSchemaBySidr (sId, r) {
    return axios.get(`${SRVURL}/${SDO_ENDPOINT}/${sId}/${r}`, {
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
   * Get Sdos for given Schema
   * @returns {Promise}
   */
  getSdoByIds (oId, id, params) {
    return axios.get(`${SRVURL}/${SDO_ENDPOINT}/${oId}/${id}`, {
      params
    })
      .then(response => (response.data === undefined) ? response.status : response.data)
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
  getSdoById (id) {
    return axios.get(`${SRVURL}/${SDO_ENDPOINT}/${id}`)
      .then(response => (response.data === undefined) ? response.status : response.data)
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
  postSdo (sdo) {
    return axios.post(`${SRVURL}/${SDO_ENDPOINT}/${sdo.md.id}`, sdo, {
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
  putSdoById (id, sdo) {
    return axios.put(`${SRVURL}/${SDO_ENDPOINT}/${id}`, sdo, {
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
   * Delete sdo (only for development)
   * @issue Api currently not returning deleted id from backend, for now use given data in return
   * @returns {Promise}
   */
  deleteSdoById (id) {
    return axios.delete(`${SRVURL}/${SDO_ENDPOINT}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
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
}

module.exports = new RequestHandler()
