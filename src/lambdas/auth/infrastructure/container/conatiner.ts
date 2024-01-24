import { container, Lifecycle } from 'tsyringe';
import {
    ENVIRONMENT,
    LOGGER_HELPER,
  } from '@commons/config/injection-tokens.config';
import { EnvConfig } from '../env/env.config';
import { LoggerHelper } from '@commons/helpers/logger.helper';
import { AuthJwtService } from '../jwt/createTokenJwt.service';
import { AUTH_SERVICE, JWTTOKENSERVICE } from './injection-tokens.config';
import { authUserService } from '@lambdas/auth/application/auth-user/services/auth.service';

container.register(ENVIRONMENT, {
    useValue: EnvConfig,
});

//
container.register(JWTTOKENSERVICE, {useClass: AuthJwtService})
container.register(AUTH_SERVICE, {useClass: authUserService})

container.register(
    LOGGER_HELPER,
    {
      useClass: LoggerHelper,
    },
    { lifecycle: Lifecycle.Singleton },
);

export { container };