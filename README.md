# node-matrix-importer

Generate XML for the "[Import Assets from XML Tool]" with JavaScript!

[![Build Status](https://travis-ci.org/joshgillies/node-matrix-importer.svg)](https://travis-ci.org/joshgillies/node-matrix-importer)

## Example

```js
var importer = require('node-matrix-importer');
var xml = importer();

xml.createAsset('site', {
  parentId: 1
});

console.log(xml.toString());
```

## API

### Importer (WIP)

`node-matrix-importer` provides an API for generating XML for the "[Import Assets from XML Tool]" via `require('node-matrix-importer')`.

#### importer.addPath(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.id`
  * `opts.path`
  * `opts.assetId`

Returns a new Action instance: `new Action('add_path', opts);`.

For more information on Actions refer to the [node-matrix-import-actions] module.

#### importer.createAsset(type, opts)

The `type` argument is a shorthand of `opts.type`.

The `opts` argument accepts an object with the following properties:

  * `opts.id`
  * `opts.parentId`
  * `opts.type`
  * `opts.link`
  * `opts.value`
  * `opts.dependant`
  * `opts.exclusive`

Returns a new Action instance: `new Action('create_asset', opts);`.

For more information on Actions refer to the [node-matrix-import-actions] module.

#### importer.createLink(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.to`
  * `opts.from`
  * `opts.link`
  * `opts.value`
  * `opts.dependant`
  * `opts.exclusive`
  * `opts.major`

Returns a new Action instance: `new Action('create_link', opts);`.

For more information on Actions refer to the [node-matrix-import-actions] module.

#### importer.setAttribute(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.id`
  * `opts.assetId`
  * `opts.attribute`
  * `opts.value`

Returns a new Action instance: `new Action('set_attribute', opts);`.

For more information on Actions refer to the [node-matrix-import-actions] module.

#### importer.setPermission(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.assetId`
  * `opts.permission`
  * `opts.granted`
  * `opts.userId`

Returns a new Action instance: `new Action('set_permission', opts);`.

For more information on Actions refer to the [node-matrix-import-actions] module.

#### importer.toString(opts)

`node-matrix-importer` internally manages a collection of actions created by calling
the above methods. At any point you can get a full XML representation of them by
calling `toString()` on your Importer instance.

The `opts` argument controls the formatting of the output XML.

  * `opts.pretty`: pretty print XML. Default: `true`
  * `opts.indent`: whitespace for indentation (only if `opts.pretty = true`. Default: `' '`
  * `opts.newline` newline character (only if `opts.pretty = true`. Default: `'\n'`

## License

MIT

[node-matrix-import-actions]: https://github.com/joshgillies/node-matrix-import-actions
[Import Assets from XML Tool]: http://manuals.matrix.squizsuite.net/tools/chapters/import-assets-from-xml-tool
