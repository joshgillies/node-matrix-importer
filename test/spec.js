module.exports = {
  add_path: {
    opts: {
      id: 'Site_1',
      path: 'test-site',
      assetId: '1'
    },
    expected: {
      action_id: 'add_Site_1_path',
      action_type: 'add_web_path',
      asset: '1',
      path: 'test-site'
    },
    xml: [
      '<action>',
      '  <action_id>add_Site_1_path</action_id>',
      '  <action_type>add_web_path</action_type>',
      '  <asset>1</asset>',
      '  <path>test-site</path>',
      '</action>'
    ].join('\n')
  },
  create_asset: {
    opts: {
      parentId: 1,
      type: 'site'
    },
    expected: {
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
  create_link: {
    opts: {
      to: 2,
      from: '#1'
    },
    expected: {
      action_id: 'link_type_1_2_to_1',
      action_type: 'create_link',
      asset: '[[output://create_Site_1.assetid]]',
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
      '  <asset>[[output://create_Site_1.assetid]]</asset>',
      '  <value/>',
      '  <link_type>1</link_type>',
      '  <is_dependant>0</is_dependant>',
      '  <is_exclusive>0</is_exclusive>',
      '  <assetid>2</assetid>',
      '  <is_major>0</is_major>',
      '</action>'
    ].join('\n')
  },
  set_attribute: {
    opts: {
      assetId: '#1',
      attribute: 'html',
      value: 'Test Site'
    },
    expected: {
      action_id: 'set_Site_1_html',
      action_type: 'set_attribute_value',
      asset: '[[output://create_Site_1.assetid]]',
      attribute: 'html',
      value: 'Test Site'
    },
    xml: [
      '<action>',
      '  <action_id>set_Site_1_html</action_id>',
      '  <action_type>set_attribute_value</action_type>',
      '  <asset>[[output://create_Site_1.assetid]]</asset>',
      '  <attribute>html</attribute>',
      '  <value>Test Site</value>',
      '</action>'
    ].join('\n')
  },
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
  },
  set_permission: {
    opts: {
      assetId: '#1',
      permission: 'read',
      granted: true,
      muteError: false,
      userId: 7
    },
    expected: {
      action_id: 'set_permission_1_read_7',
      action_type: 'set_permission',
      asset: '[[output://create_Site_1.assetid]]',
      permission: 1,
      granted: 1,
      mute_error: 0,
      userid: 7
    },
    xml: [
      '<action>',
      '  <action_id>set_permission_1_read_7</action_id>',
      '  <action_type>set_permission</action_type>',
      '  <asset>[[output://create_Site_1.assetid]]</asset>',
      '  <permission>1</permission>',
      '  <mute_error>0</mute_error>',
      '  <granted>1</granted>',
      '  <userid>7</userid>',
      '</action>'
    ].join('\n')
  }
}
