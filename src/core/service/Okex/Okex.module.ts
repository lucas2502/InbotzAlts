import { Module, HttpModule } from '@nestjs/common';
import { OkexService } from './Okex.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OkexSchema } from './schema/Okex.schema';
import { OkexController } from './Okex.controller';


@Module({
  imports: [
      HttpModule,
      MongooseModule.forFeature([
        { name: 'Okex', schema: OkexSchema}
      ])
    ],
  controllers: [OkexController],
  providers: [OkexService],
  exports: [OkexService],
})
export class OkexModule {}
