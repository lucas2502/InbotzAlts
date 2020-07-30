import { Module, HttpModule } from '@nestjs/common';
import { BinanceService } from './Binance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BinanceBookPriceSchema, BinanceTickerPriceSchema } from './schema/Binance.schema';
import { BinanceController } from './Binance.controller';


@Module({
  imports: [
      HttpModule,
      MongooseModule.forFeature([
        { name: 'BinanceBookPrice', schema: BinanceBookPriceSchema},
        { name: 'BinanceTickerPrice', schema: BinanceTickerPriceSchema}
      ])
  ],
  controllers: [BinanceController],
  providers: [BinanceService],
  exports: [BinanceService],
})
export class BinanceModule {}
