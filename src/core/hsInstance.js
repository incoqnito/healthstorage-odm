
/** Import modules */
const HS_MODEL = require('./hsModel.js');
const HS_SCHEMA = require('./handler/hsSchema.js');
const HS_REQUEST = require('./handler/hsRequest.js');
const HS_VALIDATION = require('./handler/hsValidation.js');

/** Export module */
module.exports = hsInstance;

/** Get constants */
const ASC = "Ascending";
const DESC = "Descending";
const MD_ID = "id";
const MD_REVISION = "r";
const MD_DATE = "tsp";

/** HS Instance */
function hsInstance(opts) {

  /** Types */
  this.ASC = ASC;
  this.DESC = DESC;
  this.MD_ID = MD_ID;
  this.MD_REVISION = MD_REVISION;
  this.MD_DATE = MD_DATE;

  /** Set scham by given values */
  this.hsSchema = new HS_SCHEMA(opts);

  /**
   * Get all sdos from owner and schema
   * @param {Object} data
   * @returns {Promise}
   */
  this.findAll = function (options) {
    return HS_REQUEST.getSdoByIds(this.hsSchema.oId, this.hsSchema.id, options).then(response => {
      var list = []
      for (var sdo in response.body) {
        list.push(new HS_MODEL(response.body[sdo]))
      }
      return {
        list: list,
        headers: response.headers
      }
    })
  }

  /**
   * Get sdo by identifier
   * @param {String} id
   * @returns {Promise}
   */
  this.findById = function (id) {
    return HS_REQUEST.getSdoById(id).then(sdo => new HS_MODEL(sdo))
  }

  /**
   * Create a new sdo for given schema
   * @param {Object} data
   * @returns {Promise}
   */
  this.create = function (data) {
    data = Object.assign(data, { md: this.hsSchema.generateMd() })
    HS_VALIDATION.validateProperties(this.hsSchema.schema, data)
    return HS_REQUEST.postSdo(data).then(sdo => new HS_MODEL(sdo))
  }

  /** Update sdo
   * @param {String} id
   * @param {Object} data
   */
  this.updateById = function (id, data) {
    data.md.r += 1
    HS_VALIDATION.validateProperties(this.hsSchema.schema, data)
    return HS_REQUEST.putSdoById(id, data).then(sdo => new HS_MODEL(sdo))
  }

  /**
   * Delete sdo (only for development)
   * @param {String} id
   * @param {Object} data
   */
  this.deleteById = function (id) {
    return HS_REQUEST.deleteSdoById(id);
  }

  return this;
}

// class HsInstance {


//   findMetaField (key) {
//     var value = ''

//     switch (key) {
//       case 'id':
//         value = this.META_ID
//         break
//       case 'r':
//         value = this.META_REVISION
//         break
//       case 'tsp':
//         value = this.META_DATE
//         break
//     }

//     return value
//   }


//   /**
//    * Get sdo by identifier
//    * @param {String} id
//    * @returns {Promise}
//    */
//   findById (id) {
//     return RequestHandler.getSdoById(id).then(sdo => new HsModel(sdo))
//   }
// }

// export default HsInstance
