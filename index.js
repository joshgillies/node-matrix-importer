var Action = require('node-matrix-import-actions');
var assets = require('node-matrix-assets');
var xml2js = require('xml2js');

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

Importer.prototype.toString = function importerToString(renderOpts) {
  var opts = {
    rootName: 'actions'
  };

  if (renderOpts && typeof renderOpts === 'object')
    opts.renderOpts = renderOpts;

  return new xml2js.Builder(opts).buildObject({
    action: this.actions
  });
};

module.exports = Importer;
