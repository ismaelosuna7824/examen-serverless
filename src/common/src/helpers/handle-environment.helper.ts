import {
  IDatabaseConfiguration, IEmailMailer, IJwtConfiguration,
} from '@commons/interfaces/environment.interface';
// import * as dotenv from 'dotenv';
// dotenv.config()

export class HandleEnvironment {
  get database(): IDatabaseConfiguration {
    return {
      type: process.env.DATABASE_TYPE || 'mysql',
      host: process.env.DATABASE_HOST || '',
      port: Number(process.env.MYSQL_PORT) || 0,
      logging: Boolean(process.env.DATABASE_LOGGING) || false,
      name: process.env.MYSQL_DATABASE || '',
      username: process.env.MYSQL_USER || '',
      password: process.env.MYSQL_PASSWORD || '',
      ssl: process.env.DATABASE_SSL === 'true' || false,
    };
  }

  get jwt(): IJwtConfiguration {
    return {
      secret: process.env.SECRET_KEY || '',
      expiresIn: process.env.EXPIRESIN || ''
    }
  }

  get emailMailer(): IEmailMailer {

    return {
      userEmail: process.env.USEREMAIL || '',
      password: process.env.PASSWORD || ''
    }

  }
}
