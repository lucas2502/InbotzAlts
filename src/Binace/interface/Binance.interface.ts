import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export enum Symbol {
    ADABTC = 'ADABTC',
    ETHBTC =  'ETHBTC',
}

export interface BinanceBookTicker extends Document {
    readonly askPrice: number;
    readonly askQty: number;
    readonly bidPrice: number;
    readonly bidQty: number;
    readonly symbol: Symbol;
    //readonly typeUser: object;
    //readonly dateAt: Date;
    //readonly dateUpdate: Date;
}

export interface BinanceTickerPrice extends Document {
    readonly price: number;
    readonly symbol: Symbol;
    //readonly typeUser: object;
    //readonly dateAt: Date;
    //readonly dateUpdate: Date;
}

