var util = require('util');
var BaseModel = require('../models/base');

function BaseIndicator () {
  BaseModel.apply(this, arguments);
}

BaseIndicator.addProperty = BaseModel.addProperty;

util.inherits(BaseIndicator, BaseModel);

module.exports = BaseIndicator;
