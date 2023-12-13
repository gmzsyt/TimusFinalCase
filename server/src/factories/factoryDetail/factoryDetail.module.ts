import { Module } from '@nestjs/common';
import { FactoryDetailController } from './factoryDetail.controller';
import { FactoryDetailService } from './factoryDetail.service';
import { DbModule } from 'src/postgres/postgres.module';

@Module({
  imports: [DbModule],
  controllers: [FactoryDetailController],
  providers: [FactoryDetailService],
})

export class FactoryDetailModule {}