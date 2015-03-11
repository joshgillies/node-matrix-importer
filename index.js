var Action = require('./action').Action;
var xml2js = require('xml2js');

var buildActions = new xml2js.Builder({
  rootName: 'actions'
});

function Importer(opts) {
  if (!(this instanceof Importer))
    return new Importer(opts);

  this.actions = [];
}

Importer.prototype.addAction = function addAction(type, opts) {
  var action = new Action(type, opts);
  this.actions.push(action);
  return action;
};

Importer.prototype.addPath = Importer.prototype.addWebPath = function addPath(opts) {
  return this.addAction('add_path', opts);
};

Importer.prototype.createAsset = function createAsset(opts) {
  return this.addAction('create_asset', opts);
};

Importer.prototype.createLink = function createLink(opts) {
  return this.addAction('create_link', opts);
};

Importer.prototype.setAttribute = Importer.prototype.setAttributeValue = function setAttribute(opts) {
  return this.addAction('set_attribute', opts);
};

Importer.prototype.setPermission = function setPermission(opts) {
  return this.addAction('set_permission', opts);
};

Importer.prototype.toString = function importerToString() {
  return buildActions.buildObject({
    action: this.actions
  });
};

module.exports = Importer;
