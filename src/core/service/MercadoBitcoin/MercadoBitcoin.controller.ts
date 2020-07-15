/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Get, Delete, Put, Res, NotFoundException, Param, Body, UseGuards} from '@nestjs/common';
// import { MercadoBitcoinDTO } from './dto/MercadoBitcoin.dto';
import { MercadoBitcoinService } from './MercadoBitcoin.service';
import { MercadoBitcoinBookTicker, MercadoBitcoinTickerPrice } from './interface/MercadoBitcoin.interface';
@Controller('houbi')
export class MercadoBitcoinController {

    constructor(
        private houbiService: MercadoBitcoinService,
    ){}

    @Get('/price')
    async getPrice(@Res() res): Promise<MercadoBitcoinTickerPrice[]>{
        const data = await this.houbiService.getPrice('BTC')

        if(!data){
            throw new NotFoundException('Does not existem itens')
        }

        return res.status(200).json({
            data
        })
    }

    @Get('/pairTicker')
    async getPairTicker(@Res() res): Promise<MercadoBitcoinTickerPrice[]>{
        const data = await this.houbiService.getPairTicker('LTC', 'BTC')

        if(!data){
            throw new NotFoundException('Does not existem itens')
        }

        return res.status(200).json({
            data
        })
    }
}