import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSourceOptions, SimpleConsoleLogger } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const TypeOrmOptions = (
  path: string,
  customOptions?: Partial<DataSourceOptions & SeederOptions>,
): DataSourceOptions => {
  dotenv.config({ path });
  const logging = process.env.DATABASE_LOGGING === 'true' || false;

  const options: DataSourceOptions = {
    type: 'mysql',
    host: customOptions?.migrations
      ? process.env.DATABASE_HOST_MG ?? ''
      : process.env.DATABASE_HOST ?? '',
    port: Number(process.env.MYSQL_PORT),
    logging: process.env.DATABASE_LOGGING === 'true' || false,
    logger: logging ? undefined : new SimpleConsoleLogger(logging as any),
    database: process.env.MYSQL_DATABASE ?? '',
    username: process.env.MYSQL_USER ?? '',
    password: process.env.MYSQL_PASSWORD ?? '',
    entities: ['.build/**/*.entity.js'],
    ssl: process.env.DATABASE_SSL === 'true' ? { ca: process.env.DATABASE_SSL_CERT } : false,
    ...customOptions,
  } as DataSourceOptions & Partial<SeederOptions>;

  return options;
};
