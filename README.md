# node-matrix-importer

Generate XML for the "[Import Assets from XML Tool]" with JavaScript!

[![Build Status](https://travis-ci.org/joshgillies/node-matrix-importer.svg)](https://travis-ci.org/joshgillies/node-matrix-importer)

## Example

```js
var importer = require('node-matrix-importer');
var xml = importer();

xml.createAsset({
  id: 'Site_1',
  parentId: 1,
  type: 'site'
});

console.log(xml.toString());
```

## API

### Importer (WIP)

#### importer.addPath(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.id`
  * `opts.path`
  * `opts.assetId`

Returns a new Action instance, where `type` is automatically set to `add_path`.

For more information on Actions Refer to the Actions section.

#### importer.createAsset(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.id`
  * `opts.parentId`
  * `opts.type`
  * `opts.link`
  * `opts.value`
  * `opts.dependant`
  * `opts.exclusive`

Returns a new Action instance, where `type` is automatically set to `create_asset`.

For more information on Actions Refer to the Actions section.

#### importer.createLink(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.to`
  * `opts.from`
  * `opts.link`
  * `opts.value`
  * `opts.dependant`
  * `opts.exclusive`
  * `opts.major`

Returns a new Action instance, where `type` is automatically set to `create_link`.

For more information on Actions Refer to the Actions section.

#### importer.setAttribute(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.id`
  * `opts.assetId`
  * `opts.attribute`
  * `opts.value`

Returns a new Action instance, where `type` is automatically set to `set_attribute`.

For more information on Actions Refer to the Actions section.

#### importer.setPermission(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.assetId`
  * `opts.permission`
  * `opts.granted`
  * `opts.userId`

Returns a new Action instance, where `type` is automatically set to `set_permission`.

For more information on Actions Refer to the Actions section.

### Actions

An action is a task performed against a Squiz Matrix system.

`node-matrix-importer` provides an Action constructor via `require('node-matrix-importer/action').Action`

#### Action(type, opts)

`type` is a String representing the type of action. The following types are available:

#### Action('add_path', opts)

A `add_path` Action accepts an Object as it's second argument `opts` with the following properties:

  * `opts.id`
  * `opts.path`
  * `opts.assetId`

#### Action('create_asset', opts)

A `create_asset` Action accepts an Object as it's second argument `opts` with the following properties:

  * `opts.id`
  * `opts.parentId`
  * `opts.type`
  * `opts.link`
  * `opts.value`
  * `opts.dependant`
  * `opts.exclusive`

#### Action('create_link', opts)

A `create_link` Action accepts an Object as it's second argument `opts` with the following properties:

  * `opts.to`
  * `opts.from`
  * `opts.link`
  * `opts.value`
  * `opts.dependant`
  * `opts.exclusive`
  * `opts.major`

#### Action('set_attribute', opts)

A `set_attribute` Action accepts an Object as it's second argument `opts` with the following properties:

  * `opts.id`
  * `opts.assetId`
  * `opts.attribute`
  * `opts.value`

#### Action('set_permission', opts)

A `set_permission` Action accepts an Object as it's second argument `opts` with the following properties:

  * `opts.assetId`
  * `opts.permission`
  * `opts.granted`
  * `opts.userId`

## License

MIT

[Import Assets from XML Tool]: http://manuals.matrix.squizsuite.net/tools/chapters/import-assets-from-xml-tool
