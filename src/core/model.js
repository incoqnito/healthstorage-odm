
import SchemaHandler from './handler/schema'
import RequestHandler from './handler/request'
import ValidationHandler from './handler/validation'
import HsObject from './hsObject'

const ASC = 'Ascending'
const DESC = 'Descending'
const META_ID = 'id'
const META_REVISION = 'r'
const META_DATE = 'tsp'

class Model {
  /**
   * Consturctor
   * @param {String} title
   * @param {Object} properties
   * @param {Object} options
   */
  constructor (title, properties, options) {
    this.schemaHandler = new SchemaHandler(title, properties, options)
    this.schema = this.schemaHandler.schema
    ValidationHandler.validateSchema(this.schema)
  }

  /**
   * Return asc type field
   * @returns  {String}
   */
  get ASC () {
    return ASC
  }

  /**
   * Return desc type field
   * @returns  {String}
   */
  get DESC () {
    return DESC
  }

  /**
   * Return meta id type field
   * @returns  {String}
   */
  get META_ID () {
    return META_ID
  }

  /**
   * Return meta revision type field
   * @returns  {String}
   */
  get META_REVISION () {
    return META_REVISION
  }

  /**
   * Return meta revision type field
   * @returns  {String}
   */
  get META_DATE () {
    return META_DATE
  }

  findMetaField (key) {
    var value = ''

    switch (key) {
      case 'id':
        value = this.META_ID
        break
      case 'r':
        value = this.META_REVISION
        break
      case 'tsp':
        value = this.META_DATE
        break
    }

    return value
  }

  /**
   * Get schema
   * @returns {String}
   */
  get schema () {
    return this._schema
  }

  /**
   * Set schema property
   * @param {String} schema
   */
  set schema (schema) {
    this._schema = schema
  }

  /**
   * Get properties property
   * @returns {String}
   */
  get properties () {
    return this._properties
  }

  /**
   * Set properties property
   * @param {String} properties
   */
  set properties (properties) {
    this._properties = properties
  }

  /**
   * Create a new sdo for given schema
   * @param {Object} data
   * @returns {Promise}
   *
   */
  create (data) {
    data = Object.assign(data, { md: this.schemaHandler.generateMd() })
    ValidationHandler.validateProperties(this.schema, data)
    return RequestHandler.postSdo(data).then(sdo => {
      return new HsObject(sdo)
    })
  }

  /**
   * Update sdo
   * @param {String} id
   * @param {Object} data
   */
  updateById (id, data) {
    data.md.r += 1
    ValidationHandler.validateProperties(this.schema, data)
    return RequestHandler.putSdoById(id, data).then(sdo => {
      return new HsObject(sdo)
    })
  }

  /**
   * Delete sdo (only for development)
   * @param {String} id
   * @param {Object} data
   */
  deleteById (id) {
    return RequestHandler.deleteSdoById(id)
  }

  /**
   * Get all sdos from owner and schema
   * @param {Object} data
   * @returns {Promise}
   *
   * @todo Implement options
   */
  findAll (options) {
    return RequestHandler.getSdoByIds(this.schemaHandler.oId, this.schemaHandler.id, options).then(response => {
      var list = []
      for (var sdo in response) {
        list.push(new HsObject(response[sdo]))
      }
      return list
    })
  }

  /**
   * Get sdo by identifier
   * @param {String} id
   * @returns {Promise}
   */
  findById (id) {
    return RequestHandler.getSdoById(id).then(sdo => {
      return new HsObject(sdo)
    })
  }
}

export default Model
