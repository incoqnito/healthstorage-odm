/** Import modules */
import uuid from "uuid/v4"
import HsHelper from "./../lib/hsHelper"

/** Constants */
import { SCHEMA_DRAFT } from "./../constants/hsConstants"
import { UUID_PATTERN } from "./../constants/hsConstants"
import { BTSS_PREFIX } from "./../constants/hsConstants"

import { INT_MIN } from "./../constants/hsConstants"
import { INT_MAX } from "./../constants/hsConstants"
import { NULL } from "./../constants/hsConstants"
import { OBJECT } from "./../constants/hsConstants"
import { ARRAY } from "./../constants/hsConstants"
import { STRING } from "./../constants/hsConstants"
import { NUMBER } from "./../constants/hsConstants"
import { INTEGER } from "./../constants/hsConstants"
import { DOUBLE } from "./../constants/hsConstants"
import { BOOLEAN } from "./../constants/hsConstants"
import { FORMAT_DATE } from "./../constants/hsConstants"

class HsSchema {
  /**
   * Construct
   * @param {Object} opts instance object
   */
  constructor (schemaProps) {
    if (schemaProps === undefined) throw new Error('No schema properties provided for HsSchema')
    if (schemaProps.title === undefined || schemaProps.title.trim() === '') throw new Error('No title provided for HsSchema.')
    if (schemaProps.properties === undefined) throw new Error('No properties provided for HsSchema.')
    if (schemaProps.options === undefined) throw new Error('No options provided for HsSchema.')

    this.props = {}
    this.props.title = schemaProps.title
    this.props.properties = schemaProps.properties
    this.props.required = schemaProps.options.required
    this.props.id = (schemaProps.options.id !== undefined) ? schemaProps.options.id : uuid()
    this.props.oId = (schemaProps.options.oId !== undefined) ? schemaProps.options.oId : ''
    this.props.r = (schemaProps.options.r !== undefined) ? schemaProps.options.r : 1

    this.schema = this.createSchema()
  }

  /**
   * Get schema draft version
   * @return {String} SCHEMA_DRAFT
   */
  get SCHEMA_DRAFT () {
    return SCHEMA_DRAFT
  }

  /**
   * Get uuid pattern regex
   * @return {String} UUID_PATTERN
   */
  get UUID_PATTERN () {
    return UUID_PATTERN
  }

  /**
   * Get btss pattern prefix
   * @return {String} BTSS_PREFIX
   */
  get BTSS_PREFIX () {
    return BTSS_PREFIX
  }

  /**
   * Get int min value
   * @return {String} INT_MIN
   */
  get INT_MIN () {
    return INT_MIN
  }

  /**
   * Get int max value
   * @return {String} INT_MAX
   */
  get INT_MAX () {
    return INT_MAX
  }

  /**
   * Get null type
   * @return {String} NULL
   */
  get NULL () {
    return NULL
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
   * Get double type
   * @return {String} DOUBLE
   */
  get DOUBLE () {
    return DOUBLE
  }

  /**
   * Get boolean type
   * @return {String} BOOLEAN
   */
  get BOOLEAN () {
    return BOOLEAN
  }

  /**
   * Get format date type
   * @return {String} FORMAT_DATE
   */
  get FORMAT_DATE () {
    return FORMAT_DATE
  }

  /**
   * Create schema
   * @return {Object} schema
   */
  createSchema () {
    var schema = {
      '$schema': this.SCHEMA_DRAFT,
      'title': this.props.title,
      'definitions': {
        'MetadataSdo': {
          'type': [
            this.OBJECT,
            this.NULL
          ],
          'additionalProperties': true,
          'properties': {
            'id': {
              'type': this.STRING,
              'pattern': this.UUID_PATTERN
            },
            'r': {
              'type': this.INTEGER,
              'minimum': this.INT_MIN,
              'maximum': this.INT_MAX
            },
            'eId': {
              'type': [
                this.STRING,
                this.NULL
              ]
            },
            'sId': {
              'type': this.STRING,
              'pattern': this.UUID_PATTERN
            },
            'sr': {
              'type': 'integer',
              'minimum': this.INT_MIN,
              'maximum': this.INT_MAX
            },
            'oId': {
              'type': this.STRING,
              'pattern': this.UUID_PATTERN
            },
            'tsp': {
              'type': this.STRING,
              'format': this.FORMAT_DATE
            }
          },
          'required': [
            'id',
            'r',
            'eId',
            'sId',
            'sr',
            'oId',
            'tsp'
          ]
        }
      },
      '$id': this.BTSS_PREFIX + this.props.id + '/' + this.props.r,
      'type': 'object',
      'properties': {
        'md': {
          '$ref': '#/definitions/MetadataSdo'
        }
      },
      'required': this.props.required
    }

    Object.assign(schema.properties, this.properties)

    return schema
  }

  /**
   * Create md data for schema
   * @param {Object} schema
   * @returns {Object}
   */
  generateMd () {
    var metaFromSchema = HsHelper.findValueByPath(this.schema, 'definitions.MetadataSdo.properties')
    var md = {}
    for (var key in metaFromSchema) {
      switch (key) {
        case 'id':
          md[key] = uuid()
          break
        case 'r':
          md[key] = 1
          break
        case 'sId':
          md[key] = this.props.id
          break
        case 'sr':
          md[key] = 1
          break
        case 'oId':
          md[key] = this.props.oId
          break
        case 'tsp':
          md[key] = new Date().toISOString()
          break
        default:
          md[key] = ''
          break
      }
    }
    return md
  }
}

export default HsSchema