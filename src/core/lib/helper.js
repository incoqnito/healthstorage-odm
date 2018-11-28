class Helper {
  /**
   * Find deep value by path concat by dot
   * @param {Object} obj
   * @param {String} path
   * @returns {MixedResult}
   */
  static findValueByPath (obj, path) {
    let object = obj
    const splitPath = path.split('.')
    for (var i = 0, len = splitPath.length; i < len; i++) {
      object = object[splitPath[i]]
    };
    return object
  }
}

export default Helper
