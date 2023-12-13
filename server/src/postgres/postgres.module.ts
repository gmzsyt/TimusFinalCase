import { Module } from '@nestjs/common';
import { dbProvider } from './postgres.provider';

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
