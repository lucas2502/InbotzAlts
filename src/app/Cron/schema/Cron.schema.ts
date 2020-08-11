/* import * as bcrypt from 'bcrypt'; */

import * as mongoose from 'mongoose';

export const PairTicker = new mongoose.Schema({
    symbol: String,
    bid: String,
    ask: String,
    exchange: String,
    date: { type: Date, default: Date.now },
})

export const CostOperationAsk = new mongoose.Schema({
    costOperation: String,
    bid: String,
    ask: String,
    exchangeBid: String,
    exchangeAsk: String,
    date: { type: Date, default: Date.now },
})
export const CostOperationBid = new mongoose.Schema({
    costOperation: String,
    bid: String,
    ask: String,
    exchangeBid: String,
    exchangeAsk: String,
    date: { type: Date, default: Date.now },
})