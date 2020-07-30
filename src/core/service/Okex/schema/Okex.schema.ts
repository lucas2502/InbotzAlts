/* import * as bcrypt from 'bcrypt'; */
import { Schema } from 'mongoose'



export const OkexBookPriceSchema = new Schema({
    ask: String,
    base_volume_24h: String,
    best_ask: String,
    best_ask_size: String,
    best_bid: String,
    best_bid_size: String,
    bid: String,
    high_24h: String,
    instrument_id: String,
    last: String,
    last_qty: String,
    low_24h: String,
    open_24h: String,
    product_id: String,
    quote_volume_24h: String,
    timestamp: String,
})
