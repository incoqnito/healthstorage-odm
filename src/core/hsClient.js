/** Import modules */
import HsModel from "./hsModel"
import HsSchema from "./handler/hsSchema"
import HsAdapter from "./handler/hsAdapter"

/** constants */
import {
  STRING, NUMBER, INTEGER, BOOLEAN, OBJECT, ARRAY, DATE
} from './constants/hsConstants'

/** Export module */
class HsClient {

  /**
   * Constructor
   * @param {Object} client client object
   */
  constructor (client) {
    this.client = client
  }

  /**
   * Get string type
   * @return {String} STRING
   */
  get STRING () {
    return STRING
  }

  /**
   * Get number type
   * @return {String} NUMBER
   */
  get NUMBER () {
      return NUMBER
  }

  /**
   * Get integer type
   * @return {String} INTEGER
   */
  get INTEGER () {
      return INTEGER
  }

  /**
   * Get boolean type
   * @return {String} BOOLEAN
   */
  get BOOLEAN () {
      return BOOLEAN
  }

  /**
   * Get object type
   * @return {String} OBJECT
   */
  get OBJECT () {
      return OBJECT
  }

  /**
   * Get array type
   * @return {String} ARRAY
   */
  get ARRAY () {
      return ARRAY
  }

  /**
   * Get date type
   * @return {String} DATE
   */
  get DATE () {
      return DATE
  }

  /**
   * Static define
   * @param {Object} opts define object
   * @returns {Instance} HsModel
   */
  define (identifier, opts) {
    HsModel.instance(new HsSchema(opts), new HsAdapter(this.client), identifier)
    return HsModel
  }
}

export default HsClient
