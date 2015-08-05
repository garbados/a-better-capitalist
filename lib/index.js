var path = require('path');
var fs = require('fs');
var brain = require('brain');
var Promise = require('bluebird');
var csv = require('csv');

Promise.promisifyAll(fs);

var HEADERS = [ 'DATE', 'TIME', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'VOLUME', 'SPLITS', 'EARNINGS', 'DIVIDENDS' ];

/**
 * A single market-predicting intelligence.
 * @class
 */
function Capitalist () {
  this.net = new brain.NeuralNetwork();
  this.nets = {};
}

/**
 * Train the Capitalist from a directory of CSV files.
 * @param {string} d Path to a directory of CSV files.
 * @returns {Promise}
 */
Capitalist.prototype.train_from_dir = function (d) {
  var self = this;
  return fs.readdirAsync(d)
    .then(function (files) {
      var promises = files.map(function (file) {
        var f = path.join(d, file);
        if (file.slice(-3) === 'csv') {
          return self.train_from_file(f);
        } else {
          return fs.statAsync(f)
            .then(function (stats) {
              if (stats.isDirectory()) {
                return self.train_from_dir(f);
              } else {
                // just ignore it
                return Promise.resolve();
              }
            });
        }
      });

      return Promise.all(promises);
    });
};

/**
 * Train the Capitalist from a CSV file.
 * @param {string} f Path to a CSV file.
 * @returns {Promise}
 */
Capitalist.prototype.train_from_file = function (f) {
  var self = this;
  return new Promise(function (resolve, reject) {
    var stock_name_index = f.indexOf('table_') + 6;
    var stock_name = f.slice(stock_name_index, -4);
    var net = self.net.createTrainStream();
    self.nets[stock_name] = net;
    var parser = csv.parse({ columns: HEADERS });
    var transformer = csv.transform(function (data) {
      // TODO adjust inputs to always fall between 0 and 1
      return {
        input: data,
        output: data.CLOSE - data.OPEN
      };
    });
    
    fs.createReadStream(f)
      .pipe(parser)
      .pipe(transformer)
      .pipe(net);

    net.on('error', reject);
    net.on('finish', resolve);
  });
};

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
  var self = this;
  if (typeof d === 'string') {
    return fs.statAsync(d)
      .then(function (stats) {
        if (stats.isDirectory()) {
          return self.train_from_dir(d);
        } else {
          return self.train_from_file(d);
        }
      });
  } else {
    return this.train_from_array.apply(this, arguments);
  }
};

exports.Capitalist = Capitalist;

