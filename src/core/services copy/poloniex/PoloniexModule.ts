import { Module, HttpModule } from '@nestjs/common';
import { PoloniexService } from './PoloniexService';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [PoloniexService],
  exports: [PoloniexService],
})
export class PoloniexModule {}
