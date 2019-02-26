/** Imports */
const uuid = require('uuid/v4')

/** Export module */
module.exports = class HsBlob {

  /**
   * Construct
   * @param {Object} opts instance object
   */
  constructor (object) {
    if (object === undefined) throw new Error('No options provided for HsBlob')
    this._dataValues = {
        'sdo': {}
    }
    this.initProperties(object)
    this.blobFormData = this.createFormData()
  }

  /**
   * Init properties of instance
   * @param {Object} properties instance properties
   */
  initProperties (properties) {
    for (let field in properties) {
      if(field !== 'files') {
          this._dataValues.sdo[field] = properties[field]
      } else {
          this._dataValues[field] = properties[field]
      }
    }

    for (let key in this._dataValues) {
      Object.defineProperty(this, key, {
        get: function () { return this._dataValues[key] },
        set: function (value) {
          if (this._dataValues[key] !== value) {
            this._dataValues[key] = value
          }
        }
      })
    }
  }

  /**
   * Add global property
   * @param {*} key 
   * @param {*} value 
   */
  addProptery(key, prop) {
    this._dataValues.sdo[key] = prop
    Object.defineProperty(this, key, {
        get: function () { return this._dataValues[key] },
        set: function (value) {
          if (this._dataValues[key] !== value) {
            this._dataValues[key] = value
          }
        }
      })
  }

   /**
   * Add sdo property
   * @param {*} key 
   * @param {*} value 
   */
  addSdoProptery(key, prop) {
    this._dataValues.sdo[key] = prop
    Object.defineProperty(this, key, {
        get: function () { return this._dataValues.sdo[key] },
        set: function (value) {
          if (this._dataValues.sdo[key] !== value) {
            this._dataValues.sdo[key] = value
          }
        }
      })
  }

  /**
   * Crete blob form data
   */
  createFormData() {
    let that = this
    let formData = new FormData()

    let blobRefs = []

    this.files.forEach(function(file, index){
        let uuidRef = uuid()
        blobRefs.push(uuidRef)
        formData.append(blobRefs[index], file)
    })

    this.addSdoProptery("blobRefs", blobRefs)
    formData.append('sdo', JSON.stringify(this._dataValues.sdo))

    return formData
  }
}