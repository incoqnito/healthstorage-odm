/** Import modules */
const uuid = require('uuid/v4')
const HS_HELPER = require('../lib/HsHelper.js')
const HS_VALIDATION = require('./HsValidation.js')

/** Export module */
module.exports = HsSchema

/** Get constants */
HsSchema.prototype.SCHEMA_DRAFT = 'http://json-schema.org/draft-07/schema#'
HsSchema.prototype.UUID_PATTERN = '^(\\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\\}{0,1})$'
HsSchema.prototype.BTSS_PREFIX = 'urn:btssid:'
HsSchema.prototype.INT_MIN = 1.0
HsSchema.prototype.INT_MAX = 2147483647.0
HsSchema.prototype.NULL = 'null'
HsSchema.prototype.OBJECT = 'object'
HsSchema.prototype.STRING = 'string'
HsSchema.prototype.INTEGER = 'integer'
HsSchema.prototype.DOUBLE = 'double'
HsSchema.prototype.BOOLEAN = 'boolean'
HsSchema.prototype.FORMAT_DATE = 'date-time'

/** HS schema */
function HsSchema (opts) {
  /** Undefined proof */
  if (opts === undefined) throw new Error('No options provided for schema init.')
  if (opts.title === undefined || opts.title.trim() === '') throw new Error('No title provided for schema.')
  if (opts.properties === undefined) throw new Error('No properties provided for schema.')
  if (opts.options === undefined) throw new Error('No options provided for schema.')

  /** properties */
  this.props = {}
  this.props.title = opts.title
  this.props.properties = opts.properties
  this.props.required = opts.options.required
  this.props.id = (opts.options.id !== undefined) ? opts.options.id : uuid()
  this.props.oId = (opts.options.oId !== undefined) ? opts.options.oId : ''
  this.props.r = (opts.options.r !== undefined) ? opts.options.r : 1

  /** Create schema */
  function createSchema (self) {
    var schema = {
      '$schema': self.SCHEMA_DRAFT,
      'title': self.props.title,
      'definitions': {
        'MetadataSdo': {
          'type': [
            self.OBJECT,
            self.NULL
          ],
          'additionalProperties': true,
          'properties': {
            'id': {
              'type': self.STRING,
              'pattern': self.UUID_PATTERN
            },
            'r': {
              'type': self.INTEGER,
              'minimum': self.INT_MIN,
              'maximum': self.INT_MAX
            },
            'eId': {
              'type': [
                self.STRING,
                self.NULL
              ]
            },
            'sId': {
              'type': self.STRING,
              'pattern': self.UUID_PATTERN
            },
            'sr': {
              'type': 'integer',
              'minimum': self.INT_MIN,
              'maximum': self.INT_MAX
            },
            'oId': {
              'type': self.STRING,
              'pattern': self.UUID_PATTERN
            },
            'tsp': {
              'type': self.STRING,
              'format': self.FORMAT_DATE
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
      '$id': self.BTSS_PREFIX + self.props.id + '/' + self.props.r,
      'type': 'object',
      'properties': {
        'md': {
          '$ref': '#/definitions/MetadataSdo'
        }
      },
      'required': self.props.required
    }

    Object.assign(schema.properties, this.properties)

    HS_VALIDATION.validateSchema(schema)

    return schema
  }

  /** schema */
  this.schema = createSchema(this)

  /**
   * Create md data for schema
   * @param {Object} schema
   * @returns {Object}
   */
  this.generateMd = function () {
    var metaFromSchema = HS_HELPER.findValueByPath(this.schema, 'definitions.MetadataSdo.properties')
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
          md[key] = this.id
          break
        case 'sr':
          md[key] = 1
          break
        case 'oId':
          md[key] = this.oId
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
