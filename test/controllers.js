var assert = require('assert');
var nock = require('nock');

var scope = nock('http://dev.markitondemand.com')
  .get('/Api/v2/Quote/json?symbol=IBM')
  .reply(200, {
    Open: 1,
    LastPrice: 2,
    High: 3,
    Low: 0,
    Volume: 5
  })
  .get('/Api/v2/InteractiveChart/json?parameters=%7B%22StartDate%22%3A%222014-02-01T00%3A00%3A00-00%22%2C%22EndDate%22%3A%222014-02-15T00%3A00%3A00-00%22%2C%22DataPeriod%22%3A%22Day%22%2C%22Normalized%22%3Afalse%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22IBM%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22ohlc%22%5D%7D%5D%7D')
  .reply(200, {
    Elements: [{
      DataSeries: {
        open: {
          values: [1]
        },
        close: {
          values: [2]
        },
        high: {
          values: [3]
        },
        low: {
          values: [0]
        }
      }
    }]
  })
  .get('/Api/v2/InteractiveChart/json?parameters=%7B%22NumberOfDays%22%3A10%2C%22DataPeriod%22%3A%22Day%22%2C%22Normalized%22%3Afalse%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22IBM%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22ohlc%22%5D%7D%2C%7B%22Symbol%22%3A%22GOOG%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22ohlc%22%5D%7D%5D%7D')
  .reply(200, {
    Elements: [{
      DataSeries: {
        open: {
          values: [1]
        },
        close: {
          values: [2]
        },
        high: {
          values: [3]
        },
        low: {
          values: [0]
        }
      }
    }]
  });

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
      var begin = 1391212800000;
      var end = 1392422400000;
      return this.candles.get('IBM', begin, end);
    });

    it('should get a range of quotes for multiple symbols', function () {
      return this.candles.get_range(['IBM', 'GOOG'], {
        NumberOfDays: 10,
        DataPeriod: 'Day'
      });
    });
  });
});
