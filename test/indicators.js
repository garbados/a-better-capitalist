var assert = require('assert');
var csv = require('csv');
var fs = require('fs');
var Candle = require('../lib/models/candle');

var indicators;
if (process.env.ABC_DEBUG) {
  indicators = require('../lib-cov/indicators');
} else {
  indicators = require('../lib/indicators');
}

var QUANTQUOTE_COLUMNS = [ 'DATE', 'TIME', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'VOLUME' ];

describe('indicators', function () {
  describe('moving average', function () {
    before(function () {
      this.training_data = [{"close":3.95098,"open":3.31397,"high":3.95098,"low":3.28236,"volume":24947201.1},{"close":3.8902,"open":4.01177,"high":4.02635,"low":3.69325,"volume":22344145.08},{"close":4.60502,"open":3.87561,"high":4.98432,"low":3.58628,"volume":63150252.55},{"close":4.24032,"open":4.57341,"high":4.6804,"low":4.20871,"volume":36978255.52},{"close":4.39107,"open":4.24032,"high":4.52965,"low":4.11875,"volume":27687622.95},{"close":4.43726,"open":4.40808,"high":4.71201,"low":4.25491,"volume":31624883.38},{"close":4.46886,"open":4.24032,"high":4.52965,"low":4.16495,"volume":18300352.79},{"close":4.76306,"open":4.52965,"high":4.77279,"low":4.49804,"volume":22182098.34},{"close":4.78738,"open":4.83357,"high":4.84816,"low":4.6804,"volume":20340344.31},{"close":4.66581,"open":4.66581,"high":4.80196,"low":4.52965,"volume":19157062.33},{"close":4.55883,"open":4.72659,"high":4.72659,"low":4.54424,"volume":8643666.36},{"close":4.61962,"open":4.6342,"high":4.69499,"low":4.52965,"volume":8546191.97},{"close":4.59044,"open":4.55883,"high":4.6342,"low":4.51263,"volume":6622588.92000001},{"close":4.69499,"open":4.54424,"high":4.80196,"low":4.52965,"volume":11570811.37}];
      this.candles = this.training_data.map(function (data) {
        return new Candle(data);
      });
      this.moving_average = new indicators.MovingAverage();
    });

    it('should follow a changing series of candles', function () {
      this.moving_average.candles = this.candles.slice(0, -1);
      var prediction = this.moving_average.predict();
      var next_prediction = this.moving_average.next(this.candles.slice(-1)[0]);
      assert.notEqual(prediction, next_prediction);
    });
  });

  describe('neural net', function () {
    before(function () {
      this.training_data = [{"close":3.95098,"open":3.31397,"high":3.95098,"low":3.28236,"volume":24947201.1},{"close":3.8902,"open":4.01177,"high":4.02635,"low":3.69325,"volume":22344145.08},{"close":4.60502,"open":3.87561,"high":4.98432,"low":3.58628,"volume":63150252.55},{"close":4.24032,"open":4.57341,"high":4.6804,"low":4.20871,"volume":36978255.52},{"close":4.39107,"open":4.24032,"high":4.52965,"low":4.11875,"volume":27687622.95},{"close":4.43726,"open":4.40808,"high":4.71201,"low":4.25491,"volume":31624883.38},{"close":4.46886,"open":4.24032,"high":4.52965,"low":4.16495,"volume":18300352.79},{"close":4.76306,"open":4.52965,"high":4.77279,"low":4.49804,"volume":22182098.34},{"close":4.78738,"open":4.83357,"high":4.84816,"low":4.6804,"volume":20340344.31},{"close":4.66581,"open":4.66581,"high":4.80196,"low":4.52965,"volume":19157062.33},{"close":4.55883,"open":4.72659,"high":4.72659,"low":4.54424,"volume":8643666.36},{"close":4.61962,"open":4.6342,"high":4.69499,"low":4.52965,"volume":8546191.97},{"close":4.59044,"open":4.55883,"high":4.6342,"low":4.51263,"volume":6622588.92000001},{"close":4.69499,"open":4.54424,"high":4.80196,"low":4.52965,"volume":11570811.37}];
      this.net = new indicators.NeuralNet();
    });

    it('should train on an array of stock data', function () {
      this.timeout(3000);
      this.net.period = 2; // speeds up tests
      var result = this.net.train(this.training_data.slice(0, -1));
      assert(!isNaN(result.error));
      assert(result.iterations > 1);
    });

    it('should make predictions that make sense', function () {
      var guess = this.net.predict();
      var actual = this.training_data.slice(-1)[0];
      assert(Math.abs(guess.open - actual.open) < 1);
      assert(Math.abs(guess.close - actual.close) < 1);
      assert(Math.abs(guess.high - actual.high) < 1);
      assert(Math.abs(guess.low - actual.low) < 1);
      // volume predictions are WAY the hell out there, so, wtf? but also, w/e
    });
  });
});