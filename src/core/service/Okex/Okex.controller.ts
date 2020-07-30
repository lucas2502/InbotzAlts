/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Get, Delete, Put, Res, NotFoundException, Param, Body, UseGuards} from '@nestjs/common';
// import { OkexDTO } from './dto/Okex.dto';
import { OkexService } from './Okex.service';
import {  BookTicker, TickerPrice } from './interface/Okex.interface';
@Controller('okex')
export class OkexController {

    constructor(
        private okexService: OkexService,
    ){}

    @Get('/price')
    async getPrice(@Res() res): Promise<TickerPrice[]>{
        const data = await this.okexService.getPrice()

        if(!data){
            throw new NotFoundException('Does not existem itens')
        }

        return res.status(200).json({
            data
        })
    }

    @Get('/pairTicker')
    async getPairTicker(@Res() res): Promise<BookTicker[]>{
        const data = await this.okexService.getPairTicker('ADA', 'BTC')

        if(!data){
            throw new NotFoundException('Does not existem itens')
        }

        return res.status(200).json({
            data
        })
    }
}