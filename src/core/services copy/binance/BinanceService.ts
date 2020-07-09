import { HttpService, Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';

function _getBinanceCallSigned(data = null) {
  const API_KEY = process.env.BINANCE_API_KEY;
  const API_SECRET = process.env.BINANCE_API_SECRET;

  const timestamp = new Date().getTime();

  if (!data) {
    data = {};
  }

  data.timestamp = timestamp;

  const makeQueryString = q =>
    q
      ? `?${Object.keys(q)
          .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(q[k])}`)
          .join('&')}`
      : '';

  const signature = createHmac('sha256', API_SECRET)
    .update(makeQueryString(data).substr(1))
    .digest('hex');

  data.signature = signature;

  const headers = {
    'X-MBX-APIKEY': API_KEY,
  };

  return {
    headers,
    data: makeQueryString(data),
  };
}
@Injectable()
export class BinanceService {
  private PUBLIC_API_BASE = null;
  private PRIVATE_API_BASE = null;

  constructor(private readonly httpService: HttpService) {
    this.PUBLIC_API_BASE = process.env.BINANCE_PUBLIC_API_BASE;
    this.PRIVATE_API_BASE = process.env.BINANCE_PRIVATE_API_BASE;
  }

  getPrice() {
    return this.httpService
      .get(`${this.PUBLIC_API_BASE}/v3/ticker/price`)
      .toPromise();
  }

  getPairTicker(pair1: string, pair2: string) {
    return this.httpService
      .get(
        `${this.PUBLIC_API_BASE}/v3/ticker/bookTicker?symbol=${pair1}${pair2}`
      )
      .toPromise();
  }

  getBalances() {
    const signed = _getBinanceCallSigned();
    const url = `${this.PRIVATE_API_BASE}/v3/account${signed.data}`;
    return this.httpService.get(url, { headers: signed.headers }).toPromise();
    // const res = await this.httpService.get(url, { headers: signed.headers }).toPromise()
    // const balances = res.data.balances
    // const obj = {}
    // balances.map(item => {
    //     if (Number(item.free) > 0) {
    //         obj[item.asset] = Number(item.free)
    //     }
    // })
    // return { binance: obj }
  }

  doTrade({ action, p1, p2, amount, test = true }) {
    const data = {
      recvWindow: 5000,
      symbol: `${p1}${p2}`,
      side: action.toUpperCase(),
      type: 'MARKET',
      quantity: Number(amount),
    };

    const signed = _getBinanceCallSigned(data);
    const url = `${this.PRIVATE_API_BASE}/v3/order${test ? '/test' : ''}${
      signed.data
    }`;
    return this.httpService
      .post(url, null, { headers: signed.headers })
      .toPromise();
  }
}
