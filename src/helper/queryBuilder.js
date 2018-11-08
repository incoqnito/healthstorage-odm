
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
  "LIKE": {
    lead: "*",
    op: "~/^{value}.*/"
  }
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
   * @param {Object} where
   */
  buildQuery(where, single = false) 
  {
    var query = "[";
    
    for(var field in where) {
      var operation = this.getOperation(where[field].operation);
      if(where[field].operation.indexOf("LIKE") < 0) {
        query += operation.lead + field + operation.op + where[field].value;
      } else {
        query += operation.lead + field + operation.op.replace("{value}", where[field].value);
      }
    }

    query += "]";

    return query;
  }

  /**
   * Build json query
   * @param {Object} where
   */
  buildQueryOne(where) 
  {
    var query = "[";
    
    for(var field in where) {
      if(["EQUAL", "LIKE"].indexOf(where[field].operation) > -1) {
        var operation = this.getOperation(where[field].operation);
        if(where[field].operation.indexOf("LIKE") < 0) {
          query += field + operation.op + where[field].value;
        } else {
          query += field + operation.op.replace("{value}", where[field].value);
        }
      }
    }
    query += "]";
    
    return query;
  }
}

module.exports = new QueryBuilder();