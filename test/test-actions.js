var helpers = require('../helpers');
var actions = require('../');
var test = require('tape');

test('use shorthand helpers', function(t) {
  t.equal(helpers.keyShorthand('add_path'), 'add_web_path', 'shorthand selector');
  t.equal(helpers.keyShorthand('create_asset'), 'create_asset', 'passthrough when no shorthand is available');
  t.end();
});

test('join asset type with id', function(t) {
  t.equal(helpers.asset('Site', '1'), 'Site_1');
  t.end();
});

test('create action ids', function(t) {
  t.equal(
    actions.setActionId('add_web_path')('Site_1'),
    'add_Site_1_path',
    'add path action id'
  );
  t.equal(
    actions.setActionId('create_asset')('Site_1'),
    'create_Site_1',
    'create asset action id'
  );
  t.equal(
    actions.setActionId('create_link')('notice', 1, 2),
    'link_notice_1_to_2',
    'create link action id'
  );
  t.equal(
    actions.setActionId('set_attribute_value')('Site_1', 'name'),
    'set_Site_1_name',
    'set attribute action id'
  );
  t.equal(
    actions.setActionId('set_permission')(1, 1, 2),
    'set_permission_1_1_2',
    'set permission action id'
  );
  t.end();
});

test('create actions', function(t) {
  var tests = {
    add_web_path: {
      action: actions.addPath({
        id: 'Site_1',
        path: 'test-site',
        assetId: '1'
      }),
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
      action: actions.createAsset({
        id: 'Site_1',
        parentId: 1,
        type: 'site'
      }),
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
    set_attribute: {
      action: actions.setAttribute({
        id: 'Site_1',
        assetId: 1,
        attribute: 'html',
        value: 'Test Site'
      }),
      expected: {
        action_id: 'set_html_Site_1',
        action_type: 'set_attribute_value',
        asset: 1,
        attribute: 'html',
        value: 'Test Site'
      },
      xml: [
        '<action>',
        '  <action_id>set_html_Site_1</action_id>',
        '  <action_type>set_attribute_value</action_type>',
        '  <asset>1</asset>',
        '  <attribute>html</attribute>',
        '  <value>Test Site</value>',
        '</action>'
      ].join('\n')
    },
    create_link: {
      action: actions.createLink({
        to: 2,
        from: 1
      }),
      expected: {
        action_id: 'link_1_2_to_1',
        action_type: 'create_link',
        asset: 1,
        assetid: 2,
        is_dependant: 0,
        is_exclusive: 0,
        is_major: '',
        link_type: 1,
        value: ''
      },
      xml: [
        '<action>',
        '  <action_id>link_1_2_to_1</action_id>',
        '  <action_type>create_link</action_type>',
        '  <asset>1</asset>',
        '  <value/>',
        '  <link_type>1</link_type>',
        '  <is_dependant>0</is_dependant>',
        '  <is_exclusive>0</is_exclusive>',
        '  <assetid>2</assetid>',
        '  <is_major/>',
        '</action>'
      ].join('\n')
    },
    set_permission: {
      action: actions.setPermission({
        assetId: 1,
        permission: 'read',
        granted: true,
        userId: 7
      }),
      expected: {
        action_id: 'set_permission_1_read_7',
        action_type: 'set_permission',
        asset: 1,
        permission: 1,
        granted: 1,
        userid: 7
      },
      xml: [
        '<action>',
        '  <action_id>set_permission_1_read_7</action_id>',
        '  <action_type>set_permission</action_type>',
        '  <asset>1</asset>',
        '  <permission>1</permission>',
        '  <granted>1</granted>',
        '  <userid>7</userid>',
        '</action>'
      ].join('\n')
    }
  };
  Object.keys(tests).forEach(function(test) {
    var action = tests[test].action;
    t.deepEqual(action, tests[test].expected, 'action ' + test + ' object');
    t.equal(action.toXML(), tests[test].xml, 'action ' + test + ' XML');
  });
  t.end();
});
