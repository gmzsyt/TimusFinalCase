import { Module } from '@nestjs/common';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './postgres/postgres.module';

@Module({
  imports: [ElasticsearchModule, AuthModule,DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}