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

### Actions

An action is a task that is performed against a Squiz Matrix system.

`node-matrix-importer` exposes the following methods for creating actions:

#### importer.addPath(opts)

`opts` in an object used to define the `addPath` action properties

  * `opts.id`
  * `opts.path`
  * `opts.assetId`

#### importer.createAsset(opts)

`opts` in an object used to define the `createAsset` action properties

  * `opts.id`
  * `opts.parentId`
  * `opts.type`
  * `opts.link`
  * `opts.value`
  * `opts.dependant`
  * `opts.exclusive`

#### importer.createLink(opts)

`opts` in an object used to define the `createLink` action properties

  * `opts.to`
  * `opts.from`
  * `opts.link`
  * `opts.value`
  * `opts.dependant`
  * `opts.exclusive`
  * `opts.major`

#### importer.setAttribute(opts)

`opts` in an object used to define the `setAttribute` action properties

  * `opts.id`
  * `opts.assetId`
  * `opts.attribute`
  * `opts.value`

#### importer.setPermission(opts)

`opts` in an object used to define the `setPermission` action properties

  * `opts.assetId`
  * `opts.permission`
  * `opts.granted`
  * `opts.userId`

## License

MIT

[Import Assets from XML Tool]: http://manuals.matrix.squizsuite.net/tools/chapters/import-assets-from-xml-tool
