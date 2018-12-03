// import hsInstance from './core/hsInstance'

/** Import hsInstance */
const HS_INSTANCE = require('./core/hsInstance.js');

/** String type */
const STRING = 'string'
/** Number type */
const NUMBER = 'number'
/** Integer type */
const INTEGER = 'integer'
/** Boolean type */
const BOOLEAN = 'boolean'

/** Export module */
module.exports = new HealthStorageODM();

/** Get constants */
HealthStorageODM.prototype.HS_INSTANCE = HS_INSTANCE;

/** HealthStorageODM */
function HealthStorageODM() {

  /** Types */
  this.STRING = STRING;
  this.NUMBER = NUMBER;
  this.INTEGER = INTEGER;
  this.BOOLEAN = BOOLEAN;

  /** Define */
  this.define = function(opts) {
    return this.HS_INSTANCE(opts)
  }
}



// console.log(new hsInstance('test', 'test', 'test'))

// const STRING = 'string'
// const NUMBER = 'number'
// const INTEGER = 'integer'
// const BOOLEAN = 'boolean'

// class HealthStorageODM {
//   /**
//    * Define function
//    * @param {String} name Title of the SDO
//    * @param {Object} options Options object
//    */
//   static define (title, properties, options) {
//     return HS_INSTANCE.init(title, properties, options)
//   }

//   /**
//    * Return string type field
//    * @returns  {String}
//    */
//   static get STRING () {
//     return STRING
//   }

//   /**
//    * Return number type field
//    * @returns  {String}
//    */
//   static get NUMBER () {
//     return NUMBER
//   }

//   /**
//    * Return integer type field
//    * @returns  {String}
//    */
//   static get INTEGER () {
//     return INTEGER
//   }

//   /**
//    * Return integer type field
//    * @returns  {String}
//    */
//   static get BOOLEAN () {
//     return BOOLEAN
//   }
// }

// export default HealthStorageODM
