var Importer = require('..')
var xml2js = require('xml2js')
var test = require('tape')

var buildAction = new xml2js.Builder({
  rootName: 'action',
  headless: true
})

var tests = {
  'create asset': {
    opts: {
      parentId: 1,
      type: 'Site'
    },
    expected: {
      id: '#1',
      action_id: 'create_Site_1',
      action_type: 'create_asset',
      type_code: 'site',
      parentid: 1,
      value: '',
      link_type: 1,
      is_dependant: 0,
      is_exclusive: 0
    },
    xml: [
      '<action>',
      '  <action_id>create_Site_1</action_id>',
      '  <action_type>create_asset</action_type>',
      '  <type_code>site</type_code>',
      '  <parentid>1</parentid>',
      '  <value/>',
      '  <link_type>1</link_type>',
      '  <is_dependant>0</is_dependant>',
      '  <is_exclusive>0</is_exclusive>',
      '</action>'
    ].join('\n')
  },
  'create child asset': {
    opts: {
      parentId: '#1',
      type: 'Standard Page'
    },
    expected: {
      id: '#2',
      action_id: 'create_Standard_Page_2',
      action_type: 'create_asset',
      type_code: 'page_standard',
      parentid: '[[output://create_Site_1.assetid]]',
      value: '',
      link_type: 1,
      is_dependant: 0,
      is_exclusive: 0
    },
    xml: [
      '<action>',
      '  <action_id>create_Standard_Page_2</action_id>',
      '  <action_type>create_asset</action_type>',
      '  <type_code>page_standard</type_code>',
      '  <parentid>[[output://create_Site_1.assetid]]</parentid>',
      '  <value/>',
      '  <link_type>1</link_type>',
      '  <is_dependant>0</is_dependant>',
      '  <is_exclusive>0</is_exclusive>',
      '</action>'
    ].join('\n')
  },
  'create asset from unknown asset type': {
    opts: {
      parentId: '#2',
      type: 'Page'
    },
    expected: {
      id: '#3',
      action_id: 'create_Page_3',
      action_type: 'create_asset',
      type_code: 'Page',
      parentid: '[[output://create_Standard_Page_2.assetid]]',
      value: '',
      link_type: 1,
      is_dependant: 0,
      is_exclusive: 0
    },
    xml: [
      '<action>',
      '  <action_id>create_Page_3</action_id>',
      '  <action_type>create_asset</action_type>',
      '  <type_code>Page</type_code>',
      '  <parentid>[[output://create_Standard_Page_2.assetid]]</parentid>',
      '  <value/>',
      '  <link_type>1</link_type>',
      '  <is_dependant>0</is_dependant>',
      '  <is_exclusive>0</is_exclusive>',
      '</action>'
    ].join('\n')
  }
}

test('action create asset(s)', function (t) {
  var xml = Importer()
  Object.keys(tests).forEach(function runner (action) {
    var opts = tests[action].opts
    var asset = xml.createAsset(opts)
    t.equal(asset.id, tests[action].expected.id, 'internal id present')
    t.deepEqual(asset, tests[action].expected, action + ' object')
    // asset id no longer needed. Code smell much?!
    delete asset.id
    t.equal(buildAction.buildObject(asset), tests[action].xml, action + ' XML')
  })
  t.end()
})
