import { Module } from '@nestjs/common';
import { FactoryDetailController } from './factoryDetail.controller';
import { FactoryDetailService } from './factoryDetail.service';
import { DbModule } from 'src/postgres/postgres.module';
import { JwtModule } from 'src/auth/jwt/jwt.module';

@Module({
  imports: [DbModule,JwtModule],
  controllers: [FactoryDetailController],
  providers: [FactoryDetailService],
})

export class FactoryDetailModule {}