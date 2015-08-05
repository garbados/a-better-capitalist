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
    this.quantquote = {};
    this.quantquote.dir = path.join(FIXTURES_DIR, 'quantquote');

    this.capitalist = new lib.Capitalist();    
  });

  it('should train on quantquote data', function () {
    return this.capitalist.train_from_file(this.quantquote.dir);
  });
});
