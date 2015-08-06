# A Better Capitalist

[![Build Status](https://travis-ci.org/garbados/a-better-capitalist.svg?branch=master)](https://travis-ci.org/garbados/a-better-capitalist)
[![Coverage Status](https://coveralls.io/repos/garbados/a-better-capitalist/badge.svg?branch=master&service=github)](https://coveralls.io/github/garbados/a-better-capitalist?branch=master)

A better capitalist, or ABC for short, is a neural net trained to beat the market. Currently experimental.

## Development Plan

1. [IN PROGRESS] Train ABC against historical NASDAQ data; observe performance when fully-trained intelligence is dumped at various historical points.
2. [TODO] Train ABC to parse news articles for their market impact, and integrate that reasoning into trading decisions.
3. [TODO] Get ABC to read market data and financial news from live sources like Google News.
4. [TODO] Train ABC on live markets; observe performance of paper trading.
5. [TODO] Unleash with real cash money.

## What? Why?

Capitalism makes sense for machines, and machine capitalists could [destroy the world](http://garbados.github.io/recent_stories/#/story/robot_capitalism.md). I want to test that hypothesis, and mess around with neural nets.

A better capitalist is an automated trading bot for human stock markets like the NYSE. It's trained on historical stock data and news articles going back as far as possible, and ideally is able to pay for its own maintenance and upkeep. Just configure it, start it, and leave it alone. ABC does the rest.

## Install

```bash
git clone git@github.com:garbados/a-better-capitalist.git
cd a-better-capitalist
npm install
npm start
```

Your Capitalist is now running!

## Usage

TODO

## Test

```bash
git clone git@github.com:garbados/a-better-capitalist.git
cd a-better-capitalist
npm install
npm test
```

## Further Reading

* [An introduction to automated trading](https://tradewave.net/help/trading)
* [Neural Network Applications in Stock Market Predictions - A Methodology Analysis](http://www.efos.unios.hr/arhiva/dokumenti/mzekic_varazdin98.pdf)
* [Markit On Demand APIs](http://dev.markitondemand.com/#doc_lookup)

## License

[ISC](http://opensource.org/licenses/ISC), yo.

