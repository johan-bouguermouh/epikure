import { DataSource } from 'typeorm';
import { Place } from './place.entity';

export const placeProvider = [
  {
    provide: 'PLACE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Place),
    inject: ['DATABASE_CONNECTION'],
  },
];
