import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
//import { User1720963563889 } from './seeds/1720963563889-user';
//import userFactory from '../entities/user/user.factory';

config();

export const databaseConfig: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'test',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  // seeds: [__dirname + '/../seeds/*{.ts,.js}'],
  // factories: [__dirname + '/../factories/*{.ts,.js}'],
};

const dataSource = new DataSource(databaseConfig);

export default dataSource;
