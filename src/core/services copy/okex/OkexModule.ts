import { Module, HttpModule } from '@nestjs/common';
import { OkexService } from './OkexService';

@Module({
  imports: [HttpModule],
  providers: [OkexService],
  exports: [OkexService],
})
export class OkexModule {}
