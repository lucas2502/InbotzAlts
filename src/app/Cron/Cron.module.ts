import { Module } from '@nestjs/common';
import { CronService } from './Cron.service';
import { BinanceModule } from 'src/core/service/Binace/Binance.module';
import { OkexModule } from 'src/core/service/Okex/Okex.module'; 
import { HoubiModule } from 'src/core/service/Huobi/Houbi.module';
import { MercadoBitcoinModule } from 'src/core/service/MercadoBitcoin/MercadoBitcoin.module';

@Module({
  imports: [
      BinanceModule, 
      OkexModule,
      HoubiModule,
      MercadoBitcoinModule,
    ],
  controllers: [],
  providers: [CronService],
})
export class CronModule {}
