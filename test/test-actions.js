var importer = require('..')
var spec = require('./spec')
var xml2js = require('xml2js')
var test = require('tape')
var fs = require('fs')

var buildAction = new xml2js.Builder({
  rootName: 'action',
  headless: true
})

test('create actions', function (t) {
  var xml = importer()
  var xmlSorted = importer({ sortActions: true })

  Object.keys(spec).forEach(function (test) {
    var opts = spec[test].opts
    var expected = {
      obj: spec[test].expected,
      xml: spec[test].xml
    }
    var actionImporter, asset, id

    if (test === 'add_path') {
      actionImporter = xml.addPath(opts)
      xmlSorted.addPath(opts)
    }

    if (test === 'create_asset') {
      asset = xml.createAsset(opts)
      actionImporter = asset
      id = asset.id
      t.equal(asset.id, '#1', 'action ' + test + ' returns ID')
      t.deepEqual(asset, xml.getActionById(id), 'can retrieve action from ID')
      t.notOk(xml.getActionById(100), 'undefined if no action exists with specified ID')
      xmlSorted.createAsset(opts)
      // asset id no longer needed
      delete asset.id
    }

    if (test === 'create_link') {
      actionImporter = xml.createLink(opts)
      xmlSorted.createLink(opts)
    }

    if (test === 'set_attribute') {
      actionImporter = xml.setAttribute(opts)
      xmlSorted.setAttribute(opts)
    }

    if (test === 'set_metadata_value') {
      actionImporter = xml.setMetadataValue(opts)
      xmlSorted.setMetadataValue(opts)
    }

    if (test === 'set_metadata_schema') {
      actionImporter = xml.setMetadataSchema(opts)
      xmlSorted.setMetadataSchema(opts)
    }

    if (test === 'set_permission') {
      actionImporter = xml.setPermission(opts)
      xmlSorted.setPermission(opts)
    }
    t.deepEqual(actionImporter, expected.obj, 'action ' + test + ' from Importer object')
    t.equal(buildAction.buildObject(actionImporter), expected.xml, 'action ' + test + ' from Importer XML')
  })
  t.equal(xml.toString(), fs.readFileSync(__dirname + '/test.xml', { encoding: 'utf-8' }), 'generate valid import XML')
  t.equal(xmlSorted.toString(), fs.readFileSync(__dirname + '/sorted.xml', { encoding: 'utf-8' }), 'generate valid sorted import XML')
  t.end()
})
