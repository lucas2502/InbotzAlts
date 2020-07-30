/* import * as bcrypt from 'bcrypt'; */

import * as mongoose from 'mongoose';

export const BinanceBookPriceSchema = new mongoose.Schema({
    askPrice: String ,
    askQty: String ,
    bidPrice: String ,
    bidQty: String,
    symbol: String ,
})

export const BinanceTickerPriceSchema = new mongoose.Schema({
    askPrice: String ,
    askQty: String ,
    bidPrice: String ,
    bidQty: String,
    symbol: String ,
})
