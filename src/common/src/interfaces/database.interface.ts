import { DataSource } from 'typeorm';

export interface IDatabase {
  getConnection(): DataSource;
  connect(): Promise<void>;
  disconnect(): Promise<void | null>;
}
