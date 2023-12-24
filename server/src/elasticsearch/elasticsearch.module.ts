import { Module } from '@nestjs/common';
import { ElasticsearchModule as NestElasticsearchModule, ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticsearchService } from './elasticsearch.service'; 
require("dotenv").config()
@Module({
  imports: [
    NestElasticsearchModule.register({
      node: 'https://final-case-358f41.es.us-central1.gcp.cloud.es.io',
      auth: {
        username: 'elastic',
        password: 'U2HE9nkXVO9Jx28ekdwt4y4u', 
      },
    }),
  ],
  exports: [NestElasticsearchModule, ElasticsearchService], 
  providers: [ElasticsearchService], 
})
export class ElasticsearchModule {}
