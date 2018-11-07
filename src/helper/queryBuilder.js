
'use-strict';

const OPERATIONS = {
  "UNEQUAL": {
    lead: "*",
    op: "!="
  }, 
  "EQUAL": {
    lead: "",
    op: "="
  },
};

class QueryBuilder
{
  /**
   * Consturct
   */
  constructor() {}

  /**
   * Get Operation
   */
  get OPERATIONS()
  {
    return OPERATIONS;
  }
  
  /**
   * Get Operation fields
   * @param {String} where 
   */
  getOperation(idx)
  {
    var operations = this.OPERATIONS;
    return operations[idx];
  }

  /**
   * Build json query
   * @todo impplement schema names on top level, multiple cols search and operators
   * @param {Object} where
   */
  buildQuery(where) 
  {
    var query = "[";
    
    for(var field in where) {
      var operation = this.getOperation(where[field].operation);
      query += operation.lead + field + operation.op + where[field].value;
    }

    query += "]";
    console.log(query);

    return query;
  }
}

module.exports = new QueryBuilder();