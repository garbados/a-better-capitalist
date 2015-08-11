/**
 * A base model that all other models inherit from.
 * Provides utilities for defining properties,
 * and serializing to JSON.
 * @constructor
 */
function BaseModel (opts) {
  // use opts to give things starting values
  if (opts) {
    var key;
    for (key in opts) {
      this['_' + key] = opts[key];
    }
  }
}

BaseModel.addProperty = function (obj, name, default_value) {
  var property = '_' + name;
  var prototype = obj.prototype;
  Object.defineProperty(prototype, name, {
    get: function () {
      return this[property] || default_value;
    },
    set: function (value) {
      this[property] = value;
    }
  });
};

BaseModel.addDynamicProperty = function (obj, name, func) {
  var property = '_' + name;
  var prototype = obj.prototype;
  Object.defineProperty(prototype, name, {
    get: function () {
      return func.call(this);
    }
  });
};

Object.defineProperty(BaseModel.prototype, 'json', {
  get: function () {
    var self = this;
    var json = {};
    Object.keys(this)
    .filter(function (name) {
      return name[0] === '_';
    })
    .forEach(function (name) {
      json[name.slice(1)] = self[name];
    });

    return json;
  }
});

BaseModel.prototype.toJSON = function () {
  return this.json;
};

module.exports = BaseModel;

