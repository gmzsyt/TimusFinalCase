import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [ElasticsearchModule], 
  controllers: [AuthController],
  providers: [AuthService,JwtService],
})
export class AuthModule {}
