
const EQUAL = "";
const UNEQUAL = "";
const LIKE = "";

class QueryBuilder
{
  /**
   * Return equal operation regex
   * @returns  {String}
   */
  static get EQUAL() 
  {
    return EQUAL;
  }

  /**
   * Return unequal operation regex
   * @returns  {String}
   */
  static get UNEQUAL() 
  {
    return UNEQUAL;
  }

  /**
   * Return like operation regex
   * @returns  {String}
   */
  static get LIKE() 
  {
    return LIKE;
  }

  /**
   * Build json query
   * @param {Object} where
   */
  static buildQuery(where) 
  {
    var query = "[";
    
    for(var field in where) {
      query += field + "=" + where[field].value;
    }

    query += "]";
    console.log(query);      
    return query;
  }
}

module.exports = QueryBuilder;