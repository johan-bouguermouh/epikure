import { DataSource } from 'typeorm';
import { CategoryProduct } from './category-product.entity';

export const categoryProductProviders = [
  {
    provide: 'CATEGORY_PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CategoryProduct),
    inject: ['DATABASE_CONNECTION'],
  },
];
