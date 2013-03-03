/*
 * jsTools
 * (C) 2013 Erhan Gundogan <erhan.gundogan@gmail.com>
 * MIT Licensed
 */

/**
 * Requires
 */
var crypto = require("crypto");

/**
 * Checks if value is array or not
 *
 * isArray([]) => true
 *
 * @param v
 * @return {Boolean}
 */
var isArray = function isArray(v) {
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
var getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Checks value if it has value or not. Returns true if it is null or undefined You can do recursive check.
 *
 * isNullOrEmpty([]) => true
 * isNullOrEmpty([""]) => false
 * isNullOrEmpty([""], true) => true (Recursive check)
 *
 * @param v Value to be checked
 * @param recursive True for recursive check, False for only top item check
 * @return {Boolean}
 */
var isNullOrEmpty = function isNullOrEmpty(v, recursive) {
  if (v != "undefined" && v !== null) {
    switch(typeof v) {
      case "object":
        if (!recursive) return false;
        if (isArray(v)) {
          return !(v.length > 0 && v[0] != "undefined" && v[0] !== null)
        } else {
          for (var property in v) {
            if (v.hasOwnProperty(property)) { return isNullOrEmpty(v[property], recursive); }
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
var toFixedDecimal = function toFixedDecimal(number, precision) {
  var power = Math.pow(10, precision || 0);
  return Math.round(number * power) / power;
};

/**
 * Get random string
 *
 * @param len
 * @return {String}
 */
var getUniqueId = function(len) {
  return crypto.randomBytes(Math.ceil((len*3)/4))
    .toString("base64")
    .slice(0, len);
};

/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "3DaS435D2z"
 *     utils.uid(10, true);
 *     // => "cDaS435D2z"
 *
 * @param {Number} len
 * @param {Boolean} first character must be alpha numeric char (for html id generation)
 * @return {String}
 * @api public
 */
var getSafeUniqueId = function(len, firstAlphaNumeric) {
  var buf = [],
      chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      charlen = chars.length,
      firstAlphaNumeric = firstAlphaNumeric || false;

  if (firstAlphaNumeric) {
    var alphaNumericChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        ancharlen = alphaNumericChars.length;

    buf.push(alphaNumericChars[getRandomInt(0, ancharlen - 1)]);
    len -= 1;
  }

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join("");
};

module.exports = {
  isArray:isArray,
  getRandomInt:getRandomInt,
  isNullOrEmpty:isNullOrEmpty,
  toFixedDecimal:toFixedDecimal,
  getUniqueId:getUniqueId,
  getSafeUniqueId:getSafeUniqueId
};



