var util = require('util');
var BaseModel = require('../models/base');

function BaseIndicator (candles) {
  if (candles) this.seed(candles);
  BaseModel.apply(this, arguments);
}

util.inherits(BaseIndicator, BaseModel);

BaseIndicator.prototype.seed = function (candles) {
  // pretty simple but I'M SICK, OK? GAWD
  this._candles = candles;
};

// TODO interface

module.exports = BaseIndicator;
