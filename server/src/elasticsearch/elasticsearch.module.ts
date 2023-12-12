// elasticsearch/elasticsearch.module.ts

import { Module } from '@nestjs/common';
import { ElasticsearchModule as NestElasticsearchModule, ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticsearchService } from './elasticsearch.service'; 
require("dotenv").config()
@Module({
  imports: [
    NestElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE,
      auth: {
        username: process.env.ELASTICSEARCH_USERNAME,
        password: process.env.ELASTICSEARCH_PASSWORD, 
      },
    }),
  ],
  exports: [NestElasticsearchModule, ElasticsearchService], 
  providers: [ElasticsearchService], 
})
export class ElasticsearchModule {}
