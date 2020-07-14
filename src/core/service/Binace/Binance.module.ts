import { Module, HttpModule } from '@nestjs/common';
import { BinanceService } from './Binance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BinanceSchema } from './schema/Binance.schema';
import { BinanceController } from './Binance.controller';


@Module({
  imports: [
      HttpModule,
      MongooseModule.forFeature([
        { name: 'Binance', schema: BinanceSchema}
      ])
    ],
  controllers: [BinanceController],
  providers: [BinanceService],
  exports: [BinanceService],
})
export class BinanceModule {}
