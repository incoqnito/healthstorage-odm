'use-strict';

const AXIOS = require("axios");
const SRVURL = "http://localhost:8080/";
const SDOENDPOINT = "sdos/"

class Api 
{
  /**
   * Constuctror 
   */
  constructor()
  {
    this.axios = this.AXIOS();
  }

  /**
   * Get const axios
   */
  get AXIOS()
  {
    return AXIOS;
  }

  /**
   * Get const server url
   */
  get SRVURL()
  {
    return SRVURL;
  }

  /**
   * Get const sdo endpoint
   */
  get SDOENDPOINT()
  {
    return SDOENDPOINT;
  }

  /**
   * Get Sdos for given Schema 
   */
  apiGetSdos(id)
  {

  }

  /**
   * Post Sdos for given Schema 
   */
  apiPostSdo(id, sdo)
  {
    let data = new FormData();
    data.append("sdo", JSON.stringify(sdo));
    this.AXIOS().post(
      this.SRVURL() + this.SDOENDPOINT() + "/" + id + "/", 
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

module.export = new Api();