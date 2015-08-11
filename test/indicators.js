var assert = require('assert');
var csv = require('csv');
var fs = require('fs');

var indicators;
if (process.env.ABC_DEBUG) {
  indicators = require('../lib-cov/indicators');
} else {
  indicators = require('../lib/indicators');
}

describe('indicators', function () {
  describe('moving average', function () {
    before(function (done) {
      var self = this;
      var file = fs.readFileSync('fixtures/quantquote_daily_sp500_83986/daily/table_aapl.csv').toString();
      this.moving_average = new indicators.MovingAverage();

      csv.parse(file, {
        columns: [ 'DATE', 'TIME', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'VOLUME' ]
      }, function (err, data) {
        self.candles = data.map(function (datum) {
          return {
            close: Number(datum.CLOSE)
          };
        });
        done();
      });
    });

    it('should follow a changing series of candles', function () {
      this.moving_average.candles = this.candles;
      var prediction = this.moving_average.predict();
      var next_prediction = this.moving_average.next({
        close: prediction
      });
      assert.notEqual(prediction, next_prediction);
    });
  });
});