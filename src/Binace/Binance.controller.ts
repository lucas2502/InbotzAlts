import { Controller, Post, Get, Delete, Put, Res, NotFoundException, Param, Body, UseGuards} from '@nestjs/common';
// import { BinanceDTO } from './dto/Binance.dto';
import { BinanceService } from './Binance.service';
import {  BinanceBookTicker, BinanceTickerPrice } from './interface/Binance.interface';
@Controller('binance')
export class NinanceController {

    constructor(
        private binanceService: BinanceService,
    ){}

    @Get('/price')
    async getPrice(@Res() res): Promise<BinanceTickerPrice[]>{
        const data = await this.binanceService.getPrice()

        if(!data){
            throw new NotFoundException('Does not existem itens')
        }

        return res.status(200).json({
            data
        })

    }
}