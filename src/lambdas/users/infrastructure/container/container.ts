import { container, Lifecycle } from 'tsyringe';
import {
    DATABASE_ENTITIES,
    EMAIL,
    ENVIRONMENT,
    LOGGER_HELPER,
  } from '@commons/config/injection-tokens.config';
import { EnvConfig } from '../env/env.config';
import { DatabaseEntities } from '../database/database-entities';
import { DatabaseConnection } from '@commons/config/database/';
import { LoggerHelper } from '@commons/helpers/logger.helper';
import { USER_REPOSITORY, CREATE_USER_SERVICE, UPDATE_USER_SERVICE, LIST_USER_SERVICE, DELETE_USER_SERVICE } from './injection-tokens.config';
import { UserRepository } from '../repositories/typeOrm-user.repository';
import { UserService } from '@lambdas/users/application/create-user/services/createUser.service';
import { updateUserService } from '@lambdas/users/application/update-user/services/updateUser.service';
import { ListUserService } from '@lambdas/users/application/list-user/services/listUser.service';
import { deleteUserService } from '@lambdas/users/application/delete-user/services/deleteUser.service';
import { EmailService } from '@commons/services/email.service';

container.register(ENVIRONMENT, {
    useValue: EnvConfig,
});

container.register(DATABASE_ENTITIES, { useValue: DatabaseEntities });

container.register(
    DatabaseConnection,
    { useClass: DatabaseConnection },
    { lifecycle: Lifecycle.Singleton },
);

container.register(USER_REPOSITORY, { useClass: UserRepository });
//
container.register(CREATE_USER_SERVICE, { useClass: UserService });
container.register(UPDATE_USER_SERVICE, { useClass: updateUserService });
container.register(LIST_USER_SERVICE, { useClass: ListUserService });
container.register(DELETE_USER_SERVICE, { useClass: deleteUserService });

container.register(EMAIL, {useClass: EmailService})

container.register(
    LOGGER_HELPER,
    {
      useClass: LoggerHelper,
    },
    { lifecycle: Lifecycle.Singleton },
);

export { container };