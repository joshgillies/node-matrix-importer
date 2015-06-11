# node-matrix-importer

Generate XML for the "[Import Assets from XML Tool]" with JavaScript!

[![Build Status](https://travis-ci.org/joshgillies/node-matrix-importer.svg)](https://travis-ci.org/joshgillies/node-matrix-importer)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Motivation

`node-matrix-importer` aims to provide a utility for both generation and optimisation
of asset XML manifests as expected by Squiz Matrix' "[Import Assets from XML Tool]".

Currently the only way of generating an import.xml is either by exporting an
asset tree from Squiz Matrix, or writing your own by hand. Whilst the latter isn't
unreasonable (it's only XML after all) it's far from practical.

An exported asset tree can potentially consist of hundreds of interwoven typically
synchronous operations, as a result the import tool typically gets overlooked as a
tool for automation, or even maintenance of Squiz Matrix implementations.

### Goals

 - Unlock the true potential of the "[Import Assets from XML Tool]".
 - Provide programatic API for generating asset import.xml manifests.
 - Optimise import.xml manifests by batching various operations.
 - Parse exported asset trees for local replication, thus enabling offline development.
 - Investigate alternate uses for the "[Import Assets from XML Tool]". eg. update assets from XML.

## Example

```js
var Importer = require('node-matrix-importer')
var xml = Importer()

var rootFolder = xml.createAsset('folder', {
  parentId: 1
})
var mySite = xml.createAsset('site', {
  parentId: rootFolder.id
})

xml.setAttribute({
  assetId: rootFolder.id,
  attribute: 'name',
  value: 'Sites'
})

xml.setAttribute({
  assetId: mySite.id,
  attribute: 'name',
  value: 'My Site'
})

console.log(xml.toString())
```

## API

### Importer

`node-matrix-importer` provides an API for generating XML for the "[Import Assets from XML Tool]" via `require('node-matrix-importer')`.

#### var importer = new Importer(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.sortActions`: whether Actions should be sorted into an internal collection. Default: `false`

#### importer.addPath(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.id`
  * `opts.path`
  * `opts.assetId`

Internally this is a helper around `importer.addAction('add_path', opts);`.

For more information on Actions refer to the [node-matrix-import-actions] module.

#### importer.createAsset(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.id`
  * `opts.parentId`
  * `opts.file`
  * `opts.type`
  * `opts.link`
  * `opts.value`
  * `opts.dependant`
  * `opts.exclusive`

Internally this is a helper around `importer.addAction('create_asset', opts);`,
or `importer.addAction('create_file_asset', opts);` if `opts.file` is set.

Refer to the `importer.addAction` section for more information.

The returned object will additionally have an `action.id` propterty; `action.id`
in this case is a String in the form of `'#{id}'`, where `id` is a unique identifier.

This is useful should you later wish to retrieve the action object via `importer.getActionById(action.id)`.

#### importer.createLink(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.to`
  * `opts.from`
  * `opts.link`
  * `opts.value`
  * `opts.dependant`
  * `opts.exclusive`
  * `opts.major`

Internally this is a helper around `importer.addAction('create_link', opts);`.

Refer to the `importer.addAction` section for more information.

#### importer.setAttribute(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.id`
  * `opts.assetId`
  * `opts.attribute`
  * `opts.value`

Internally this is a helper around `importer.addAction('set_attribute', opts);`.

Refer to the `importer.addAction` section for more information.

#### importer.setMetadataSchema(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.id`
  * `opts.assetId`
  * `opts.schemaId`
  * `opts.granted`
  * `opts.cascade`

Internally this is a helper around `importer.addAction('set_metadata_schema', opts);`.

Refer to the `importer.addAction` section for more information.

#### importer.setMetadataValue(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.id`
  * `opts.assetId`
  * `opts.fieldId`
  * `opts.value`

Internally this is a helper around `importer.addAction('set_metadata_value', opts);`.

Refer to the `importer.addAction` section for more information.

#### importer.setPermission(opts)

The `opts` argument accepts an object with the following properties:

  * `opts.assetId`
  * `opts.permission`
  * `opts.muteError`
  * `opts.granted`
  * `opts.userId`

Internally this is a helper around `importer.addAction('set_permission', opts);`.

Refer to the `importer.addAction` section for more information.

#### importer.addAction(type, opts)

The `importer.addAction` method is responsible for creating and assigning new Actions
to the `importer` internal collection.

The `type` argument describes the type of action to create, and can be any action type
as supported by [node-matrix-import-actions]. Additionally, the `opts` argument expects
an object as appropriate to the defined action type.

Returns a new Action instance: `new Action(type, opts);`.

For more information on Actions refer to the [node-matrix-import-actions] module.

#### importer.getActionById(id)

The `id` argument accepts a String in the form of `'#{id}'` where `id` corresponds
to an Action created with `importer.createAsset(type, opts)`.

Returns the matching Action instance, or `undefined` if an Action with the supplied
`id` wasn't found.

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
