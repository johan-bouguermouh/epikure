import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { databaseProviders } from './database.provider';
import { databaseConfig } from './data-source';
import { runSeeders } from 'typeorm-extension';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig)],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      await runSeeders(this.dataSource);
    }
  }
}
