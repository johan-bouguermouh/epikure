import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { databaseConfig } from './data-source';
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<DataSource> => {
      const dataSource = new DataSource(
        databaseConfig as DataSourceOptions & SeederOptions,
      );

      return await dataSource.initialize();
    },
  },
];
