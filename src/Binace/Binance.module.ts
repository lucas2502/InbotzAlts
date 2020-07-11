import { Module, HttpModule } from '@nestjs/common';
import { BinanceService } from './Binance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BinanceSchema } from './schema/Binance.schema';


@Module({
  imports: [
      HttpModule,
      MongooseModule.forFeature([
        { name: 'Binance', schema: BinanceSchema}
      ])
    ],
  providers: [BinanceService],
  exports: [BinanceService],
})
export class BinanceModule {}
