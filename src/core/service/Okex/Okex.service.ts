import { InjectModel } from "@nestjs/mongoose";
import { HttpService, Injectable, Inject  } from '@nestjs/common';
import { Model } from 'mongoose'
import { createHmac } from 'crypto';
import { OkexBookTicker, OkexTickerPrice, Symbol } from "./interface/Okex.interface";
import { OkexBookTickerDTO, OkexTickerPriceDTO } from './dto/Okex.dto'


function _sign(comand: string, path: string, body = null) {
    const API_KEY = process.env.OKEX_API_KEY;
    const API_SECRET = process.env.OKEX_API_SECRET;
    const API_PASSPHRASE = process.env.OKEX_API_PASSPHRASE;
  
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
  

@Injectable()
export class OkexService { 
    private PUBLIC_API_BASE = null;
    private PRIVATE_API_BASE = null;
    
    constructor(
      private httpService: HttpService,  
    ){
        this.PUBLIC_API_BASE = process.env.OKEX_PUBLIC_API_BASE;
        this.PRIVATE_API_BASE = process.env.OKEX_PRIVATE_API_BASE;
    }
    
     async getPrice(): Promise<OkexTickerPrice> {
        const res = await this.httpService.get(`${this.PUBLIC_API_BASE}/v2/spot/markets/important-index`).toPromise();
        // console.log('getPrice>>>>>>>', res)
        return res.data;
      }
    
      async getPairTicker(pair1: string, pair2: string): Promise<any> {
        const path = `/api/spot/v3/instruments/${pair1}-${pair2}/ticker`;
        const url = `${this.PUBLIC_API_BASE}${path}`;

        const res = await this.httpService.get(url).toPromise();
        return res.data;
      }

      /* async savePairTicker(createBookTicker: OkexBookTickerDTO): Promise<OkexBookTicker>{
        const savePairTicker = new this.binanceBookTickerModel(createBookTicker)
        return await savePairTicker.save()
      } */
    
      async getBalances() {
        const comand = 'GET';
        const path = '/api/account/v3/wallet';
        const url = `${this.PRIVATE_API_BASE}${path}`;
        const signed = _sign(comand, path);
        const config = { headers: signed.headers };
        return this.httpService.get(url, config).toPromise();
      }

}