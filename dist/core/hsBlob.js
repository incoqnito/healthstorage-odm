"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** Imports */
var uuid = require('uuid/v4');
/** Export module */


var HsBlob =
/*#__PURE__*/
function () {
  /**
   * Construct
   * @param {Object} opts instance object
   */
  function HsBlob(object) {
    _classCallCheck(this, HsBlob);

    if (object === undefined) throw new Error('No options provided for HsBlob');
    this._dataValues = {
      'sdo': {}
    };
    this.initProperties(object);
    this.blobFormData = this.createFormData();
  }
  /**
   * Init properties of instance
   * @param {Object} properties instance properties
   */


  _createClass(HsBlob, [{
    key: "initProperties",
    value: function initProperties(properties) {
      var _this = this;

      for (var field in properties) {
        if (field !== 'files') {
          this._dataValues.sdo[field] = properties[field];
        } else {
          this._dataValues[field] = properties[field];
        }
      }

      var _loop = function _loop(key) {
        Object.defineProperty(_this, key, {
          get: function get() {
            return this._dataValues[key];
          },
          set: function set(value) {
            if (this._dataValues[key] !== value) {
              this._dataValues[key] = value;
            }
          }
        });
      };

      for (var key in this._dataValues) {
        _loop(key);
      }
    }
    /**
     * Add global property
     * @param {*} key 
     * @param {*} value 
     */

  }, {
    key: "addProptery",
    value: function addProptery(key, prop) {
      this._dataValues.sdo[key] = prop;
      Object.defineProperty(this, key, {
        get: function get() {
          return this._dataValues[key];
        },
        set: function set(value) {
          if (this._dataValues[key] !== value) {
            this._dataValues[key] = value;
          }
        }
      });
    }
    /**
    * Add sdo property
    * @param {*} key 
    * @param {*} value 
    */

  }, {
    key: "addSdoProptery",
    value: function addSdoProptery(key, prop) {
      this._dataValues.sdo[key] = prop;
      Object.defineProperty(this, key, {
        get: function get() {
          return this._dataValues.sdo[key];
        },
        set: function set(value) {
          if (this._dataValues.sdo[key] !== value) {
            this._dataValues.sdo[key] = value;
          }
        }
      });
    }
    /**
     * Crete blob form data
     */

  }, {
    key: "createFormData",
    value: function createFormData() {
      var formData = new FormData();
      var blobRefs = [];
      this.files.forEach(function (file, index) {
        var uuidRef = uuid();
        blobRefs.push(uuidRef);
        formData.append(blobRefs[index], file, file.name);
      });
      this.addSdoProptery("blobRefs", blobRefs);
      formData.append('sdo', JSON.stringify(this._dataValues.sdo));
      return formData;
    }
  }]);

  return HsBlob;
}();

var _default = HsBlob;
exports.default = _default;