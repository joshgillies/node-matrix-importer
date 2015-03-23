var Action = require('node-matrix-import-actions');
var assets = require('node-matrix-assets');
var xml2js = require('xml2js');
var extend = require('xtend');

function outputAsId(actionId) {
  return '[[output://' + actionId + '.assetid]]';
}

function Importer(opts) {
  if (!(this instanceof Importer))
    return new Importer(opts);

  if(!opts)
    opts = {};

  this._ids = [];
  this._sorted = !!opts.sortActions;
  this._actions = this._sorted ? {
    create_asset: [],
    add_path: [],
    set_attribute: [],
    create_link: [],
    set_permission: []
  } : [];
  this._createActionId = function createActionId(opts) {
    var action = this.getActionById(opts.assetId);
    var asset = assets(opts.type);

    if (!opts.id) {
      if (action && (asset = assets(action.type_code))) {
        opts.id = asset.name.replace(' ', '_') + '_' + action.id.replace('#', '');
      } else if (asset) {
        opts.id = asset.name.replace(' ', '_') + '_' + (this._ids.length);
      } else {
        opts.id = Date.now()+'';
      }
    }

    return opts;
  };
}

Importer.prototype.addAction = function addAction(type, opts) {
  var collection = this._sorted ? this._actions[type] : this._actions;
  var action = new Action(type, this._createActionId.call(this, opts));

  action.action_id = action.action_id.replace('#', '');

  if (this.getActionById(action.asset))
    action.asset = outputAsId(this.getActionById(action.asset).action_id);

  if (this.getActionById(action.userid))
    action.userid = outputAsId(this.getActionById(action.userid).action_id);

  if (this.getActionById(action.assetid))
    action.assetid = outputAsId(this.getActionById(action.assetid).action_id);

  if (this.getActionById(action.parentid))
    action.parentid = outputAsId(this.getActionById(action.parentid).action_id);

  collection.push(action);

  return action;
};

Importer.prototype.addPath = function addPath(opts) {
  return this.addAction('add_path', opts);
};

Importer.prototype.createAsset = function createAsset(type, opts) {
  var collection = this._sorted ? this._actions.create_asset : this._actions;
  var pointer = this._ids.push(collection.length);

  if (!opts)
    opts = {};

  if (typeof type === 'string')
    opts.type = type;

  if (typeof type === 'object') {
    opts = type;
    type = undefined;
  }

  return extend(this.addAction('create_asset', opts), { id: '#' + pointer });
};

Importer.prototype.createLink = function createLink(opts) {
  return this.addAction('create_link', opts);
};

Importer.prototype.setAttribute = function setAttribute(opts) {
  return this.addAction('set_attribute', opts);
};

Importer.prototype.setPermission = function setPermission(opts) {
  return this.addAction('set_permission', opts);
};

Importer.prototype.getActionById = function getActionById(id) {
  var collection = this._sorted ? this._actions.create_asset : this._actions;

  if (/#/.test(id+='')) {
    id = +(id.replace('#', ''));
    return extend(collection[this._ids[id - 1]], { id: '#' + id });
  }
};

Importer.prototype.toString = function importerToString(renderOpts) {
  var opts = {
    rootName: 'actions'
  };

  if (renderOpts && typeof renderOpts === 'object')
    opts.renderOpts = renderOpts;

  return new xml2js.Builder(opts).buildObject({
    action: this._sorted ? Object.keys(this._actions).map(function mergeKeys(action) {
      return this._actions[action];
    }, this).reduce(function flatten(a, b) {
      return a.concat(b);
    }) : this._actions
  });
};

module.exports = Importer;
