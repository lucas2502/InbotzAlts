import { Module, HttpModule } from '@nestjs/common';
import { OkexService } from './Okex.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OkexBookPriceSchema } from './schema/Okex.schema';
import { OkexController } from './Okex.controller';


@Module({
  imports: [
      HttpModule,
      MongooseModule.forFeature([
        { name: 'OkexBookPrice', schema: OkexBookPriceSchema}
      ])
    ],
  controllers: [OkexController],
  providers: [OkexService],
  exports: [OkexService],
})
export class OkexModule {}
