/*
 * jsTools
 * (C) 2013 Erhan Gundogan <erhan.gundogan@gmail.com>
 * MIT Licensed
 */


/**
 * Checks if value is array or not
 *
 * isArray([]) => true
 *
 * @param v
 * @return {Boolean}
 */
var isArray = exports.isArray = function isArray(v) {
  return v.isArray ||
         v instanceof Array ||
         Object.prototype.toString.call(v) == '[object Array]';
};

/**
 * Returns a random int
 *
 * getRandomInt(1, 100) => 56
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
var getRandomInt = exports.getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Checks value if it has value or not. Returns true if it is null or undefined You can do recursive check.
 *
 * isNullorEmpty([]) => true
 * isNullorEmpty([""]) => false
 * isNullorEmpty([""], true) => true (Recursive check)
 *
 * @param v Value to be checked
 * @param recursive True for recursive check, False for only top item check
 * @return {Boolean}
 */
var isNullorEmpty = exports.isNullOrEmpty = function isNullorEmpty(v, recursive) {
  if (v != "undefined" && v !== null) {
    switch(typeof v) {
      case "object":
        if (!recursive) return false;
        if (isArray(v)) {
          return !(v.length > 0 && v[0] != "undefined" && v[0] !== null)
        } else {
          for (var property in v) {
            if (v.hasOwnProperty(property)) { return isNullorEmpty(v[property], recursive); }
          }
        }
        break;
      case "string":
        if (v.length > 0 && v !== "") { return false; }
        break;
      case "number":
        if (v > 0) { return false; }
        break;

    }
    return true;
  } else {
    return true;
  }
};

/**
 * Returns fixed decimal number
 *
 * toFixedDecimal(1.689442324, 2) => 1.68
 *
 * @param precision
 * @return {Number}
 */
var toFixedDecimal = exports.toFixedDecimal = function toFixedDecimal(number, precision) {
  var power = Math.pow(10, precision || 0);
  return Math.round(number * power) / power;
};