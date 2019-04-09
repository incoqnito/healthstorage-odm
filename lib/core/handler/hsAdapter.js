"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hsStorage = _interopRequireDefault(require("./adapter/hsStorage"));

var _hsConstants = require("./../constants/hsConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HsAdapter =
/*#__PURE__*/
function () {
  /**
   * Construct
   * @param {Object} client client object
   */
  function HsAdapter(client) {
    _classCallCheck(this, HsAdapter);

    if (client === undefined) throw new Error('No client provided for HsAdapter');
    if (client.adapter === undefined) throw new Error('No adapter provided for HsAdapter');
    this.client = client;
    this.adapter = new _hsStorage.default(client);
  }
  /**
   * Get REQUEST_DATA type string
   * @return {String} REQUEST_DATA
   */


  _createClass(HsAdapter, [{
    key: "getSchema",

    /**
     * Get schema by params adapter mapping
     * @param {Object} routeParams using sId and/nand revision
     * @param {String} action schema or schemaByRevision
     * @returns {Promise}
     */
    value: function getSchema(sId) {
      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var routeParams = {
        'id': sId
      };
      var action = 'schema';

      if (r !== '') {
        routeParams.r = r;
        action = 'schemaByRevison';
      }

      return this.adapter.getSchema(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'accept': 'application/schema+json'
          }
        },
        'endpoint': {
          'method': this.GET,
          'type': 'schema',
          'action': action,
          'routeParams': routeParams
        }
      }));
    }
    /**
     * Get schemas by params adapter mapping
     * @param {Object} sIds joined sIds
     * @returns {Promise}
     * @issue api not working at this call
     */

  }, {
    key: "getSchemas",
    value: function getSchemas(sIds) {
      return this.adapter.getSchemas(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'accept': 'application/schema+json'
          }
        },
        'endpoint': {
          'method': this.GET,
          'type': 'schema',
          'action': 'list'
        },
        'params': {
          'ids': sIds
        }
      }));
    }
    /**
     * Create schema adapter mapping
     * @param {Object} sdo
     * @returns {Promise}
     */

  }, {
    key: "createSchema",
    value: function createSchema(schema) {
      return this.adapter.createSchema(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'accept': 'application/vnd.bt.btss+json',
            'Content-Type': 'application/schema+json'
          }
        },
        'endpoint': {
          'method': this.POST,
          'type': 'schema',
          'action': 'create'
        },
        'params': schema
      }));
    }
    /**
     * Delete schema by id adapter mapping
     * @param {Object} sdo
     * @returns {Promise}
     */

  }, {
    key: "deleteSchema",
    value: function deleteSchema(sId) {
      return this.adapter.deleteSchema(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'Content-Type': 'application/json'
          }
        },
        'endpoint': {
          'method': this.DELETE,
          'type': 'schema',
          'action': 'allRevisions',
          'routeParams': {
            'id': sId
          }
        }
      }));
    }
    /**
     * Validate sdo against schema adapter mapping
     * @param {Object} sdo
     * @returns {Promise}
     */

  }, {
    key: "validateSdo",
    value: function validateSdo(sdo) {
      return this.adapter.validateSdo(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'responseType': 'application/json',
            'Content-Type': 'application/json'
          }
        },
        'endpoint': {
          'method': this.POST,
          'type': 'schema',
          'action': 'validateSdo',
          'routeParams': {
            'id': sdo.md.id
          }
        },
        'params': sdo
      }));
    }
    /**
     * Get sdos adapter mapping
     * @param {String} oId
     * @param {String} sId
     * @param {Object} filter
     * @returns {Promise}
     */

  }, {
    key: "getSdos",
    value: function getSdos(oId, sId) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        filter: undefined
      };

      if (options.filter === undefined) {
        return this.adapter.getSdos(_objectSpread({}, this.REQUEST_DATA, {
          'requestOptions': {
            'accept': 'application/json'
          },
          'endpoint': {
            'method': this.GET,
            'type': 'sdo',
            'action': 'list',
            'routeParams': {
              'oId': oId,
              'sId': sId
            }
          },
          'params': options
        }));
      } else {
        return this.adapter.getSdosFiltered(_objectSpread({}, this.REQUEST_DATA, {
          'requestOptions': {
            'headers': {
              'Content-Type': 'application/json',
              'responseType': 'application/json'
            }
          },
          'endpoint': {
            'method': this.POST,
            'type': 'sdo',
            'action': 'filtered',
            'routeParams': {
              'oId': oId,
              'sId': sId
            }
          },
          'param': options.filter
        }));
      }
    }
    /**
     * Get sdo by id oder where
     * @param {Object} opts
     */

  }, {
    key: "getSdo",
    value: function getSdo(opts) {
      if (opts.id !== undefined && opts.filter !== undefined) {
        return this.adapter.getSdo(_objectSpread({}, this.REQUEST_DATA, {
          'endpoint': {
            'method': this.GET,
            'type': 'sdo',
            'action': 'single',
            'routeParams': {
              'id': opts.id
            }
          }
        }));
      } else {
        return this.adapter.getSdo(_objectSpread({}, this.REQUEST_DATA, {
          'endpoint': {
            'method': this.GET,
            'type': 'sdo',
            'action': 'single',
            'routeParams': {
              'id': opts.id
            }
          }
        }));
      }
    }
    /**
     * Add sdo adapter mapping
     * @param {Object} sdo
     * @returns {Promise}
     */

  }, {
    key: "createSdo",
    value: function createSdo(sdo) {
      return this.adapter.createSdo(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.POST,
          'type': 'sdo',
          'action': 'add',
          'routeParams': {
            'id': sdo.md.id
          }
        },
        'params': sdo
      }));
    }
    /**
     * Edit sdo adapter mapping
     * @param {Object} sdo
     * @returns {Promise}
     */

  }, {
    key: "editSdo",
    value: function editSdo(sdo) {
      return this.adapter.editSdo(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.PUT,
          'type': 'sdo',
          'action': 'edit',
          'routeParams': {
            'id': sdo.md.id
          }
        },
        'params': sdo
      }));
    }
    /**
     * Delete sdo mapping
     * @param {Object} sdo
     */

  }, {
    key: "deleteSdo",
    value: function deleteSdo(sdoId) {
      return this.adapter.deleteSdo(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.DELETE,
          'type': 'sdo',
          'action': 'single',
          'routeParams': {
            'id': sdoId
          }
        }
      }));
    }
    /**
     * Edit sdo bulk adapter mapping
     * @param {Object} sdos
     * @returns {Promise}
     */

  }, {
    key: "editSdosBulk",
    value: function editSdosBulk(sdos) {
      return this.adapter.editSdo(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.PUT,
          'type': 'sdo',
          'action': 'bulkEdit',
          'routeParams': {
            'oId': sdos[0].md.oId,
            'sId': sdos[0].md.sId
          }
        },
        'params': sdos
      }));
    }
    /**
     * Changed sdo adapter mapping
     * @param {Object} sdo
     * @returns {Promise}
     */

  }, {
    key: "sdoHasChanged",
    value: function sdoHasChanged(sdoId, r) {
      return this.adapter.sdoHasChanged(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.HEAD,
          'type': 'sdo',
          'action': 'changed',
          'routeParams': {
            'id': sdoId,
            'r': r
          }
        }
      }));
    }
    /**
     * Lock sdo mapping
     * @param {Object} sdo
     */

  }, {
    key: "lockItem",
    value: function lockItem(sdoId) {
      return this.adapter.lockItem(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'accept': 'application/json',
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.POST,
          'type': 'sdo',
          'action': 'lock',
          'routeParams': {
            'id': sdoId
          }
        }
      }));
    }
    /**
     * Unlock sdo mapping
     * @param {Object} sdo
     */

  }, {
    key: "unlockItem",
    value: function unlockItem(sdoId, lockValueId) {
      return this.adapter.unlockItem(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'accept': 'application/json',
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.DELETE,
          'type': 'sdo',
          'action': 'unlock',
          'routeParams': {
            'id': sdoId,
            'lockValue': lockValueId
          }
        }
      }));
    }
    /**
     * Get lock data mapping
     * @param {Object} sdo
     */

  }, {
    key: "getLockData",
    value: function getLockData(sdoId, lockValueId) {
      return this.adapter.getLockData(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'accept': 'application/json',
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.GET,
          'type': 'sdo',
          'action': 'lockData',
          'routeParams': {
            'id': sdoId,
            'lockValueId': lockValueId
          }
        }
      }));
    }
    /**
     * Is locked sdo mapping
     * @param {String} sdoId
     * @param {String} lockValueId
     */

  }, {
    key: "isLockedItem",
    value: function isLockedItem(sdoId, lockValueId) {
      return this.adapter.isLockedItem(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'accept': 'application/json',
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.GET,
          'type': 'sdo',
          'action': 'isLocked',
          'routeParams': {
            'id': sdoId,
            'lockValue': lockValueId
          }
        }
      }));
    }
    /**
     * Exists in lock state sdo mapping
     * @param {Object} sdoId
     */

  }, {
    key: "existInLockState",
    value: function existInLockState(sdoId, lockState) {
      return this.adapter.existInLockState(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'accept': 'application/json',
            'responseType': 'application/json'
          }
        },
        'endpoint': {
          'method': this.HEAD,
          'type': 'sdo',
          'action': 'existInLockState',
          'routeParams': {
            'id': sdoId,
            'isLocked': lockState
          }
        }
      }));
    }
    /**
     * Get archive by sdo mapping
     * @param {String} sdoId
     * @param {Integer} pageNum
     * @param {Integer} pageSize
     */

  }, {
    key: "getSdoArchive",
    value: function getSdoArchive(sdoId, pageNo, pageSize) {
      return this.adapter.getSdoArchive(_objectSpread({}, this.REQUEST_DATA, {
        'endpoint': {
          'method': this.GET,
          'type': 'sdo',
          'action': 'archivedSdos',
          'routeParams': {
            'id': sdoId,
            'pageNo': pageNo,
            'pageSize': pageSize
          }
        }
      }));
    }
    /**
     * Get archive by sdo mapping
     * @param {String} id
     * @param {Integer} pageNum
     * @param {Integer} pageSize
     */

  }, {
    key: "getSdoRevisionsArchive",
    value: function getSdoRevisionsArchive(id) {
      return this.adapter.getSdoRevisionsArchive(_objectSpread({}, this.REQUEST_DATA, {
        'endpoint': {
          'method': this.GET,
          'type': 'sdo',
          'action': 'archivedRevisions',
          'routeParams': {
            'id': id
          }
        }
      }));
    }
    /**
    * Get sdo blob by id oder where
    * @param {Object} opts
    */

  }, {
    key: "getSdoBlob",
    value: function getSdoBlob(opts) {
      if (opts.id !== undefined) {
        return this.adapter.getSdoBlob(_objectSpread({}, this.REQUEST_DATA, {
          'requestOptions': {
            'headers': {
              'accept': 'multipart/form-data',
              'responseType': 'blob'
            }
          },
          'endpoint': {
            'method': this.GET,
            'type': 'sdoblobs',
            'action': 'single',
            'routeParams': {
              'id': opts.id
            }
          }
        }));
      } else {// Todo implement filter
      }
    }
    /**
     * Create sdoBlob
     * @param {*} sdoBlob
     */

  }, {
    key: "createSdoBlob",
    value: function createSdoBlob(sdoBlob) {
      var sdo = JSON.parse(sdoBlob.get('sdo'));
      return this.adapter.createSdoBlob(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'Content-Type': 'multpart/form-data'
          }
        },
        'endpoint': {
          'method': this.POST,
          'type': 'sdoblobs',
          'action': 'add',
          'routeParams': {
            'id': sdo.md.id
          }
        },
        'params': sdoBlob
      }));
    }
    /**
     * Get sdo blob by id oder where
     * @param {Object} opts
     */

  }, {
    key: "getSdoBlobFile",
    value: function getSdoBlobFile(opts) {
      if (opts.id !== undefined) {
        return this.adapter.getSdoBlobFile(_objectSpread({}, this.REQUEST_DATA, {
          'requestOptions': {
            'headers': {
              'accept': 'multipart/form-data',
              'responseType': 'blob'
            }
          },
          'endpoint': {
            'method': this.GET,
            'type': 'sdoblobs',
            'action': 'file',
            'routeParams': {
              'id': opts.id,
              'blobId': opts.blobId
            }
          }
        }));
      } else {// Todo implement filter
      }
    }
    /**
     * Create sdoBlob
     * @param {*} sdoBlob
     */

  }, {
    key: "updateSdoBlob",
    value: function updateSdoBlob(sdoBlob) {
      var sdo = JSON.parse(sdoBlob.get('sdo'));
      return this.adapter.updateSdoBlob(_objectSpread({}, this.REQUEST_DATA, {
        'requestOptions': {
          'headers': {
            'Content-Type': 'multpart/form-data'
          }
        },
        'endpoint': {
          'method': this.PUT,
          'type': 'sdoblobs',
          'action': 'edit',
          'routeParams': {
            'id': sdo.md.id
          }
        },
        'params': sdoBlob
      }));
    }
  }, {
    key: "REQUEST_DATA",
    get: function get() {
      return _hsConstants.REQUEST_DATA;
    }
    /**
     * Get GET type string
     * @return {String} GET
     */

  }, {
    key: "GET",
    get: function get() {
      return _hsConstants.GET;
    }
    /**
     * Get POST type string
     * @return {String} POST
     */

  }, {
    key: "POST",
    get: function get() {
      return _hsConstants.POST;
    }
    /**
     * Get PUT type string
     * @return {String} PUT
     */

  }, {
    key: "PUT",
    get: function get() {
      return _hsConstants.PUT;
    }
    /**
     * Get PATCH type string
     * @return {String} PATCH
     */

  }, {
    key: "PATCH",
    get: function get() {
      return _hsConstants.PATCH;
    }
    /**
     * Get HEAD type string
     * @return {String} HEAD
     */

  }, {
    key: "HEAD",
    get: function get() {
      return _hsConstants.HEAD;
    }
    /**
     * Get DELETE type string
     * @return {String} DELETE
     */

  }, {
    key: "DELETE",
    get: function get() {
      return _hsConstants.DELETE;
    }
    /**
     * Get PROXY type string
     * @return {String} PROXY
     */

  }, {
    key: "PROXY",
    get: function get() {
      return _hsConstants.PROXY;
    }
  }]);

  return HsAdapter;
}();

var _default = HsAdapter;
exports.default = _default;