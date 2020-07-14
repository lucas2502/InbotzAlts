import { Document } from 'mongoose';

export enum Symbol {
    ADABTC = 'ADABTC',
    ETHBTC =  'ETHBTC',
}

export interface OkexBookTicker extends Document {
    readonly askPrice: number;
    readonly askQty: number;
    readonly bidPrice: number;
    readonly bidQty: number;
    // eslint-disable-next-line @typescript-eslint/ban-types
    readonly symbol: Symbol;
}

export interface OkexTickerPrice extends Document {
    readonly price: number;
    // eslint-disable-next-line @typescript-eslint/ban-types
    readonly symbol: Symbol;
}

