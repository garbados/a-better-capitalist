var util = require('util');
var synaptic = require('synaptic');
var BaseIndicator = require('./base');
var Candle = require('../models/candle');

function NeuralNet () {
  BaseIndicator.apply(this, arguments);
}

util.inherits(NeuralNet, BaseIndicator);

BaseIndicator.addProperty(NeuralNet, 'period', 7);
BaseIndicator.addProperty(NeuralNet, 'candles', []);

NeuralNet.prototype.next = function (candle) {
  // add a candle to the existing setup
  this.candles.push(candle);
  return this.predict();
};

NeuralNet.prototype.predict = function () {
  if (this.net === undefined) throw new Error('Use `train` to train the network before using it for predictions!');

  var format_subset = this._candle_to_net_input.bind(this);
  var subset = this.candles.slice(-this.period).map(format_subset);
  var input = Array.prototype.concat.apply([], subset);
  var output = this.net.activate(input);
  var guess = this._candle_from_net_output(output);

  return guess;
};

/**
 * Train the network on a given body of historical market data.
 * @todo implement this
 * @todo document this
 */
NeuralNet.prototype.train = function (data, opts) {
  var input_layer_size = this._candle_key_order.length * this.period;
  var hidden_layer_size = input_layer_size * 3; // TODO determine a value with some reasoning behind it
  var output_layer_size = this._candle_key_order.length;
  this.net = new synaptic.Architect.LSTM(input_layer_size, hidden_layer_size, output_layer_size);
  this.trainer = new synaptic.Trainer(this.net);

  // if argument[0] is an array, call this.train_from_array
  if (data.length)
    return this.train_from_array.apply(this, arguments);
  // elif argument[0] is a stream, call this.train_from_stream
  else if (false /* TODO */)
    return this.train_from_stream.apply(this, arguments);
  else
    throw new Error('Unexpected training data format');
};

NeuralNet.prototype.train_from_stream = function () {
  throw new Error('Not Implemented');
};

NeuralNet.prototype.train_from_array = function (candles, opts) {
  this.candles = this.candles.concat(candles);
  // turn [a, b, c, ...] into [[a, b, c], [b, c, d], [c, d, e], ...]
  var training_data = [];
  var format_subset = this._candle_to_net_input.bind(this);
  for (var i = 0; i < (candles.length - this.period - 1); i++) {
    var subset = candles.slice(i, i + this.period).map(format_subset);
    var input = Array.prototype.concat.apply([], subset);
    var output_candle = candles[i + this.period + 1];
    var output = this._candle_to_net_input(output_candle);
    training_data.push({
      input: input,
      output: output
    });
  }

  return this.trainer.train(training_data, opts);
};

NeuralNet.prototype._candle_key_order = ['open', 'close', 'high', 'low', 'volume'];

NeuralNet.prototype._candle_to_net_input = function (candle) {
  return this._candle_key_order.map(function (key) {
    return 1 / candle[key];
  });
};

NeuralNet.prototype._candle_from_net_output = function (output) {
  var opts = {};
  this._candle_key_order.forEach(function (key, i) {
    opts[key] = 1 / output[i];
  });
  return new Candle(opts);
};

module.exports = NeuralNet;
