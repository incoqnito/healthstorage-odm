'use-strict';

import Model from "./core/model";

const STRING = "string";
const NUMBER = "number";
const INTEGER = "integer";
const BOOLEAN = "boolean";
const ASC = "Ascending";
const DESC = "Descending";
const META_ID = 'id';
const META_REVISION = 'r';
const META_DATE = 'tsp';


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

  /**
   * Return asc type field
   * @returns  {String}
   */
  static get ASC() 
  {
    return ASC;
  }

  /**
   * Return desc type field
   * @returns  {String}
   */
  static get DESC() 
  {
    return DESC;
  }

  /**
   * Return meta id type field
   * @returns  {String}
   */
  static get META_ID() 
  {
    return META_ID;
  }

  /**
   * Return meta revision type field
   * @returns  {String}
   */
  static get META_REVISION() 
  {
    return META_REVISION;
  }

  /**
   * Return meta revision type field
   * @returns  {String}
   */
  static get META_DATE() 
  {
    return META_DATE;
  }
}

export default HealthStorage;