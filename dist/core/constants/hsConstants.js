"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PROXY = exports.BTSS_PREFIX = exports.UUID_PATTERN = exports.SCHEMA_DRAFT = exports.ASSIGN_TO_CLASS = exports.CLIENT = exports.LOCAL_API_URL = exports.HS_SQL_ADAPTER = exports.HS_STORAGE_ADAPTER = exports.ENDPOINTS = exports.REQUEST_DATA = exports.DELETE = exports.HEAD = exports.PUT = exports.PATCH = exports.POST = exports.GET = exports.MD_DATE = exports.MD_REVISION = exports.MD_ID = exports.DESC = exports.ASC = exports.INT_MAX = exports.INT_MIN = exports.FORMAT_DATE = exports.NULL = exports.DOUBLE = exports.ARRAY = exports.OBJECT = exports.BOOLEAN = exports.INTEGER = exports.NUMBER = exports.STRING = void 0;

/**
 * Type constants
 */
var STRING = "string";
exports.STRING = STRING;
var NUMBER = "number";
exports.NUMBER = NUMBER;
var INTEGER = "integer";
exports.INTEGER = INTEGER;
var BOOLEAN = "boolean";
exports.BOOLEAN = BOOLEAN;
var OBJECT = "object";
exports.OBJECT = OBJECT;
var ARRAY = "array";
exports.ARRAY = ARRAY;
var DOUBLE = "double";
exports.DOUBLE = DOUBLE;
var NULL = "null";
exports.NULL = NULL;
var FORMAT_DATE = "date-time";
exports.FORMAT_DATE = FORMAT_DATE;
var INT_MIN = 1.0;
exports.INT_MIN = INT_MIN;
var INT_MAX = 2147483647.0;
/**
 * Filter constants
 */

exports.INT_MAX = INT_MAX;
var ASC = 'Ascending';
exports.ASC = ASC;
var DESC = 'Descending';
exports.DESC = DESC;
var MD_ID = 'id';
exports.MD_ID = MD_ID;
var MD_REVISION = 'r';
exports.MD_REVISION = MD_REVISION;
var MD_DATE = 'tsp';
/**
 * Api interaction constants
 */

exports.MD_DATE = MD_DATE;
var GET = 'get';
exports.GET = GET;
var POST = 'post';
exports.POST = POST;
var PATCH = 'patch';
exports.PATCH = PATCH;
var PUT = 'put';
exports.PUT = PUT;
var HEAD = 'head';
exports.HEAD = HEAD;
var DELETE = 'delete';
exports.DELETE = DELETE;
var REQUEST_DATA = {
  'requestOptions': {},
  'endpoint': {
    'method': '',
    'type': '',
    'action': '',
    'routeParams': {}
  },
  'params': {}
};
exports.REQUEST_DATA = REQUEST_DATA;
var ENDPOINTS = {
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
      'allRevisions': '/eraser/schemas/{id}/?allRevisions=true'
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
  /**
   * Adpater constants
   */

};
exports.ENDPOINTS = ENDPOINTS;
var HS_STORAGE_ADAPTER = 'hsStorageAdapter';
exports.HS_STORAGE_ADAPTER = HS_STORAGE_ADAPTER;
var HS_SQL_ADAPTER = 'hsSqlAdapter';
/**
 * Local constants
 */

exports.HS_SQL_ADAPTER = HS_SQL_ADAPTER;
var LOCAL_API_URL = 'http://localhost:8080';
/**
 * Default client constant
 */

exports.LOCAL_API_URL = LOCAL_API_URL;
var CLIENT = {
  'serverUrl': LOCAL_API_URL,
  'adapter': HS_STORAGE_ADAPTER,
  'debug': false
  /**
   * Model constants
   */

};
exports.CLIENT = CLIENT;
var ASSIGN_TO_CLASS = ['HsAdapter'];
/**
 * Schema constants
 */

exports.ASSIGN_TO_CLASS = ASSIGN_TO_CLASS;
var SCHEMA_DRAFT = 'http://json-schema.org/draft-07/schema#';
exports.SCHEMA_DRAFT = SCHEMA_DRAFT;
var UUID_PATTERN = '^(\\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\\}{0,1})$';
exports.UUID_PATTERN = UUID_PATTERN;
var BTSS_PREFIX = 'urn:btssid:';
/**
 * PROXY
 */

exports.BTSS_PREFIX = BTSS_PREFIX;
var PROXY = {
  'host': "127.0.0.1",
  'post': 8080
};
exports.PROXY = PROXY;