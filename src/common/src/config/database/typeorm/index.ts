import { DatabaseType, DataSource, DataSourceOptions, TypeORMError } from 'typeorm';
import {
  DATABASE_ENTITIES,
  ENVIRONMENT,
  LOGGER_HELPER,
} from '@commons/config/injection-tokens.config';
import { IDatabase } from '@commons/interfaces/database.interface';
import { IEnvironment } from '@commons/interfaces/environment.interface';
import { EntityList } from '@commons/types/entity.type';
import { inject, injectable } from 'tsyringe';
import { ErrorEnum } from '@commons/enums/error.enum';
import { LoggerHelper } from '@commons/helpers/logger.helper';
import { CustomDatabaseLogger } from './custom-database-logger';

@injectable()
export class DatabaseConnection implements IDatabase {
  protected _connection: DataSource;

  constructor(
    @inject(ENVIRONMENT) { database: config }: Required<Pick<IEnvironment, 'database'>>,
    @inject(LOGGER_HELPER) private readonly logger: LoggerHelper,
    @inject(DATABASE_ENTITIES) entities: EntityList = [],
  ) {
    const {
      type: dbManager,
      port,
      logging,
      host,
      name: database,
      password,
      ssl,
      username,
    } = config;

    let type: DatabaseType;

    switch (dbManager) {
      default:
        type = 'mysql';
        break;
    }

    const options: DataSourceOptions = {
      type,
      port,
      synchronize: false,
      logging,
      host,
      username,
      database,
      password,
      ssl,
      entities,
      extra: {
        max: 1,
      },
      logger: new CustomDatabaseLogger(this.logger),
    };
    console.log(username);
    this._connection = new DataSource(options);
  }

  getConnection(): DataSource {
    if (this._connection.isInitialized) {
      return this._connection;
    }

    throw new TypeORMError(ErrorEnum.CANNOT_CONNECT);
  }

  public async connect(): Promise<void> {
    if (!this._connection.isInitialized) {
      //console.log(this._connection);
      await this._connection.initialize();
    }
  }

  public async disconnect(): Promise<void | null> {
    if (!this.getConnection()) {
      return null;
    }
    return this._connection.destroy();
  }
}
