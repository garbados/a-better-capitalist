var fs = require('fs');
var brain = require('brain');
var Promise = require('bluebird');
var csv = require('csv');

Promise.promisifyAll(fs);

/**
 * A single market-predicting intelligence.
 * @class
 */
function Capitalist () {
  this.net = new brain.NeuralNetwork();
}

/**
 * Train the Capitalist from a directory of CSV files.
 * @todo TODO implement
 * @param {string} f Path to a directory of CSV files.
 * @returns {Promise}
 */
Capitalist.prototype.train_from_dir = function (d) { };

/**
 * Train the Capitalist from a CSV file, or a directory of CSV files.
 * @todo TODO implement
 * @param {string} f Path to a CSV file or a directory containing them.
 * @returns {Promise}
 */
Capitalist.prototype.train_from_file = function (f) { };

/**
 * Train the Capitalist from an array of objects resembling
 * `{input:{}, output:{}}`.
 * @todo TODO implement
 * @param {array} list An array of training objects.
 * @returns {Promise}
 */
Capitalist.prototype.train_from_array = function (list) { };

/**
 * Uses whatever training strategy matches the input `d`.
 * @param {object} d Either a filepath as a string,
 * a directory path as a string,
 * or an array of training objects.
 * @returns {Promise}
 */
Capitalist.prototype.train = function (d) {
  if (typeof d === 'string') {
    this.train_from_file.apply(this, arguments);
  } else {
    this.train_from_array.apply(this, arguments);
  }
};

exports.Capitalist = Capitalist;

