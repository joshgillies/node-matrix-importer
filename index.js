var Action = require('./action').Action;
var assets = require('node-matrix-assets');
var xml2js = require('xml2js');

var buildActions = new xml2js.Builder({
  rootName: 'actions'
});

function Importer(opts) {
  if (!(this instanceof Importer))
    return new Importer(opts);

  this.actions = [];
  this.ids = [];
}

Importer.prototype.addAction = function addAction(type, opts) {
  var action = new Action(type, opts);
  this.actions.push(action);
  return action;
};

Importer.prototype.getActionById = function getActionById(id) {
  return this.actions[this.ids[id - 1]];
};

Importer.prototype.addPath = Importer.prototype.addWebPath = function addPath(opts) {
  return this.addAction('add_path', opts);
};

Importer.prototype.createAsset = function createAsset(type, opts) {
  var id = this.ids.length + 1;

  if (!opts)
    opts = {};

  if (typeof type === 'string')
    opts.type = type;

  if (typeof type === 'object') {
    opts = type;
    type = undefined;
  }

  if (!opts.id)
    opts.id = assets(opts.type) ?
      assets(opts.type).name.replace(' ', '_') + '_' + id : undefined;

  return {
    action: this.addAction('create_asset', opts),
    id: this.ids.push(this.actions.length - 1)
  };
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
