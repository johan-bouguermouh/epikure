import { DataSource } from 'typeorm';
import { Command } from './command.entity';

export const commandProviders = [
  {
    provide: 'COMMAND_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Command),
    inject: ['DATABASE_CONNECTION'],
  },
];
