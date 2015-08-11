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
  var subset = this.candles.slice(-this.period);
  var sum = subset
    .map(function (candle) { return candle.close; })
    .reduce(function (a, b) {return a + b; }, 0);
  var divisor = Math.min(this.period, this.candles.length);
  return sum / divisor;
};

module.exports = MovingAverage;
