/* eslint no-console: "off" */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { TypeOrmOptions } from './tools';

const environment = '.env';
export default new DataSource(
  TypeOrmOptions(environment, {
    migrations: ['.build/src/common/src/config/database/migrations/*.js'],
    migrationsTableName: 'Migrations',
  }),
);
