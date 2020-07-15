/* import * as bcrypt from 'bcrypt'; */
import { Schema } from 'mongoose'



export const MercadoBitcoinSchema = new Schema({
    bookTicker: {
        type: [{
            askPrice: Number,
            askQty: Number,
            bidPrice: Number,
            bidQty: Number,
            symbol: String,
        }]
    },
    tickerPrice: {
        type: [{
            price: Number,
            symbol: String,
        }],
        /* required: true */
    },
    dateAt: {
        type: Date,
        default: Date.now
    },
    dateUpdate: {
        type: Date
    }
})
