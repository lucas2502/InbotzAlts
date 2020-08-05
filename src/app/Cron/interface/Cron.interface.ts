import { Document } from 'mongoose';

export enum Symbol {
    ADABTC = 'ADABTC',
    ETHBTC =  'ETHBTC',
}

export interface PairTicker extends Document {
    readonly bid: string;
    readonly ask: string;
    readonly exchange:  string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    readonly symbol: Symbol;
}

/* export interface TickerPrice extends Document {
    readonly price: number;
    // eslint-disable-next-line @typescript-eslint/ban-types
    readonly symbol: Symbol;
}

 */