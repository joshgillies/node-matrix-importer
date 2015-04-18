function jsToPHPObject (key) {
  return '  \'' + key + '\' => \'' + this[key] + '\','
}

module.exports = function js2php (data) {
  if (typeof data === 'object') {
    return [
      'array (',
      Object.keys(data).map(jsToPHPObject, data).join('\n'),
      ');'
    ].join('\n')
  }

  return data
}
