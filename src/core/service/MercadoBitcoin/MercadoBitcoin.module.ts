import { Module, HttpModule } from '@nestjs/common';
import { MercadoBitcoinService } from './MercadoBitcoin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MercadoBitcoinSchema } from './schema/MercadoBitcoin.schema';
import { MercadoBitcoinController } from './MercadoBitcoin.controller';


@Module({
  imports: [
      HttpModule,
      MongooseModule.forFeature([
        { name: 'MercadoBitcoin', schema: MercadoBitcoinSchema}
      ])
    ],
  controllers: [MercadoBitcoinController],
  providers: [MercadoBitcoinService],
  exports: [MercadoBitcoinService],
})
export class MercadoBitcoinModule {}
