import { DataSource } from 'typeorm';
import { TypeOrmOptions } from './tools';

const environment = '.env';
export const DataSourceSeeds = new DataSource(
  TypeOrmOptions(environment, {
    seeds: ['.build/commons/src/database/seeds/*.js'],
    factories: ['.build/commons/src/database/factories/*.js'],
  }),
);
