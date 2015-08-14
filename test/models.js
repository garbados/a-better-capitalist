var assert = require('assert');

var models;
if (process.env.ABC_DEBUG) {
  models = require('../lib-cov/models');
} else {
  models = require('../lib/models');
}

describe('models', function () {
  describe('base model', function () {
    it('should serialize to json', function () {
      var model = new models.BaseModel({
        value: 1
      });
      var model_json = model.json;
      // assert properties work
      assert.equal(model._value, model_json.value);
      assert.equal(model_json._value, undefined);
      // assert JSON.stringify works
      assert.equal(JSON.stringify(model), JSON.stringify(model_json));
    });

    it('should add properties to objects', function () {
      function TestObject () {}

      models.BaseModel.addProperty(TestObject, 'name', 'dork');

      var obj = new TestObject();
      assert.equal(obj.name, 'dork');
      assert.equal(obj._name, undefined);

      obj.name = 'nerd';
      assert.equal(obj.name, 'nerd');
      assert.equal(obj.name, obj._name);
    });
  });

  describe('candle', function () {
    before(function () {
      this.candle = new models.Candle();
    });

    it('should have base values for high, low, open, close, and volume.', function () {
      var self = this;
      ['high', 'low', 'open', 'close']
      .forEach(function (property) {
        assert.equal(typeof self.candle[property], 'number');
      });
    });
  });
});
