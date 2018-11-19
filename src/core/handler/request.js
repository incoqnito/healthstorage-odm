'use-strict';

const AXIOS = require("axios");
const SRVURL = "http://localhost:8080/";
const SDO_ENDPOINT = "sdos/"
const SDO_DELETE_ENDPOINT = "eraser/sdos/"
const SCHEMA_ENDPOINT = "schemas/"

class RequestHandler
{
  /**
   * Constructor
   */
  constructor() {}

  /**
   * Get class
   * @return {Object}
   */
  getClass()
  {
    return this;
  }

  /**
   * Get schma by its identifier with highest revision
   * @param {String} sId 
   * @returns {Object}
   */
  getSchemaBySid(sId)
  {
     return AXIOS.get(
      SRVURL + SCHEMA_ENDPOINT + sId,
      {
        headers: {
          accept: 'application/schema+json',
          responseType: 'application/schema+json'
        }
      }
    )
    .then(response => response.data) 
    .catch(error => error.status);
  }

  /**
   * Get schma by its identifier and revison
   * @param {String} sId 
   * @returns {Object}
   */
  getSchemaBySidr(sId , r)
  {
    return AXIOS.get(
      SRVURL + SCHEMA_ENDPOINT + sId + "/" + r,
      {
        headers: {
          accept: 'application/schema+json',
          responseType: 'application/schema+json'
        }
      }
    )
    .then(response => response.data) 
    .catch(error => error.status);
  }

  /**
   * Get Sdos for given Schema 
   * @returns {Promise}
   */
  getSdos(oId, id, params)
  {
    var params = (params !== undefined) ? "?" + this.urlEncodeOptions(params) : "";

    return AXIOS.get(
      SRVURL + SDO_ENDPOINT + oId + "/" + id + params
    )
    .then(response => (response.data === undefined) ? response.status : response.data) 
    .catch(error => error.status);
  }

  /**
   * Get Sdos for given Schema 
   * @returns {Promise}
   */
  getSdo(id)
  {
    return AXIOS.get(
      SRVURL + SDO_ENDPOINT + id + "/"
    )
    .then(response => (response.data === undefined) ? response.status : response.data) 
    .catch(error => error.status);
  }

  /**
   * Create sdo
   * @returns {Promise}
   */
  postSdo(id, sdo)
  {
    return AXIOS.post(
      SRVURL + SDO_ENDPOINT + id,
      sdo,
      {
        headers: {
          "Content-Type": 'application/json',
          responseType: 'application/json'
        }
      }
    )
    .then(response => (response.status == 201) ? response.config.data : response.status)
    .catch(error => error.status);
  }

  /**
   * Update sdo
   * @returns {Promise}
   */
  putSdo(id, sdo)
  {
    return AXIOS.put(
      SRVURL + SDO_ENDPOINT + id,
      sdo,
      {
        headers: {
          "Content-Type": 'application/json',
          responseType: 'application/json'
        }
      }
    )
    .then(response => response.status)
    .catch(error => error.response.status)
  }

  /**
   * Delete sdo (only for development)
   * @returns {Promise}
   */
  deleteSdo(id)
  {
    return AXIOS.delete(
      SRVURL + SDO_DELETE_ENDPOINT + id,
      {
        headers: {
          "Content-Type": 'application/json',
          responseType: 'application/json'
        }
      }
    )
    .then(response => response.status)
    .catch(error => error.response.status)
  }

  /**
   * Encode get params
   * @param {Object} options 
   */
  urlEncodeOptions(options)
  {
    return Object.keys(options).map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(options[k]);
    }).join('&');
  }
}

module.exports = new RequestHandler();