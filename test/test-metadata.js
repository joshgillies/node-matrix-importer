var Importer = require('..')
var xml2js = require('xml2js')
var test = require('tape')
var xml = Importer()

var buildAction = new xml2js.Builder({
  rootName: 'action',
  headless: true
})

// create test actions
var schema = xml.createAsset({
  parentId: 1,
  type: 'Metadata_Schema'
})

var section = xml.createAsset({
  parentId: schema.id,
  type: 'Metadata_Section'
})

var field = xml.createAsset({
  parentId: section.id,
  type: 'Metadata_Field_Text'
})

var site = xml.createAsset({
  parentId: 1,
  type: 'Site'
})

var tests = {
  default: {
    set_metadata_value: {
      opts: {
        id: 'Site_1',
        assetId: '1',
        fieldId: '2',
        value: 'Test'
      },
      expected: {
        action_id: 'set_Site_1_metadata_field_2',
        action_type: 'set_metadata_value',
        asset: '1',
        fieldid: '2',
        value: 'Test'
      },
      xml: [
        '<action>',
        '  <action_id>set_Site_1_metadata_field_2</action_id>',
        '  <action_type>set_metadata_value</action_type>',
        '  <asset>1</asset>',
        '  <fieldid>2</fieldid>',
        '  <value>Test</value>',
        '</action>'
      ].join('\n')
    },
    set_metadata_schema: {
      opts: {
        id: 'Site_1',
        assetId: '1',
        schemaId: '2',
        granted: true,
        cascade: true
      },
      expected: {
        action_id: 'set_Site_1_metadata_schema_2',
        action_type: 'set_metadata_schema',
        asset: '1',
        schemaid: '2',
        granted: 1,
        cascades: 1
      },
      xml: [
        '<action>',
        '  <action_id>set_Site_1_metadata_schema_2</action_id>',
        '  <action_type>set_metadata_schema</action_type>',
        '  <asset>1</asset>',
        '  <schemaid>2</schemaid>',
        '  <granted>1</granted>',
        '  <cascades>1</cascades>',
        '</action>'
      ].join('\n')
    }
  },
  extras: {
    set_metadata_value: {
      opts: {
        assetId: site.id,
        fieldId: field.id,
        value: 'Test'
      },
      expected: {
        action_id: 'set_Site_4_metadata_field_3',
        action_type: 'set_metadata_value',
        asset: '[[output://create_Site_4.assetid]]',
        fieldid: '[[output://create_Metadata_Field_Text_3.assetid]]',
        value: 'Test'
      },
      xml: [
        '<action>',
        '  <action_id>set_Site_4_metadata_field_3</action_id>',
        '  <action_type>set_metadata_value</action_type>',
        '  <asset>[[output://create_Site_4.assetid]]</asset>',
        '  <fieldid>[[output://create_Metadata_Field_Text_3.assetid]]</fieldid>',
        '  <value>Test</value>',
        '</action>'
      ].join('\n')
    },
    set_metadata_schema: {
      opts: {
        assetId: site.id,
        schemaId: schema.id,
        granted: true,
        cascade: true
      },
      expected: {
        action_id: 'set_Site_4_metadata_schema_1',
        action_type: 'set_metadata_schema',
        asset: '[[output://create_Site_4.assetid]]',
        schemaid: '[[output://create_Metadata_Schema_1.assetid]]',
        granted: 1,
        cascades: 1
      },
      xml: [
        '<action>',
        '  <action_id>set_Site_4_metadata_schema_1</action_id>',
        '  <action_type>set_metadata_schema</action_type>',
        '  <asset>[[output://create_Site_4.assetid]]</asset>',
        '  <schemaid>[[output://create_Metadata_Schema_1.assetid]]</schemaid>',
        '  <granted>1</granted>',
        '  <cascades>1</cascades>',
        '</action>'
      ].join('\n')
    }
  }
}

function extraTests (assert) {
  var test = tests.extras
  var setValue = xml.setMetadataValue(test['set_metadata_value'].opts)
  var setSchema = xml.setMetadataSchema(test['set_metadata_schema'].opts)

  assert.deepEqual(setValue, test['set_metadata_value'].expected, 'set_metadata_value object')
  assert.equal(buildAction.buildObject(setValue), test['set_metadata_value'].xml, 'set_metadata_value  XML')

  assert.deepEqual(setSchema, test['set_metadata_schema'].expected, 'set_metadata_schema object')
  assert.equal(buildAction.buildObject(setSchema), test['set_metadata_schema'].xml, 'set_metadata_schema XML')

  assert.end()
}

function defaultTests (assert) {
  var test = tests.default
  var setValue = xml.setMetadataValue(test['set_metadata_value'].opts)
  var setSchema = xml.setMetadataSchema(test['set_metadata_schema'].opts)

  assert.deepEqual(setValue, test['set_metadata_value'].expected, 'set_metadata_value object')
  assert.equal(buildAction.buildObject(setValue), test['set_metadata_value'].xml, 'set_metadata_value  XML')

  assert.deepEqual(setSchema, test['set_metadata_schema'].expected, 'set_metadata_schema object')
  assert.equal(buildAction.buildObject(setSchema), test['set_metadata_schema'].xml, 'set_metadata_schema XML')

  assert.test('set metadata on assets', extraTests)

  assert.end()
}

test('create metadata action(s)', defaultTests)
