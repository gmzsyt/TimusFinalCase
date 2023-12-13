import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchService {
  constructor(private readonly elasticsearchService: NestElasticsearchService) {}

  async searchUser(username: string): Promise<any> {
    try {
      const result = await this.elasticsearchService.search({
        index: 'users',
        body: {
          query: {
            match: { username },
          },
        },
      });
  
      return result;
    } catch (error) {
      console.error('Error during searchUser:', error);
      if (error.meta && error.meta.body) {
        console.error('Elasticsearch Error:', error.meta.body.error);
      }
      throw error; 
    }
  }
  async searchAllUsers(): Promise<any> {
    try {
      const result = await this.elasticsearchService.search({
        index: 'users',
        body: {
          query: {
            match_all: {},
          },
        },
      });
      return result;
    } catch (error) {
      console.error('Error during searchAllUsers:', error);
      throw error;
    }
  }

  async addUser(username: string, password: string, email: string, role: string): Promise<any> {
    try {
      const result = await this.elasticsearchService.index({
        index: 'users',
        body: { username, password, email, role },
      });

      return result;
    } catch (error) {
      console.error('Error during addUser:', error);
      throw error; 
    }
  }


}
