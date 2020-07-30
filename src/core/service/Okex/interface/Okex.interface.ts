import { Document } from 'mongoose';

export enum Symbol {
    ADABTC = 'ADABTC',
    ETHBTC =  'ETHBTC',
}

export interface BookTicker extends Document {
    readonly ask: string;
    readonly base_volume_24h: string;
    readonly best_ask: string;
    readonly best_ask_size: string;
    readonly best_bid: string;
    readonly best_bid_size: string;
    readonly bid: string;
    readonly high_24h: string;
    readonly instrument_id: string;
    readonly last: string;
    readonly last_qty: string;
    readonly low_24h: string;
    readonly open_24h: string;
    readonly product_id: string;
    readonly quote_volume_24h: string;
    readonly timestamp: string;
}

export interface TickerPrice extends Document {
    readonly price: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    readonly symbol: Symbol;
}

