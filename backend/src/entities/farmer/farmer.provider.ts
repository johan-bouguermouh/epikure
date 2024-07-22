import { DataSource } from 'typeorm';
import { Farmer } from './farmer.entity';

export const farmerProviders = [
  {
    provide: 'FARMER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Farmer),
    inject: ['DATABASE_CONNECTION'],
  },
];
