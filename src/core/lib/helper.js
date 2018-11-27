class Helper {

  /**
   * Find deep value by path concat by dot 
   * @param {Object} obj 
   * @param {String} path 
   * @returns {MixedResult} 
   */
  findValueByPath(obj, path) {
    var object = obj;
    for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
      object = object[path[i]];
    };
    return object;
  }
}

export default Helper;
