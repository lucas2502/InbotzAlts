import { HttpService, Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';

function _sign(apiPath, body = null) {
  const API_KEY = process.env.BITFINEX_API_KEY;
  const API_SECRET = process.env.BITFINEX_API_SECRET;

  const nonce = (Date.now() * 1000).toString();

  if (!body) {
    body = {};
  }

  const signature = `/api/${apiPath}${nonce}${JSON.stringify(body)}`;

  const signed = createHmac('sha384', API_SECRET)
    .update(signature)
    .digest('hex');

  const headers = {
    'content-type': 'application/json',
    'bfx-nonce': nonce,
    'bfx-apikey': API_KEY,
    'bfx-signature': signed,
  };

  return {
    headers,
    data: body,
  };
}
@Injectable()
export class BitfinexService {
  private PUBLIC_API_BASE = null;
  private PRIVATE_API_BASE = null;

  constructor(private readonly httpService: HttpService) {
    this.PUBLIC_API_BASE = process.env.BITFINEX_PUBLIC_API_BASE;
    this.PRIVATE_API_BASE = process.env.BITFINEX_PRIVATE_API_BASE;
  }

  getPrice() {
    return this.httpService
      .get(`${this.PUBLIC_API_BASE}/v2/tickers?symbols=ALL`)
      .toPromise();
  }

  getCoinPrice(p1, p2) {
    return this.httpService
      .get(`${this.PUBLIC_API_BASE}/v2/ticker/t${p1}${p2}`)
      .toPromise();
  }

  getBalances() {
    const path = 'v2/auth/r/wallets';
    const url = `${this.PRIVATE_API_BASE}/${path}`;
    const body = {};
    const signed = _sign(path, body);
    const config = { headers: signed.headers };
    return this.httpService.post(url, signed.data, config).toPromise();
  }
}
