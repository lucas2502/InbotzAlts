import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { BinanceService } from 'src/core/service/Binace/Binance.service';
import { OkexService } from 'src/core/service/Okex/Okex.service';
import { HoubiService } from 'src/core/service/Huobi/Houbi.service';
import { MercadoBitcoinService } from 'src/core/service/MercadoBitcoin/MercadoBitcoin.service';

import { InjectModel } from '@nestjs/mongoose';
import { PairTicker } from './interface/Cron.interface'
import { Model } from 'mongoose';
import { PairTickerDTO } from './dto/Cron.dto';

@Injectable()
export class CronService {

  constructor(
    private readonly binanceService: BinanceService,
    private readonly okexService: OkexService,
    private readonly houbiService: HoubiService,
    private readonly mercadoBitcoinService: MercadoBitcoinService,
    @InjectModel('PairTicker') private pairTickerModel: Model<PairTicker> 
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
      //const bBinance = await this.binanceService.getBalances();

      // Tickers new
      const pair1 = 'ADA';
      const pair2 = 'BTC';
      const tOkex = await this.okexService.getPairTicker(pair1, pair2);
      const tBinance = await this.binanceService.getPairTicker(pair1, pair2);
     /*  const tHoubi = await this.houbiService.getPairTicker(pair1, pair2);
      const tMercadoBitcoin = await this.mercadoBitcoinService.getPairTicker('LTC', pair2); */

      /* console.log('tOkex>>', tOkex);
      console.log('tBinance>>', tBinance); */
      /* console.log('tHoubi>>', tHoubi);
      console.log('tMercadoBitcoin>>', tMercadoBitcoin); */

      const data = [
        {
          symbol: tBinance['symbol'],
          bid: tBinance['bidPrice'],
          ask: tBinance['askPrice'],
          exchange: 'Binance',
        },
        {
          symbol: tOkex['product_id'],
          bid: tOkex['bid'],
          ask: tOkex['ask'],
          exchange: 'OKEX',
        }, 
      ] as PairTickerDTO[]; 

      data.map( item => this.savePairTicker(item));

    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async savePairTicker(body: PairTickerDTO | PairTickerDTO[] ): Promise<PairTicker> {
    const res = new this.pairTickerModel(body);
    console.log('bodySave', res)
    return await res.save() 
  }

  async getAllPairTicker(): Promise<PairTicker[]> {
    const res = await this.pairTickerModel.find()
    console.log('resGetAll>>', res);
    return res
  }
}
