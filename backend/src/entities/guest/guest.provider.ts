import { DataSource } from 'typeorm';
import { Guest } from './guest.entity';

export const guestProviders = [
  {
    provide: 'GUEST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Guest),
    inject: ['DATABASE_CONNECTION'],
  },
];
