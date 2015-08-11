var util = require('util');
var BaseIndicator = require('./base');

function MovingAverage () {
  BaseIndicator.apply(this, arguments);
}

util.inherits(MovingAverage, BaseIndicator);

BaseIndicator.addProperty(MovingAverage, 'period', 7);
BaseIndicator.addProperty(MovingAverage, 'candles', []);

MovingAverage.prototype.next = function (candle) {
  // add a candle to the existing setup
  this.candles.push(candle);
  return this.predict();
};

MovingAverage.prototype.predict = function () {
  // predict the next step in the series
  return this.candles.slice(-this.period)
    .map(function (candle) {
      return candle.close;
    }) / Math.min(this.period, this.candles.length);
  // haha this syntax is probably gross. i'm so sorry, future-diana
};

module.exports = MovingAverage;
