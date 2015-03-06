var format = require('string-template');

var HELPERS = {
  cache_globally: 'not_found_page_cache_globally',
  set_attribute: 'set_attribute_value',
  add_path: 'add_web_path'
};

exports.keyShorthand = function keyShorthand(key) {
  return HELPERS[key] || key;
};

exports.asset = function asset(type, id) {
  return format('{0}_{1}', type, id);
};

exports.actionId = function actionId(template, expected) {
  return function formatter() {
    var args = Array.prototype.slice.call(arguments);
    expected = expected || 1;
    if (args.length !== expected)
      throw new Error('Expected ' + expected + ' arguments instead got ' + args.length);
    if (args.indexOf(undefined) >= 0)
      throw new Error('Undefined must not be passed to format function');

    return format(template, args);
  };
};

