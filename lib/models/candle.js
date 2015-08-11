var util = require('util');
var BaseModel = require('./base');

/**
 * A candle, representing a single timeframe of market activity.
 * @constructor
 */
function Candle () {
  BaseModel.apply(this, arguments);
}

util.inherits(Candle, BaseModel);

// Start: beginning of our time window
BaseModel.addProperty(Candle, 'start');
// End: end of our time window
BaseModel.addProperty(Candle, 'end');
// Open: price of the first trade that occurred in our time window
BaseModel.addProperty(Candle, 'open', 0);
// High: the highest price trade in our time window
BaseModel.addProperty(Candle, 'high', 0);
// Low: lowest price trade
BaseModel.addProperty(Candle, 'low', 0);
// Close: price of the last trade
BaseModel.addProperty(Candle, 'close', 0);
// Volue: the summed amount of every executed trade in our time window
BaseModel.addProperty(Candle, 'volume', 0);
// Duration: the candle's time window in milliseconds
BaseModel.addDynamicProperty(Candle, 'duration', function () {
  return this.start - this.end;
});

module.exports = Candle;
