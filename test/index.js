var assert = require('assert');
var path = require('path');

var lib;
if (!process.env.ABC_DEBUG) {
  lib = require('../lib');
} else {
  lib = require('../lib-cov');
}

var FIXTURES_DIR = process.env.ABC_FIXTURES_DIR || path.join(__dirname, '..', 'fixtures');

describe('lib', function () {
  before(function () {
    this.training_file = path.join(FIXTURES_DIR, 'quantquote_daily_sp500_83986', 'daily', 'table_goog.csv');
    this.capitalist = new lib.Capitalist();    
  });

  it('should train on fixtures data', function () {
    var self = this;
    return this.capitalist.train(this.training_file)
      .then(function () {
        var test_data = self.capitalist.nets.goog.firstDatum;
        var test_output = self.capitalist.nets.goog.neuralNetwork.run(test_data.input);
        assert.equal(test_output, test_data.output);
      });
  });
});
