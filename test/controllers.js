var assert = require('assert');

var controllers;
if (process.env.ABC_DEBUG) {
  controllers = require('../lib-cov/controllers');
} else {
  controllers = require('../lib/controllers');
}

describe('controllers', function () {
  describe('base controller', function () {
    // TODO
  });

  describe('candle controller', function () {
    this.timeout(0);

    before(function () {
      this.candles = new controllers.Candles();
    });

    it('should get a single quote', function () {
      return this.candles.get('IBM');
    });

    it('should get a range of quotes', function () {
      return this.candles.get('IBM', new Date(2014, 1, 1), new Date(2014, 01, 15));
    });

    it('should get a range of quotes for multiple symbols', function () {
      return this.candles.get_range(['IBM', 'GOOG'], {
        NumberOfDays: 10,
        DataPeriod: 'Day'
      });
    })
  });
});
