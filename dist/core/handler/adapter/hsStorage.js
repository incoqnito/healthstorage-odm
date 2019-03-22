"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _hsConstants = require("./../../constants/hsConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var QSTRING = require('query-string');
/** Constants */


var HsStorage =
/*#__PURE__*/
function () {
  /**
   * Construct
   * @param {Object} client client object
   */
  function HsStorage(client) {
    _classCallCheck(this, HsStorage);

    if (client === undefined) throw new Error('No instance options provided for HsAdapter');
    this.client = client;
  }
  /**
   * Get Endpoints
   * @returns {Object} ENDPOINTS api endpoints
   */


  _createClass(HsStorage, [{
    key: "buildRequestUrl",

    /**
     * Build request url
     * @param {Object} endpoint
     * @returns {String}
     */
    value: function buildRequestUrl(endpoint) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var queryString = '';
      var url = this.ENDPOINTS[endpoint.type][endpoint.method][endpoint.action];

      for (var idx in endpoint.routeParams) {
        url = url.replace('{' + idx + '}', endpoint.routeParams[idx]);
      }

      if (params !== undefined && params !== '' && params !== {}) queryString = QSTRING.stringify(params);
      if (queryString !== '') queryString = "?".concat(queryString);
      return this.client.serverUrl + url + queryString;
    }
    /**
     * Get schema
     * @param {Object} schema
     * @returns {Promise}
     */

  }, {
    key: "getSchema",
    value: function getSchema(opts) {
      var _this = this;

      _axios.default.defaults.headers.common = opts.requestOptions.headers;
      return _axios.default.get(this.buildRequestUrl(opts.endpoint)).then(function (response) {
        return response.data;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this.createError(error.response.statusText, error.response.status, "getSchema()");
        } else {
          throw _this.createError(500, 'Internal API Service Error', "getSchema()");
        }
      });
    }
    /**
     * Get schemas
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "getSchemas",
    value: function getSchemas(opts) {
      var _this2 = this;

      _axios.default.defaults.headers.common = opts.requestOptions.headers;
      return _axios.default.get(this.buildRequestUrl(opts.endpoint, opts.params)).then(function (response) {
        return response.data;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this2.createError(error.response.statusText, error.response.status, "getSchemas()");
        } else {
          throw _this2.createError(500, 'Internal API Service Error', "getSchemas()");
        }
      });
    }
    /**
     * Create schema
     * @param {Object} schema
     * @returns {Promise}
     */

  }, {
    key: "createSchema",
    value: function createSchema(opts) {
      var _this3 = this;

      return _axios.default.post(this.buildRequestUrl(opts.endpoint), JSON.stringify(opts.params), opts.requestOptions).then(function (response) {
        return response.data.schema;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this3.createError(error.response.statusText, error.response.status, "createSchema()");
        } else {
          throw _this3.createError(500, 'Internal API Service Error', "createSchema()");
        }
      });
    }
    /**
     * Delete schema
     * @param {String} schemaId
     * @returns {Promise}
     */

  }, {
    key: "deleteSchema",
    value: function deleteSchema(opts) {
      var _this4 = this;

      return _axios.default.delete(this.buildRequestUrl(opts.endpoint), opts.requestOptions).then(function (response) {
        return response.status === 204;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this4.createError(error.response.statusText, error.response.status, "deleteSchema()");
        } else {
          throw _this4.createError(500, 'Internal API Service Error', "deleteSchema()");
        }
      });
    }
    /**
     * Validate against schema
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "validateSdo",
    value: function validateSdo(opts) {
      var _this5 = this;

      return _axios.default.post(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions).then(function (response) {
        return response.status === 200;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this5.createError(error.response.statusText, error.response.status, "validateSdo()");
        } else {
          throw _this5.createError(500, 'Internal API Service Error', "validateSdo()");
        }
      });
    }
    /**
     * Get sdos
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "getSdos",
    value: function getSdos(opts) {
      var _this6 = this;

      _axios.default.defaults.headers.common = opts.requestOptions.headers;
      return _axios.default.get(this.buildRequestUrl(opts.endpoint, opts.params), opts.requestOptions).then(function (response) {
        return response.data === undefined ? response.status : {
          body: response.data,
          headers: response.headers
        };
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this6.createError(error.response.statusText, error.response.status, "getSdos()");
        } else {
          throw _this6.createError(500, 'Internal API Service Error', "getSdos()");
        }
      });
    }
    /**
     * Get sdos filtered
     * @param {Object} opts
     * @returns {Promise}
     * @issue Throws API errors. Error 500
     */

  }, {
    key: "getSdosFiltered",
    value: function getSdosFiltered(opts) {
      var _this7 = this;

      return _axios.default.post(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions).then(function (response) {
        return response.data === undefined ? response.status : {
          body: response.data,
          headers: response.headers
        };
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this7.createError(error.response.statusText, error.response.status, "getSdosFiltered()");
        } else {
          throw _this7.createError(500, 'Internal API Service Error', "getSdosFiltered()");
        }
      });
    }
    /**
     * Get sdo
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "getSdo",
    value: function getSdo(opts) {
      var _this8 = this;

      return _axios.default.get(this.buildRequestUrl(opts.endpoint)).then(function (response) {
        return response.data === undefined ? response.status : response.data;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this8.createError(error.response.statusText, error.response.status, "getSdo()");
        } else {
          throw _this8.createError(500, 'Internal API Service Error', "getSdo()");
        }
      });
    }
    /**
     * Create sdo
     * @param {Object} opts
     * @returns {Promise}
     * @issue API needs to return created sdo (defaults)
     */

  }, {
    key: "createSdo",
    value: function createSdo(opts) {
      var _this9 = this;

      return _axios.default.post(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions).then(function (response) {
        return response.status === 201 ? JSON.parse(response.config.data) : response.status;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this9.createError(error.response.statusText, error.response.status, "createSdo()");
        } else {
          throw _this9.createError(500, 'Internal API Service Error', "createSdo()");
        }
      });
    }
    /**
     * Edit sdo
     * @param {Object} opts
     * @returns {Promise}
     * @issue API needs to return edited sdo
     */

  }, {
    key: "editSdo",
    value: function editSdo(opts) {
      var _this10 = this;

      return _axios.default.put(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions).then(function (response) {
        return opts.params;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this10.createError(error.response.statusText, error.response.status, "editSdo()");
        } else {
          throw _this10.createError(500, 'Internal API Service Error', "editSdo()");
        }
      });
    }
    /**
     * Delete sdo
     * @param {Object} opts
     * @returns {Promise}
     * @issue API should return the deleted uuid after success
     */

  }, {
    key: "deleteSdo",
    value: function deleteSdo(opts) {
      var _this11 = this;

      return _axios.default.delete(this.buildRequestUrl(opts.endpoint), opts.requestOptions).then(function (response) {
        return response.status === 204 ? opts.endpoint.routeParams.id : false;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this11.createError(error.response.statusText, error.response.status, "deleteSdo()");
        } else {
          throw _this11.createError(500, 'Internal API Service Error', "deleteSdo()");
        }
      });
    }
    /**
     * Edit sdos in bulk action
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "editSdosBulk",
    value: function editSdosBulk(opts) {
      var _this12 = this;

      return _axios.default.put(this.buildRequestUrl(opts.endpoint), opts.params, opts.requestOptions).then(function (response) {
        return response;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this12.createError(error.response.statusText, error.response.status, "editSdosBulk()");
        } else {
          throw _this12.createError(500, 'Internal API Service Error', "editSdosBulk()");
        }
      });
    }
    /**
     * Changed sdo
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "sdoHasChanged",
    value: function sdoHasChanged(opts) {
      var _this13 = this;

      return _axios.default.head(this.buildRequestUrl(opts.endpoint), opts.requestOptions).then(function (response) {
        return response;
      }).catch(function (error) {
        if (error.response.status === 304) {
          return false;
        } else {
          if (error.response !== undefined && error.response.status !== undefined) {
            throw _this13.createError(error.response.statusText, error.response.status, "sdoHasChanged()");
          } else {
            throw _this13.createError(500, 'Internal API Service Error', "sdoHasChanged()");
          }
        }
      });
    }
    /**
     * Lock item
     * @param {Object} opts
     * @returns {Promise}
     * @issue API throws 500 error when sod is locked, unlocked and locked again
     * @issue No way to keep lockValue on item. For now stored in local storage, and restored on list load to item
     */

  }, {
    key: "lockItem",
    value: function lockItem(opts) {
      var _this14 = this;

      return _axios.default.post(this.buildRequestUrl(opts.endpoint), opts.requestOptions).then(function (response) {
        return response.status === 201 ? response.data : response.status;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this14.createError(error.response.statusText, error.response.status, "lockItem()");
        } else {
          throw _this14.createError(500, 'Internal API Service Error', "lockItem()");
        }
      });
    }
    /**
     * Unlock item
     * @param {Object} opts
     * @returns {Promise}
     * @issue API throws 500 error when sod is locked, unlocked and locked again
     * @issue No way to keep lockValue on item. For now removed from local storage
     */

  }, {
    key: "unlockItem",
    value: function unlockItem(opts) {
      var _this15 = this;

      return _axios.default.delete(this.buildRequestUrl(opts.endpoint), opts.requestOptions).then(function (response) {
        return response.status === 204;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this15.createError(error.response.statusText, error.response.status, "unlockItem()");
        } else {
          throw _this15.createError(500, 'Internal API Service Error', "unlockItem()");
        }
      });
    }
    /**
     * Get lock data from item
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "getLockData",
    value: function getLockData(opts) {
      var _this16 = this;

      return _axios.default.get(this.buildRequestUrl(opts.endpoint), opts.requestOptions).then(function (response) {
        return response.data;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this16.createError(error.response.statusText, error.response.status, "getLockData()");
        } else {
          throw _this16.createError(500, 'Internal API Service Error', "getLockData()");
        }
      });
    }
    /**
     * Check item is locked
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "isLockedItem",
    value: function isLockedItem(opts) {
      var _this17 = this;

      return _axios.default.get(this.buildRequestUrl(opts.endpoint), opts.requestOptions).then(function (response) {
        return response.data.isLocked;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this17.createError(error.response.statusText, error.response.status, "isLockedItem()");
        } else {
          throw _this17.createError(500, 'Internal API Service Error', "isLockedItem()");
        }
      });
    }
    /**
     * Check if item exists in lock state
     * @param {Object} opts
     * @returns {Promise}
     * @issue API should return true or false, would be better than 204 or 404
     */

  }, {
    key: "existInLockState",
    value: function existInLockState(opts) {
      var _this18 = this;

      return _axios.default.head(this.buildRequestUrl(opts.endpoint), opts.requestOptions).then(function (response) {
        return response;
      }).catch(function (error) {
        if (error.response.status === 404) {
          return false;
        } else {
          if (error.response !== undefined && error.response.status !== undefined) {
            throw _this18.createError(error.response.statusText, error.response.status, "existInLockState()");
          } else {
            throw _this18.createError(500, 'Internal API Service Error', "existInLockState()");
          }
        }
      });
    }
    /**
     * Get archive for sdo identifier
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "getSdoArchive",
    value: function getSdoArchive(opts) {
      var _this19 = this;

      return _axios.default.get(this.buildRequestUrl(opts.endpoint)).then(function (response) {
        return response.data === undefined ? response.status : {
          body: response.data,
          headers: response.headers
        };
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this19.createError(error.response.statusText, error.response.status, "getSdoArchive()");
        } else {
          throw _this19.createError(500, 'Internal API Service Error', "getSdoArchive()");
        }
      });
    }
    /**
     * Get archived revision numbers for sdo identifier
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "getSdoRevisionsArchive",
    value: function getSdoRevisionsArchive(opts) {
      var _this20 = this;

      return _axios.default.get(this.buildRequestUrl(opts.endpoint)).then(function (response) {
        return response.data === undefined ? response.status : response.data;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this20.createError(error.response.statusText, error.response.status, "getSdoRevisionsArchive()");
        } else {
          throw _this20.createError(500, 'Internal API Service Error', "getSodsRevisionsArchive()");
        }
      });
    }
    /**
     * Get sdoblob
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "getSdoBlob",
    value: function getSdoBlob(opts) {
      var _this21 = this;

      _axios.default.defaults.headers.common = opts.requestOptions.headers;
      return _axios.default.get(this.buildRequestUrl(opts.endpoint), opts.requestOptions.headers).then(function (response) {
        return response.data === undefined ? response.status : response.data;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this21.createError(error.response.statusText, error.response.status, "getSdoBlob()");
        } else {
          throw _this21.createError(500, 'Internal API Service Error', "getSdoBlob()");
        }
      });
    }
    /**
     * Get blob file
     * @param {Object} opts
     * @returns {Promise}
     */

  }, {
    key: "getSdoBlobFile",
    value: function getSdoBlobFile(opts) {
      var _this22 = this;

      _axios.default.defaults.headers.common = opts.requestOptions.headers;
      return _axios.default.get(this.buildRequestUrl(opts.endpoint), opts.requestOptions.headers).then(function (response) {
        return response.data === undefined ? response.status : response.data;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this22.createError(error.response.statusText, error.response.status, "getSdoBlob()");
        } else {
          throw _this22.createError(500, 'Internal API Service Error', "getSdoBlob()");
        }
      });
    }
    /**
     * Create sdoblob
     * @param {Object} opts
     * @returns {Promise}
     * @issue API needs to return created sdo (defaults)
     */

  }, {
    key: "createSdoBlob",
    value: function createSdoBlob(opts) {
      var _this23 = this;

      _axios.default.defaults.headers.common = opts.requestOptions.headers;
      return _axios.default.post(this.buildRequestUrl(opts.endpoint), opts.params).then(function (response) {
        return response !== undefined && response.status === 201 ? response : false;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this23.createError(error.response.statusText, error.response.status, "updateSdoBlob()");
        } else {
          throw _this23.createError(500, 'Internal API Service Error', "updateSdoBlob()");
        }
      });
    }
    /**
     * Update sdoblob
     * @param {Object} opts
     * @returns {Promise}
     * @issue API needs to return created sdo (defaults)
     */

  }, {
    key: "updateSdoBlob",
    value: function updateSdoBlob(opts) {
      var _this24 = this;

      _axios.default.defaults.headers.common = opts.requestOptions.headers;
      return _axios.default.post(this.buildRequestUrl(opts.endpoint), opts.params).then(function (response) {
        return response !== undefined && response.status === 201 ? response : false;
      }).catch(function (error) {
        if (error.response !== undefined && error.response.status !== undefined) {
          throw _this24.createError(error.response.statusText, error.response.status, "updateSdoBlob()");
        } else {
          throw _this24.createError(500, 'Internal API Service Error', "updateSdoBlob()");
        }
      });
    }
    /**
     * 
     * @param {*} message 
     * @param {*} status 
     */

  }, {
    key: "createError",
    value: function createError(message, status) {
      var callee = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'No information passed';
      var error = new Error(message);
      error.status = status;
      error.callee = callee;
      return error;
    }
  }, {
    key: "ENDPOINTS",
    get: function get() {
      return _hsConstants.ENDPOINTS;
    }
  }]);

  return HsStorage;
}();

var _default = HsStorage;
exports.default = _default;