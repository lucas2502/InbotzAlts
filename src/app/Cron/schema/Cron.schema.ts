/* import * as bcrypt from 'bcrypt'; */

import * as mongoose from 'mongoose';

export const PairTicker = new mongoose.Schema({
    symbol: String,
    bid: String,
    ask: String,
    exchange: String,
    date: { type: Date, default: Date.now },
})

