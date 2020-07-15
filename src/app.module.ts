import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { BinanceModule } from './core/service/Binace/Binance.module';
import { OkexModule } from './core/service/Okex/Okex.module';
import { HoubiModule } from './core/service/Huobi/Houbi.module';
import { MercadoBitcoinModule } from './core/service/MercadoBitcoin/MercadoBitcoin.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { CronModule } from './app/Cron/Cron.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      config.mongoURI, 
      { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
      }
    ),
    BinanceModule,
    OkexModule,
    CronModule,
    HoubiModule,
    MercadoBitcoinModule,  
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
