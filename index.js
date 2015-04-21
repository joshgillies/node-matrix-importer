var Action = require('node-matrix-import-actions')
var assets = require('node-matrix-assets')
var js2php = require('./js2php')
var xml2js = require('xml2js')
var extend = require('xtend')

function outputAsId (actionId) {
  return '[[output://' + actionId + '.assetid]]'
}

function Importer (opts) {
  if (!(this instanceof Importer)) {
    return new Importer(opts)
  }

  if (!opts || !opts.hasOwnProperty) {
    opts = {}
  }

  this._ids = []
  this._sorted = !!opts.sortActions
  this._actions = this._sorted ? {
    create_asset: [],
    add_path: [],
    set_attribute: [],
    set_metadata_schema: [],
    set_metadata_value: [],
    create_link: [],
    set_permission: []
  } : []
  this._createActionId = function createActionId (opts) {
    var action = this.getActionById(opts.assetId)
    var asset = assets(opts.type)

    if (!opts.id) {
      if (action && (asset = assets(action.type_code))) {
        opts.id = asset.name.replace(' ', '_') + '_' + action.id.replace('#', '')
      } else if (asset) {
        opts.id = asset.name.replace(' ', '_') + '_' + (this._ids.length)
      } else if (opts.type) {
        opts.id = opts.type.replace(' ', '_') + '_' + (this._ids.length)
      } else {
        opts.id = Date.now() + ''
      }
    }

    return opts
  }
}

Importer.prototype.addAction = function addAction (type, opts) {
  var collection = this._sorted ? this._actions[type] : this._actions
  var action = new Action(type, this._createActionId.call(this, opts))

  action.action_id = action.action_id.replace(/#/g, '')

  if (this.getActionById(action.asset)) {
    action.asset = outputAsId(this.getActionById(action.asset).action_id)
  }

  if (this.getActionById(action.assetid)) {
    action.assetid = outputAsId(this.getActionById(action.assetid).action_id)
  }

  if (this.getActionById(action.fieldid)) {
    action.fieldid = outputAsId(this.getActionById(action.fieldid).action_id)
  }

  if (this.getActionById(action.parentid)) {
    action.parentid = outputAsId(this.getActionById(action.parentid).action_id)
  }

  if (this.getActionById(action.schemaid)) {
    action.schemaid = outputAsId(this.getActionById(action.schemaid).action_id)
  }

  if (this.getActionById(action.userid)) {
    action.userid = outputAsId(this.getActionById(action.userid).action_id)
  }

  collection.push(action)

  return action
}

Importer.prototype.addPath = function addPath (opts) {
  return this.addAction('add_path', opts)
}

Importer.prototype.createAsset = function createAsset (opts) {
  var collection = this._sorted ? this._actions.create_asset : this._actions
  var pointer = this._ids.push(collection.length)

  try {
    opts.type = assets(opts.type).type_code
  } catch (e) {}

  return extend(this.addAction('create_asset', opts), { id: '#' + pointer })
}

Importer.prototype.createLink = function createLink (opts) {
  return this.addAction('create_link', opts)
}

Importer.prototype.setAttribute = function setAttribute (opts) {
  return this.addAction('set_attribute', opts)
}

Importer.prototype.setMetadataSchema = function setAttribute (opts) {
  return this.addAction('set_metadata_schema', opts)
}

Importer.prototype.setMetadataValue = function setAttribute (opts) {
  return this.addAction('set_metadata_value', opts)
}

Importer.prototype.setPermission = function setPermission (opts) {
  return this.addAction('set_permission', opts)
}

Importer.prototype.getActionById = function getActionById (id) {
  var collection = this._sorted ? this._actions.create_asset : this._actions

  if (/#/.test(id += '')) {
    id = +(id.replace('#', ''))
    return extend(collection[this._ids[id - 1]], { id: '#' + id })
  }
}

Importer.prototype.toString = function importerToString (renderOpts) {
  var collection = this._sorted ? Object.keys(this._actions)
    .map(function mergeKeys (key) {
      return this[key]
    }, this._actions).reduce(function flatten (a, b) {
      return a.concat(b)
    }) : this._actions
  var opts = {
    rootName: 'actions',
    cdata: true
  }

  if (renderOpts && typeof renderOpts === 'object') {
    opts.renderOpts = renderOpts
  }

  return new xml2js.Builder(opts).buildObject({
    action: collection.map(function makeCDATA (action) {
      if (action.value) {
        action = extend({}, action)

        action.value = js2php(action.value)
      }
      return action
    })
  })
}

module.exports = Importer
