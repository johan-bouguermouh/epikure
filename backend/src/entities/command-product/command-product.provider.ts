import { DataSource } from 'typeorm';
import { CommandProduct } from './command-product.entity';

export const commandProductProviders = [
  {
    provide: 'COMMAND_PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CommandProduct),
    inject: ['DATABASE_CONNECTION'],
  },
];
