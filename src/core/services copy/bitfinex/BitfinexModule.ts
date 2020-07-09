import { Module, HttpModule } from '@nestjs/common';
import { BitfinexService } from './BitfinexService';

@Module({
  imports: [HttpModule],
  providers: [BitfinexService],
  exports: [BitfinexService],
})
export class BitfinexModule {}
