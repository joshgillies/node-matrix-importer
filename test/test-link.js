var Importer = require('..')
var xml2js = require('xml2js')
var test = require('tape')
var xml = Importer()

var buildAction = new xml2js.Builder({
  rootName: 'action',
  headless: true
})

// create test actions
var folder = xml.createAsset({
  parentId: 1,
  type: 'folder'
})

var site = xml.createAsset({
  parentId: folder.id,
  type: 'site'
})

var page = xml.createAsset({
  parentId: site.id,
  type: 'page_standard'
})

var tests = {
  'generic create link': {
    opts: {
      to: 2,
      from: folder.id
    },
    expected: {
      action_id: 'link_type_1_2_to_1',
      action_type: 'create_link',
      asset: '[[output://create_Folder_1.assetid]]',
      assetid: 2,
      is_dependant: 0,
      is_exclusive: 0,
      is_major: 0,
      link_type: 1,
      value: ''
    },
    xml: [
      '<action>',
      '  <action_id>link_type_1_2_to_1</action_id>',
      '  <action_type>create_link</action_type>',
      '  <asset>[[output://create_Folder_1.assetid]]</asset>',
      '  <value/>',
      '  <link_type>1</link_type>',
      '  <is_dependant>0</is_dependant>',
      '  <is_exclusive>0</is_exclusive>',
      '  <assetid>2</assetid>',
      '  <is_major>0</is_major>',
      '</action>'
    ].join('\n')
  },
  'multiple dynamic inputs': {
    opts: {
      to: site.id,
      from: page.id,
      link: 'notice',
      value: 'test'
    },
    expected: {
      action_id: 'link_notice_2_to_3',
      action_type: 'create_link',
      asset: '[[output://create_Standard_Page_3.assetid]]',
      assetid: '[[output://create_Site_2.assetid]]',
      is_dependant: 0,
      is_exclusive: 0,
      is_major: 0,
      link_type: 8,
      value: 'test'
    },
    xml: [
      '<action>',
      '  <action_id>link_notice_2_to_3</action_id>',
      '  <action_type>create_link</action_type>',
      '  <asset>[[output://create_Standard_Page_3.assetid]]</asset>',
      '  <value>test</value>',
      '  <link_type>8</link_type>',
      '  <is_dependant>0</is_dependant>',
      '  <is_exclusive>0</is_exclusive>',
      '  <assetid>[[output://create_Site_2.assetid]]</assetid>',
      '  <is_major>0</is_major>',
      '</action>'
    ].join('\n')
  }
}

test('create link action(s)', function (assert) {
  Object.keys(tests).forEach(function runner (action) {
    var opts = tests[action].opts
    var asset = xml.createLink(opts)
    assert.deepEqual(asset, tests[action].expected, action + ' object')
    assert.equal(buildAction.buildObject(asset), tests[action].xml, action + ' XML')
  })
  assert.end()
})
