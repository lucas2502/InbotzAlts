/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Get, Delete, Put, Res, NotFoundException, Param, Body, UseGuards} from '@nestjs/common';
// import { BinanceDTO } from './dto/Binance.dto';
import { BinanceService } from './Binance.service';
import {  BookTicker, TickerPrice } from './interface/Binance.interface';
@Controller('binance')
export class BinanceController {

    constructor(
        private binanceService: BinanceService,
    ){}

    @Get('/price')
    async getPrice(@Res() res): Promise<TickerPrice[]>{
        const data = await this.binanceService.getPrice()

        if(!data){
            throw new NotFoundException('Does not existem itens')
        }

        return res.status(200).json({
            data
        })
    }

    @Get('/pairTicker')
    async getPairTicker(@Res() res): Promise<BookTicker[]>{
        const data = await this.binanceService.getPairTicker('ADA', 'BTC')

        if(!data){
            throw new NotFoundException('Does not existem itens')
        }

        return res.status(200).json({
            data
        })
    }
}