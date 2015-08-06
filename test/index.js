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

  it.skip('should train on fixtures data', function () {
    // TODO
  });
});
