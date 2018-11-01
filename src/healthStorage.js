'use-strict';

class HealthStorage
{
  /**
   * Cosntruct
   */
  constructor() {}

  /**
   * Define function 
   * @param {String} sdoTitle Title of the SDO
   * @param  {Object} options Options object
   */
  define(sdoName, options) 
  {
      this.sdoName = sdoName;
  }

  /**
   * Return SDO title
   * @returns {String}
   */
  getSdoName()
  {
      return this.sdoName;
  }

  /**
   * Return SDO options
   * @returns {Object}
   */
  getSdoOptions()
  {
      return this.sdoOptions;
  }

  /**
   * Return a list of all found shemas
   * @param {Object} where eg. sort order
   * @param {Object} sort eg. sort order
   */
  findAll(where, sort)
  {
    // @TODO: GET /schemas/ 
  }

  /**
   * Return a single schema by its id
   * @param {String} id 
   */
  findById(id)
  {
    // @TODO: GET /schemas/{id}
  }

  /**
   * Return a single schema 
   * @param {Object} where
   */
  findOne(where)
  {
    // @TODO: GET /schemas/{where}
  }

  /**
   * Create a new schema based on defined type
   * @param {Object} option
   */
  create(options)
  {
    // @TODO: PUT /schemas/ 
  }

  /**
   * Update a schema by id and replace given fields
   * @param {String} id
   * @param {Object} fields
   */
  updateById(id, fields)
  {
    // @TODO: POST /schemas/ 
  }

  /**
   * Update a schema by where and replace given fields
   * @param {Object} where
   * @param {Object} fields
   */
  update(where, fields)
  {
    // @TODO: POST /schemas/ 
  }

  /**
   * Delete a schema by is
   * @param {String} id
   */
  deleteById(id)
  {
    // @TODO: DELETE /schemas/ 
  }

  /**
   * Delete a schema by is
   * @param {Object} where
   */
  delete(where)
  {
    // @TODO: DELETE /schemas/ 
  }
}

module.exports = new HealthStorage();