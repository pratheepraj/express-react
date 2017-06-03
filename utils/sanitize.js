const _ = require('lodash');
const validator = require('validator');
const cajaSanitize = require('google-caja').sanitize;

function sanitize(input) {
  let output;

  if (Array.isArray(input)) { // Array of primitives
    output = input.map(val => sanitize(val));
  } else if (_.isObject(input)) { // Object
    output = {};
    _.forEach(input, (val, key) => {
      output[key] = sanitize(val);
    });
  } else { // Primitive
    output = cajaSanitize(validator.trim(input)).replace(/&amp;/g, '&');
  }

  return output;
}

module.exports = sanitize;
