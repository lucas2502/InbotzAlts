import { InjectModel } from "@nestjs/mongoose";
import { HttpService, Injectable, Inject  } from '@nestjs/common';
import { Model } from 'mongoose'
import { createHmac } from 'crypto';
import { HoubiBookTicker, HoubiTickerPrice, Symbol } from "./interface/Houbi.interface";
import { HoubiBookTickerDTO, HoubiTickerPriceDTO } from './dto/Houbi.dto'


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
export class HoubiService { 
    private PUBLIC_API_BASE = null;
    private PRIVATE_API_BASE = null;
    
    constructor(
      private httpService: HttpService,  
    ){
        this.PUBLIC_API_BASE = process.env.HUOBI_PUBLIC_API_BASE;
        this.PRIVATE_API_BASE = process.env.HOUBI_PRIVATE_API_BASE;
    }
    
     async getPrice(): Promise<HoubiTickerPrice> {
        const res = await this.httpService.get(`${this.PUBLIC_API_BASE}/market/tickers`).toPromise();
        // console.log('getPrice>>>>>>>', res)
        return res.data;
      }
    
      async getPairTicker(pair1: string, pair2: string): Promise<any> {
        const path = `/market/detail/merged?symbol=${pair1.toLowerCase()}${pair2.toLowerCase()}`;
        const url = `${this.PUBLIC_API_BASE}${path}`;

        const res = await this.httpService.get(url).toPromise();
        return res.data;
      }

      /* async savePairTicker(createBookTicker: HoubiBookTickerDTO): Promise<HoubiBookTicker>{
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