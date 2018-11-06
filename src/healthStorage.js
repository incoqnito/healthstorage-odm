'use-strict';

import Model from "./helper/model";

const STRING = "string";
const NUMBER = "number";
const INTEGER = "integer";
const BOLLEAN = "boolean";

class HealthStorage
{ 
  /**
   * Define function 
   * @param {String} name Title of the SDO
   * @param {Object} options Options object
   */
  static define(title, properties, options) 
  {
    return new Model(title, properties, options);
  }

  /**
   * Return string type field
   * @returns  {String}
   */
  static get STRING() 
  {
    return STRING;
  }

  /**
   * Return number type field
   * @returns  {String}
   */
  static get NUMBER() 
  {
    return NUMBER;
  }

  /**
   * Return integer type field
   * @returns  {String}
   */
  static get INTEGER() 
  {
    return INTEGER;
  }

  /**
   * Return integer type field
   * @returns  {String}
   */
  static get BOOLEAN() 
  {
    return BOOLEAN;
  }

}

module.exports = HealthStorage;