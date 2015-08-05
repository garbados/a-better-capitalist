var path = require('path');

var lib;
if (!process.env.ABC_DEBUG) {
  lib = require('../lib');
} else {
  lib = require('../lib-cov');
}

var FIXTURES_DIR = process.env.ABC_FIXTURES_DIR || path.join(__dirname, 'fixtures');

console.log(FIXTURES_DIR);

