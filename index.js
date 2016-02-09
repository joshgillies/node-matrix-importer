var Action = require('node-matrix-import-actions')
var assets = require('node-matrix-asset-list')
var EventEmitter = require('events').EventEmitter
var extend = require('xtend')
var inherits = require('inherits')
var js2php = require('./js2php')
var xml2js = require('xml2js')

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

  EventEmitter.call(this)

  this._ids = []
  this._cache = null
  this._sorted = !!opts.sortActions
  this._actions = this._sorted ? {
    create_asset: [],
    add_web_path: [],
    set_attribute_value: [],
    set_design_parse_file: [],
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

inherits(Importer, EventEmitter)

Importer.prototype.addAction = function addAction (type, opts) {
  var collection = this._sorted ? this._actions[opts.file && type !== 'set_design_parse_file' ? 'create_asset' : type] : this._actions
  var action = new Action(type, this._createActionId(opts))
  var deferredEmitters = ['create_asset', 'create_file_asset']

  // clear cache
  if (this._cache) {
    this._cache = null
  }

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

  if (!~deferredEmitters.indexOf(type)) {
    this.emit(type, action)
  }

  return action
}

Importer.prototype.addPath = function addPath (opts) {
  return this.addAction('add_web_path', opts)
}

Importer.prototype.createAsset = function createAsset (opts) {
  // move the bulk of this function into `this.addAction`.
  var collection = this._sorted ? this._actions.create_asset : this._actions
  var pointer = this._ids.push(collection.length)
  var type = opts.file ? 'create_file_asset' : 'create_asset'

  try {
    // use valid type_code where possible
    opts.type = assets(opts.type).type_code
  } catch (e) {}

  var action = extend(this.addAction(type, opts), { id: '#' + pointer })

  this.emit(type, action)

  return action
}

Importer.prototype.createLink = function createLink (opts) {
  return this.addAction('create_link', opts)
}

Importer.prototype.setAttribute = function setAttribute (opts) {
  return this.addAction('set_attribute_value', opts)
}

Importer.prototype.setParseFile = function setParseFile (opts) {
  return this.addAction('set_design_parse_file', opts)
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
  if (this._cache) {
    return this._cache
  }

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

  this._cache = new xml2js.Builder(opts).buildObject({
    action: collection.map(function makeCDATA (action) {
      if (action.value) {
        action = extend({}, action)

        action.value = js2php(action.value)
      }
      return action
    })
  })

  return this._cache
}

module.exports = Importer
