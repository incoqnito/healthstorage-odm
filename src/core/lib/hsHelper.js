/** Export module */
class HsHelper {
  /**
   * Find object value by given path
   * @param {Object} obj
   * @param {String} path
   * @returns {Object}
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

export default HsHelper
