/**
 * These eslint rules are disabled because the TypeORM interface ignores these rules
 */
import { LOGGER_HELPER } from '@commons/config/injection-tokens.config';
import { LoggerHelper } from '@commons/helpers/logger.helper';
import { inject, injectable } from 'tsyringe';
import { Logger, QueryRunner } from 'typeorm';

/* eslint max-params: ["error", 4] */
/* eslint @typescript-eslint/explicit-module-boundary-types: off */

@injectable()
export class CustomDatabaseLogger implements Logger {
  constructor(@inject(LOGGER_HELPER) private readonly logger: LoggerHelper) {}

  private getError(error: string | Error): string {
    let err: string = '';

    if (error instanceof Error) {
      err = `${error.name} ${error.message}`;
    }

    if (typeof error === 'string') {
      err = error;
    }

    return err;
  }

  private getParameters(parameters: any[] = []): string | null {
    return JSON.stringify(parameters);
  }

  private logQueryRunner(queryRunner?: QueryRunner): void {
    this.logger.info(`Using queryRunner: ${queryRunner ? 'true' : 'false'}`);

    if (!queryRunner) {
      return;
    }

    const { data = null } = queryRunner;

    if (!data) {
      return;
    }

    this.logger.info('QueryRunner data', { data });
  }

  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    this.logger.info(query, { parameters: this.getParameters(parameters) });
    this.logQueryRunner(queryRunner);
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {
    this.logger.error(query);
    this.logger.error(this.getError(error), { parameters: this.getParameters(parameters) });
    this.logQueryRunner(queryRunner);
  }
  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    this.logger.info(`Time taked: ${time} with query ${query}`, {
      parameters: this.getParameters(parameters),
    });
    this.logQueryRunner(queryRunner);
  }
  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    this.logger.info(message);
    this.logQueryRunner(queryRunner);
  }
  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string, queryRunner?: QueryRunner): any {
    this.logger.info(message);
    this.logQueryRunner(queryRunner);
  }
  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any {
    switch (level) {
      case 'info':
        this.logger.info(message);
        break;
      case 'warn':
        this.logger.warning(message);
        break;
      default:
        this.logger.info(message);
        break;
    }

    this.logQueryRunner(queryRunner);
  }
}
