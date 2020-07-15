import { InjectModel } from "@nestjs/mongoose";
import { HttpService, Injectable, Inject  } from '@nestjs/common';
import { Model } from 'mongoose'
import { createHmac } from 'crypto';
import { MercadoBitcoinBookTicker, MercadoBitcoinTickerPrice, Symbol } from "./interface/MercadoBitcoin.interface";
import { MercadoBitcoinBookTickerDTO, MercadoBitcoinTickerPriceDTO } from './dto/MercadoBitcoin.dto'

enum Coin {
  'BTC',
  'LTC',
  'BCH',
  'XRP',
  'ETH',
  'MBPRK01',
  'MBPRK02',
  'MBPRK03',
  'MBPRK04',
  'MBCONS01',
  'USDC',
}

/* function _sign(comand: string, path: string, body = null) {
    const API_KEY = process.env.HOUBI_API_KEY;
    const API_SECRET = process.env.HOUBI_API_SECRET;
    const API_PASSPHRASE = process.env.HOUBI_API_PASSPHRASE;
  
    const nonce = Date.now() / 1000;
  
    if (!body) {
      body = '';
    }
  
    const str = `${nonce}${comand}${path}${body}`;
    const hmac = createHmac('sha256', API_SECRET);
    const signature = hmac.update(str).digest('base64');
  
    const headers = {
      'OK-ACCESS-KEY': API_KEY,
      'OK-ACCESS-SIGN': signature,
      'OK-ACCESS-TIMESTAMP': nonce,
      'OK-ACCESS-PASSPHRASE': API_PASSPHRASE,
    };
  
    return {
      headers,
      data: str,
    };
  }
  
 */
@Injectable()
export class MercadoBitcoinService { 
    private PUBLIC_API_BASE = null;
    private PRIVATE_API_BASE = null;
    
    constructor(
      private httpService: HttpService,  
    ){
        this.PUBLIC_API_BASE = process.env.MERCADO_BITCOIN_PUBLIC_API_BASE;
        this.PRIVATE_API_BASE = process.env.MERCADO_BITCOIN_PRIVATE_API_BASE;
    }
    
     async getPrice(coin: string): Promise<MercadoBitcoinTickerPrice> {
        const res = await this.httpService.get(`${this.PUBLIC_API_BASE}/${coin}/ticker/`).toPromise();
        // console.log('getPrice>>>>>>>', res)
        return res.data;
      }
    
      async getPairTicker(pair1: string, pair2: string): Promise<any> {
        const path1 = `/${pair1}/ticker/`;
        const path2 = `/${pair2}/ticker/`;
        const url1 = `${this.PUBLIC_API_BASE}${path1}`;
        const url2 = `${this.PUBLIC_API_BASE}${path2}`;

        const res1 = await this.httpService.get(url1).toPromise();
        const res2 = await this.httpService.get(url2).toPromise();
        return { coin1: pair1, ...res1.data,  coin2: pair2, ...res2.data};
      }

      /* async savePairTicker(createBookTicker: MercadoBitcoinBookTickerDTO): Promise<MercadoBitcoinBookTicker>{
        const savePairTicker = new this.binanceBookTickerModel(createBookTicker)
        return await savePairTicker.save()
      } */
    
      /* async getBalances() {
        const comand = 'GET';
        const path = '/api/account/v3/wallet';
        const url = `${this.PRIVATE_API_BASE}${path}`;
        const signed = _sign(comand, path);
        const config = { headers: signed.headers };
        return this.httpService.get(url, config).toPromise();
      } */

}