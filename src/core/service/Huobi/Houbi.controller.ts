/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Get, Delete, Put, Res, NotFoundException, Param, Body, UseGuards} from '@nestjs/common';
// import { HoubiDTO } from './dto/Houbi.dto';
import { HoubiService } from './Houbi.service';
import { HoubiBookTicker, HoubiTickerPrice } from './interface/Houbi.interface';
@Controller('houbi')
export class HoubiController {

    constructor(
        private houbiService: HoubiService,
    ){}

    @Get('/price')
    async getPrice(@Res() res): Promise<HoubiTickerPrice[]>{
        const data = await this.houbiService.getPrice()

        if(!data){
            throw new NotFoundException('Does not existem itens')
        }

        return res.status(200).json({
            data
        })
    }

    @Get('/pairTicker')
    async getPairTicker(@Res() res): Promise<HoubiTickerPrice[]>{
        const data = await this.houbiService.getPairTicker('ADA', 'BTC')

        if(!data){
            throw new NotFoundException('Does not existem itens')
        }

        return res.status(200).json({
            data
        })
    }
}