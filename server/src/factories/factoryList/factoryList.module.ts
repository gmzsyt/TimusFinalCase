import { Module } from '@nestjs/common';
import { FactoryListController } from './factoryList.controller';
import { FactoryListService } from './factoryList.service';
import { DbModule } from 'src/postgres/postgres.module';

@Module({
  imports: [DbModule],
  controllers: [FactoryListController],
  providers: [FactoryListService],
})
export class FactoryListModule {}
