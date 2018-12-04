/** Export module */
module.exports = new hsHelper();

/** Functions */
hsHelper.prototype.findValueByPath = findValueByPath;

/** HS schema */
function hsHelper() {}

/** 
 * Find object value by given path 
 * @param {Object} obj
 * @param {String} path
 * @returns {Object}
 */
function findValueByPath (obj, path) {
  let object = obj
  const splitPath = path.split('.')
  for (var i = 0, len = splitPath.length; i < len; i++) {
    object = object[splitPath[i]]
  };
  return object
}
