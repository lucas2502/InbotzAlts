import { Module } from '@nestjs/common';
import { CronService } from './Cron.service';
import { BinanceModule } from 'src/core/service/Binace/Binance.module';
import { OkexModule } from 'src/core/service/Okex/Okex.module'; 
import { HoubiModule } from 'src/core/service/Huobi/Houbi.module';
import { MercadoBitcoinModule } from 'src/core/service/MercadoBitcoin/MercadoBitcoin.module';

import { MongooseModule } from '@nestjs/mongoose';
import { CostOperationAsk, CostOperationBid, PairTicker } from './schema/Cron.schema';

@Module({
  imports: [
      BinanceModule, 
      OkexModule,
      HoubiModule,
      MercadoBitcoinModule,
      MongooseModule.forFeature([
        { name: 'PairTicker', schema: PairTicker},
        { name: 'CostOperationAsk', schema: CostOperationAsk},
        { name: 'CostOperationBid', schema: CostOperationBid},
      ])
    ],
  controllers: [],
  providers: [CronService],
})
export class CronModule {}
