import { Injectable, HttpService } from '@nestjs/common';
import { createHmac } from 'crypto';

function _sign(comand: string, body = null) {
  const API_KEY = process.env.POLONIEX_API_KEY;
  const API_SECRET = process.env.POLONIEX_API_SECRET;

  const nonce = (Date.now() * 1000).toString();

  if (!body) {
    body = {};
  }

  const signature = `command=${comand}&nonce=${nonce}`;

  const signed = createHmac('sha512', API_SECRET)
    .update(signature)
    .digest('hex');

  const headers = {
    Key: API_KEY,
    Sign: signed,
  };

  return {
    headers,
    data: signature,
  };
}

@Injectable()
export class PoloniexService {
  private PUBLIC_API_BASE = null;
  private PRIVATE_API_BASE = null;

  constructor(private readonly httpService: HttpService) {
    this.PUBLIC_API_BASE = process.env.POLONIEX_PUBLIC_API_BASE;
    this.PRIVATE_API_BASE = process.env.POLONIEX_PRIVATE_API_BASE;
  }

  getPrice() {
    return this.httpService
      .get(`${this.PUBLIC_API_BASE}?command=returnTicker`)
      .toPromise();
  }

  async getCoinPrice(p1: string, p2: string) {
    const res = await this.httpService
      .get(`${this.PUBLIC_API_BASE}?command=returnTicker`)
      .toPromise();
    const x = res.data;
    for (const i in x) {
      if (i === `${p1}_${p2}`) {
        return { data: x[i] };
      }
    }
    return { data: null };
  }

  getBalances() {
    const comand = 'returnCompleteBalances';
    const url = `${this.PRIVATE_API_BASE}`;
    const body = {};
    const signed = _sign(comand, body);
    const config = { headers: signed.headers };
    return this.httpService.post(url, signed.data, config).toPromise();
  }
}
