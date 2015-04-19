var Importer = require('..')
var xml2js = require('xml2js')
var js2php = require('../js2php')
var test = require('tape')

var buildAction = new xml2js.Builder({
  rootName: 'action',
  headless: true,
  cdata: true
})

var tests = {
  'set single attribute': {
    opts: {
      id: 'test_1',
      assetId: '1',
      attribute: 'html',
      value: 'Test page'
    },
    expected: {
      action_id: 'set_test_1_html',
      action_type: 'set_attribute_value',
      asset: '1',
      attribute: 'html',
      value: 'Test page'
    },
    xml: [
      '<action>',
      '  <action_id>set_test_1_html</action_id>',
      '  <action_type>set_attribute_value</action_type>',
      '  <asset>1</asset>',
      '  <attribute>html</attribute>',
      '  <value>Test page</value>',
      '</action>'
    ].join('\n')
  },
  'set multiple attributes': {
    opts: {
      id: 'test_2',
      assetId: '1',
      attribute: 'attributes',
      value: { 'html': 'Test page', 'test': 'some other attribute' }
    },
    expected: {
      action_id: 'set_test_2_attributes',
      action_type: 'set_attribute_value',
      asset: '1',
      attribute: 'attributes',
      value: { 'html': 'Test page', 'test': 'some other attribute' }
    },
    xml: [
      '<action>',
      '  <action_id>set_test_2_attributes</action_id>',
      '  <action_type>set_attribute_value</action_type>',
      '  <asset>1</asset>',
      '  <attribute>attributes</attribute>',
      '  <value><![CDATA[array (\n  \'html\' => \'Test page\',\n  \'test\' => \'some other attribute\',\n);]]></value>',
      '</action>'
    ].join('\n')
  }
}

test('action set attribute(s)', function (t) {
  Object.keys(tests).forEach(function runner (action) {
    var opts = tests[action].opts
    var xml = Importer()
    var actionObj = xml.setAttribute(opts)
    t.deepEqual(actionObj, tests[action].expected, action + ' object')
    // compile js object to php
    actionObj.value = js2php(actionObj.value)
    t.equal(buildAction.buildObject(actionObj), tests[action].xml, action + ' XML')
  })
  t.end()
})
