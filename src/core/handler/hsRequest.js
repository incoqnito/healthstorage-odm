/** Import modules */
const AXIOS = require('axios')

/** Config */
const SRVURL = 'http://localhost:8080'
const SDO_ENDPOINT = 'sdos'
const SDO_DELETE_ENDPOINT = 'eraser/sdos'
const SCHEMA_ENDPOINT = 'schemas'


/** Export module */
module.exports = new hsRequest();

/** Functions */
hsRequest.prototype.getSdoByIds = getSdoByIds;
hsRequest.prototype.postSdo = postSdo;
hsRequest.prototype.putSdoById = putSdoById;
hsRequest.prototype.getSdoById = getSdoById;
hsRequest.prototype.deleteSdoById = deleteSdoById;
hsRequest.prototype.getSchemaBySid = getSchemaBySid;
hsRequest.prototype.getSchemaBySidr = getSchemaBySidr;
hsRequest.prototype.postSchema = postSchema;

/** HealthStorageODM */
function hsRequest() {
  /** Set axios */
  this.axios = AXIOS;
}

/**
 * Get Sdos for given Schema
 * @returns {Promise}
 */
function getSdoByIds(oId, id, params) {
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
function postSdo(sdo) {
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
function putSdoById(id, sdo) {
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
function getSdoById(id) {
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
function deleteSdoById(id) {
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
function postSchema(schema) {
  return this.axios.post(`${SRVURL}/${SCHEMA_ENDPOINT}`, JSON.stringify(schema), {
    headers: {
      responseType: 'application/json'
    }
  })
    .then(response => response.data)
    .catch(error => {
      // console.log(error);
      console.log(JSON.stringify(schema));
      return;
      throw new Error({
        'status': error.response.status,
        'text': error.response.statusText
      })
    })
}


/**
 * Get schma by its identifier with highest revision
 * @param {String} sId
 * @returns {Object}
 */
function getSchemaBySid(sId) {
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
 * Get schma by its identifier and revison
 * @param {String} sId
 * @returns {Object}
 */
function getSchemaBySidr(sId, r) {
  return axios.get(`${SRVURL}/${SCHEMA_ENDPOINT}/${sId}/${r}`, {
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
