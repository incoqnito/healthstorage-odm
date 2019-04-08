/**
 * Type constants
 */
export const STRING = "string"
export const NUMBER = "number"
export const INTEGER = "integer"
export const BOOLEAN = "boolean"
export const DATE = "date"
export const OBJECT = "object"
export const ARRAY = "array"
export const DOUBLE = "double"
export const NULL = "null"
export const FORMAT_DATE = "date-time"
export const INT_MIN = 1.0
export const INT_MAX = 2147483647.0

/**
 * Filter constants
 */
export const ASC = 'Ascending'
export const DESC = 'Descending'
export const MD_ID = 'id'
export const MD_REVISION = 'r'
export const MD_DATE = 'tsp'

/**
 * Api interaction constants
 */
export const GET = 'get'
export const POST = 'post'
export const PATCH = 'patch'
export const PUT = 'put'
export const HEAD = 'head'
export const DELETE = 'delete'

export const REQUEST_DATA = {
  'requestOptions': {},
  'endpoint': {
    'method': '',
    'type': '',
    'action': '',
    'routeParams': {}
  },
  'params': {}
}

export const ENDPOINTS = {
  'sdo': {
    'get': {
      'list': '/sdos/{oId}/{sId}',
      'single': '/sdos/{id}',
      'isLocked': '/sdos/{id}/islocked/{lockValue}',
      'lockData': '/sdos/{id}/islocked/{lockValue}',
      'archivedSdos': '/archive/sdos/{id}/{pageNo}/{pageSize}',
      'archivedRevisions': '/archive/sdos/{id}/revisions'
    },
    'post': {
      'list': '/sdos/{oId}/{sId}',
      'add': '/sdos/{id}',
      'lock': '/sdos/{id}/locks',
      'filtered': '/sdos/{oId}/{sId}'
    },
    'put': {
      'edit': '/sdos/{id}',
      'bulkEdit': '/sdos/c/{oId}/{sId}'
    },
    'head': {
      'changed': '/sdos/{id}/{r}',
      'existInLockState': '/sdos/{id}/islocked/{isLocked}'
    },
    'delete': {
      'single': '/eraser/sdos/{id}',
      'unlock': '/sdos/{id}/locks/{lockValue}'
    }
  },
  'schema': {
    'get': {
      'schema': '/schemas/{id}',
      'schemaByRevision': '/schemas/{id}/{r}',
      'validateSdo': '/schemas/validateSdo',
      'list': '/schemas/'
    },
    'post': {
      'create': '/schemas',
      'validateSdo': '/schemas/validateSdo'
    },
    'delete': {
      'allRevisions': '/eraser/schemas/{id}'
    }
  },
  'sdoblobs': {
    'get': {
      'single': '/sdoblobs/{id}',
      'file': '/sdoblobs/{id}/{blobId}'
    },
    'post': {
      'add': '/sdoblobs/{id}'
    },
    'put': {
      'edit': '/sdoblobs/{id}'
    },
    'delete': {
      'single': '/eraser/sdoblobs/{id}'
    }
  }
}

/**
 * Adpater constants
 */
export const HS_STORAGE_ADAPTER = 'hsStorageAdapter'
export const HS_SQL_ADAPTER = 'hsSqlAdapter'

/**
 * Local constants
 */
export const LOCAL_API_URL = 'http://localhost:8080'

/**
 * Default client constant
 */
export const CLIENT = {
  'serverUrl': LOCAL_API_URL,
  'adapter': HS_STORAGE_ADAPTER,
  'debug': false
}

/**
 * Model constants
 */
export const ASSIGN_TO_CLASS = ['HsAdapter']

/**
 * Schema constants
 */
export const SCHEMA_DRAFT = 'http://json-schema.org/draft-07/schema#'
export const UUID_PATTERN = '^(\\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\\}{0,1})$'
export const BTSS_PREFIX = 'urn:btssid:'

/**
 * PROXY
 */
export const PROXY = {
  'host': "127.0.0.1",
  'post': 8080
}

/**
 * FilterRequest
 */
export const FILTER_REQUEST = {
  'take': 0,
  'skip': 0,
  'sort': [{
      'field': 'string',
      'dir': 'string'
  }],
  'filter': {
    'field': 'string',
    'operator': 'string',
    'value': {},
    'logic': 'string',
    'filters': [
      null
    ]
  }
}