/**
 * Iterates over the keys of the object and tries to find word matches to the words in the string provided
 * @param {Object} object
 * @param {String} string
 * @return {Boolean}
 */
export function compareKeysToString(object, string) {
  var match = false,
      BreakException = {};
  try {
    var keys = Object.keys(object);
    keys.forEach(function(key) {
      var value = object[key];
      if (typeof value === 'string') {
        value.split(" ").forEach(function(s) {
          string.split(" ").forEach(function(s2) {
            if (s.length > 2 && s2.length > 2 && s.toLowerCase().indexOf(s2.toLowerCase()) === 0) {
              match = true;
              throw BreakException;
            }
          });
        });
      }
    });
  } catch (e) {
    if (e!==BreakException) throw e;
  }

  return string.length === 0 || match;
}

export default { compareKeysToString };