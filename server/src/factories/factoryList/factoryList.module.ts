import { Module } from '@nestjs/common';
import { FactoryListController } from './factoryList.controller';
import { FactoryListService } from './factoryList.service';
import { DbModule } from 'src/postgres/postgres.module';
import { JwtModule } from 'src/auth/jwt/jwt.module';

@Module({
  imports: [DbModule,JwtModule],
  controllers: [FactoryListController],
  providers: [FactoryListService],
})
export class FactoryListModule {}
