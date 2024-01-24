import { ILogger } from '@commons/interfaces/logger.interface';
import { MetadataType } from '@commons/types/metadata.type';
import { info, warn, error, debug } from 'lambda-log';
import { injectable } from 'tsyringe';

@injectable()
export class LoggerHelper implements ILogger {
  info(msg: string, metadata?: MetadataType): void {
    info(msg, metadata);
  }

  warning(msg: string, metadata?: MetadataType): void {
    warn(msg, metadata);
  }

  error(msg: string, metadata?: MetadataType): void {
    error(msg, metadata);
  }

  debug(msg: string, metadata?: MetadataType): void {
    debug(msg, metadata);
  }
}
