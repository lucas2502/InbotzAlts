import { Module, HttpModule } from '@nestjs/common';
import { BinanceService } from './BinanceService';

@Module({
  imports: [HttpModule],
  providers: [BinanceService],
  exports: [BinanceService],
})
export class BinanceModule {}
