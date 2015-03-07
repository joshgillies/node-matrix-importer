# node-matrix-importer

Generate XML for the "[Import Assets from XML Tool]" with JavaScript!

[![Build Status](https://travis-ci.org/joshgillies/node-matrix-importer.svg)](https://travis-ci.org/joshgillies/node-matrix-importer)

## Example

```js
var importer = require('node-matrix-xml');
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

#### importer.createAsset(opts)

#### importer.createLink(opts)

#### importer.setAttribute(opts)

#### importer.setPermission(opts)

## License

MIT

[Import Assets from XML Tool]: http://manuals.matrix.squizsuite.net/tools/chapters/import-assets-from-xml-tool
