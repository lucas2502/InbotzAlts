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

export interface CostOperationAsk extends Document {
    readonly bid: string;
    readonly ask: string;
    readonly trade: number;
    readonly exchangeBid: string;
    readonly exchangeAsk: string;
    readonly costOperation:  string;
}

export interface CostOperationBid extends Document {
    readonly bid: string;
    readonly ask: string;
    readonly trade: number;
    readonly exchangeBid: string;
    readonly exchangeAsk: string;
    readonly costOperation:  string;
}