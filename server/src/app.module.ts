import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';
import { AuthModule } from './auth/auth.module'
import { DbModule } from './postgres/postgres.module';
import { FactoryDetailModule } from './factories/factoryDetail/factoryDetail.module';
import { FactoryListModule } from './factories/factoryList/factoryList.module';


@Module({
  imports: [ElasticsearchModule, AuthModule, DbModule, FactoryListModule, FactoryDetailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}