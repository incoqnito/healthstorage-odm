class Api
{
  /**
   * Construct
   */
  constructor()
  {
    this.axios = require('axios');
  }

  /**
   * Create 
   */
  create(object)
  {
    // this.axios.get('/user', {
    //   params: {
    //     ID: 12345
    //   }
    // }).then(function (response) {
    //   console.log(response);
    // }).catch(function (error) {
    //   console.log(error);
    // }).then(function () {
    //   // always executed
    // });  
  }
}

module.exports = Api;