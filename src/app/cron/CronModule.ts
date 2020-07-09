import { Module } from '@nestjs/common';
import { PoloniexModule } from 'src/core/services/poloniex/PoloniexModule';
import { CronService } from './CronService';
import { BinanceModule } from 'src/core/services/binance/BinanceModule';
import { OkexModule } from 'src/core/services/okex/OkexModule';
import { BitfinexModule } from 'src/core/services/bitfinex/BitfinexModule';

@Module({
  imports: [PoloniexModule, BinanceModule, OkexModule, BitfinexModule],
  controllers: [],
  providers: [CronService],
})
export class CronModule {}
