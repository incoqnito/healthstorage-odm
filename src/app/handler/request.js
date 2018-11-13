'use-strict';

const AXIOS = require("axios");
const SRVURL = "http://localhost:8080/";
const SDOENDPOINT = "sdos/"
const SCHEMAENDPOINT = "schemas/"

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
      SRVURL + SCHEMAENDPOINT + sId,
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
      SRVURL + SCHEMAENDPOINT + sId + "/" + r,
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
  getSdos(oId, id)
  {
    return AXIOS.get(
      SRVURL + SDOENDPOINT + oId + "/" + id
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
      SRVURL + SDOENDPOINT + id + "/"
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
      SRVURL + SDOENDPOINT + id,
      sdo,
      {
        headers: {
          "Content-Type": 'application/json',
          responseType: 'application/json'
        }
      }
    )
    .then(response => (response.status == 201) ? sdo.md.id : response.status)
    .catch(error => error.status);
  }

   /**
   * Update sdo
   * @returns {Promise}
   */
  putSdo(id, sdo)
  {
    return AXIOS.put(
      SRVURL + SDOENDPOINT + id,
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
}

module.exports = new RequestHandler();