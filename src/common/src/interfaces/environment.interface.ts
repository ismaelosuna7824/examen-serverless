import { EnvEnum } from '@commons/enums/env.enum';

export interface IDatabaseConfiguration {
  type: string;
  host: string;
  port: number;
  logging: boolean;
  name: string;
  username: string;
  password: string;
  ssl: boolean;
}

export interface IAppConfiguration {
  nodeEnv: EnvEnum;
}

export interface IJwtConfiguration {
  secret: string,
  expiresIn: string
}

export interface IEmailMailer {
  userEmail: string,
  password: string
}

export interface IEnvironment {
  database?: IDatabaseConfiguration;
  app?: IAppConfiguration;
  jwt?: IJwtConfiguration;
  emailMailer?: IEmailMailer
}
