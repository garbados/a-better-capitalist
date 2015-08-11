var util = require('util');
var BaseIndicator = require('./base');

function NeuralNet () {
  BaseIndicator.apply(this, arguments);
}

util.inherits(NeuralNet, BaseIndicator);

// TODO interface

module.exports = NeuralNet;
