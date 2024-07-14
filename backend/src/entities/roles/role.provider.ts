import { DataSource } from 'typeorm';
import { Role } from './role.entity';

export const roleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: ['DATABASE_CONNECTION'],
  },
];
