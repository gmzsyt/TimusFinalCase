import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ElasticsearchModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
