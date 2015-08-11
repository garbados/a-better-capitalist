var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var util = require('util');
var BaseController = require('./base');
var Candle = require('../models/candle');

var QUOTE_API_URL = 'http://dev.markitondemand.com/Api/v2/Quote/json';
var RANGE_API_URL = 'http://dev.markitondemand.com/Api/v2/InteractiveChart/json';

function CandlesController () {
  BaseController.apply(this, arguments);
}

util.inherits(CandlesController, BaseController);

CandlesController.prototype.get = function (symbol, date_begin, date_end) {
  if (!date_begin || !date_end) {
    return this.get_current(symbol);
  } else {
    // markit demands strange date formatting :|
    var StartDate = (new Date(date_begin)).toISOString().slice(0, -5) + '-00';
    var EndDate = (new Date(date_end)).toISOString().slice(0, -5) + '-00';
    return this.get_range([symbol], {
      StartDate: StartDate,
      EndDate: EndDate,
      DataPeriod: 'Day'
    });
  }
};

CandlesController.prototype.get_current = function (symbol) {
  return request.getAsync({
    uri: QUOTE_API_URL,
    qs: {
      symbol: symbol
    }
  })
  .spread(function (response, body) {
    return new Candle({
      open: body.Open,
      close: body.LastPrice,
      high: body.High,
      low: body.Low,
      volume: body.Volume
    });
  });
};

CandlesController.prototype.get_range = function (symbols, opts) {
  opts = opts || {};
  var parameters = opts;
  parameters.Normalized = false;
  parameters.Elements = symbols.map(function (symbol) {
    return {
      Symbol: symbol,
      Type: "price",
      Params: ["ohlc"]
    };
  });

  return request.getAsync({
    uri: RANGE_API_URL,
    qs: { parameters: JSON.stringify(parameters) }
  })
  .spread(function (response, body_raw) {
    // convert response body into array of candles
    body = JSON.parse(body_raw);
    return body.Elements.map(function (element) {
      var len = element.DataSeries.open.values.length;
      var results = [];
      for (var i = 0; i < len; i++) {
        var candle = new Candle({
          open: element.DataSeries.open.values[i],
          close: element.DataSeries.close.values[i],
          high: element.DataSeries.high.values[i],
          low: element.DataSeries.low.values[i]
        });
        results.push(candle);
      }
      return results;
    });
  });
};

module.exports = CandlesController;
