import { MetadataType } from '@commons/types/metadata.type';

export interface ILogger {
  info(msg: string, metadata?: MetadataType): void;
  warning(msg: string, metadata?: MetadataType): void;
  error(msg: string, metadata?: MetadataType): void;
  debug(msg: string, metadata?: MetadataType): void;
}
