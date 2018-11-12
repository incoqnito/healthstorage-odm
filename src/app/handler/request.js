'use-strict';

import FormData from 'form-data'

const AXIOS = require("axios");
const SRVURL = "http://localhost:8080/";
const SDOENDPOINT = "sdos/"

class RequestHandler
{
  constructor() 
  {
    
  }

  /**
   * Get class
   * @return {Object}
   */
  getClass()
  {
    return this;
  }

  /**
   * Get Sdos for given Schema 
   * @returns {Promise}
   */
  apiGetSdos(oId, id)
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
  apiGetSdo(id)
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
  apiPostSdos(id, sdo)
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
  apiPutSdo(id, sdo)
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