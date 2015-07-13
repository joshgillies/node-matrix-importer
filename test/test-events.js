var Importer = require('..')
var spec = require('./spec')
var test = require('tape')
var xml = Importer()

test('event emitter', function (assert) {
  Object.keys(spec).forEach(function (test) {
    var opts = spec[test].opts
    var expected = spec[test].expected

    xml.on(test, function (result) {
      assert.deepEqual(expected, result, test + ' event emitted')
    })

    if (test === 'add_path') {
      xml.addPath(opts)
    }

    if (test === 'create_asset' || test === 'create_file_asset') {
      xml.createAsset(opts)
    }

    if (test === 'create_link') {
      xml.createLink(opts)
    }

    if (test === 'set_attribute') {
      xml.setAttribute(opts)
    }

    if (test === 'set_metadata_value') {
      xml.setMetadataValue(opts)
    }

    if (test === 'set_metadata_schema') {
      xml.setMetadataSchema(opts)
    }

    if (test === 'set_permission') {
      xml.setPermission(opts)
    }
  })
  assert.end()
})
