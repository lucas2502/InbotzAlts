import { Injectable } from '@nestjs/common';
import { PoloniexService } from 'src/core/services/poloniex/PoloniexService';
import { Interval } from '@nestjs/schedule';
import { BinanceService } from 'src/core/services/binance/BinanceService';
import { BitfinexService } from 'src/core/services/bitfinex/BitfinexService';
import { OkexService } from 'src/core/services/okex/OkexService';

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'data/analise.csv',
  header: [
    { id: 'symbol', title: 'Symbol' },
    { id: 'bid', title: 'Bid' },
    { id: 'ask', title: 'Ask' },
    { id: 'exchange', title: 'Exchange' },
  ],
});

@Injectable()
export class CronService {
  constructor(
    private readonly poloniexService: PoloniexService,
    private readonly bitfinexService: BitfinexService,
    private readonly okexService: OkexService,
    private readonly binanceService: BinanceService
  ) {}

  @Interval(parseInt(process.env.INTERVAL) || 10000)
  async getBalances() {
    // If database empty, get balances from APIs
    // If there balances in database, read it
    // Read exchanges coin values
    // Calculate spread
    // Decide action
    // If trade, verify if there is balance
    // If ok, do Trade
    // Register trade in database

    try {
      // Balances
      // const bPoloniex = await this.poloniexService.getBalances();
      // const bOkex = await this.okexService.getBalances();
      // const bBitfinex = await this.bitfinexService.getBalances();
      // const bBinance = await this.binanceService.getBalances();

      // Tickers new
      const pair1 = 'ADA';
      const pair2 = 'BTC';
      const tOkex = await this.okexService.getPairTicker(pair1, pair2);
      const tBinance = await this.binanceService.getPairTicker(pair1, pair2);

      console.log(tOkex.data);
      console.log(tBinance.data);

      const data = [
        {
          symbol: tBinance.data['symbol'],
          bid: tBinance.data['bidPrice'],
          ask: tBinance.data['askPrice'],
          exchange: 'Binance',
        },
        {
          symbol: tOkex.data['product_id'],
          bid: tOkex.data['bid'],
          ask: tOkex.data['ask'],
          exchange: 'OKEX',
        },
      ];

      await csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
