import { Module, HttpModule } from '@nestjs/common';
import { HoubiService } from './Houbi.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HoubiSchema } from './schema/Houbi.schema';
import { HoubiController } from './Houbi.controller';


@Module({
  imports: [
      HttpModule,
      MongooseModule.forFeature([
        { name: 'Houbi', schema: HoubiSchema}
      ])
    ],
  controllers: [HoubiController],
  providers: [HoubiService],
  exports: [HoubiService],
})
export class HoubiModule {}
