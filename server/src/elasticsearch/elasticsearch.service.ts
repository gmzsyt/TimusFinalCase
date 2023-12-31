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

  async updateUser(username: string, updates: Record<string, any>): Promise<any> {
    try {
      const result = await this.elasticsearchService.updateByQuery({
        index: 'users',
        body: {
          query: {
            match: { username },
          },
          script: {
            source: Object.keys(updates)
              .map((key) => `ctx._source.${key} = params.${key}`)
              .join(';'),
            params: updates,
          },
        },
      });

      return result;
    } catch (error) {
      console.error('Error during updateUser:', error);
      if (error.meta && error.meta.body) {
        console.error('Elasticsearch Error:', error.meta.body.error);
      }
      throw error; 
    }
  }

  async deleteUser(username: string): Promise<any> {
    try {
      const result = await this.elasticsearchService.deleteByQuery({
        index: 'users',
        body: {
          query: {
            match: { username },
          },
        },
      });

      return result;
    } catch (error) {
      console.error('Error during deleteUser:', error);
      if (error.meta && error.meta.body) {
        console.error('Elasticsearch Error:', error.meta.body.error);
      }
      throw error; 
    }
  }
   async createIndexIfNotExists(): Promise<void> {
  try {
    const indexExists = await this.elasticsearchService.indices.exists({
      index: 'users',
    });

    if (!indexExists) {
      await this.elasticsearchService.indices.create({
        index: 'users',
        body: {
          // İndeks ayarları ve mapping bilgilerini buraya ekleyin
        },
      });
    }
  } catch (error) {
    console.error('Error creating index:', error);
    throw error;
  }
}

}
