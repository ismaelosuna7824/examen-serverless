import 'reflect-metadata';
import { DatabaseConnection } from "@commons/config/database";
import { LOGGER_HELPER } from "@commons/config/injection-tokens.config";
import { LambdaHandlerException } from "@commons/exceptions/lambda-handler.exception";
import { LoggerHelper } from "@commons/helpers/logger.helper";
import { UPDATE_USER_SERVICE } from "@lambdas/users/infrastructure/container/injection-tokens.config";
import { container } from '@lambdas/users/infrastructure/container/container';
import { HandleEventCommand } from '@commons/helpers/handle-event.helper';
import { UserBody } from '@lambdas/users/domain/user-body';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { updateUserService } from '../services/updateUser.service';



export const updateUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const logger: LoggerHelper = container.resolve<LoggerHelper>(LOGGER_HELPER);
    const connection: DatabaseConnection = container.resolve<DatabaseConnection>(DatabaseConnection);
    try {
        await connection.connect();
      } catch (error) {
        logger.error('Invoked to connect Database', error as Error);
        return LambdaHandlerException(error);
      }
    try {

        const { body: objBody } = new HandleEventCommand(event);

        const body = new UserBody({
            ...objBody,
          } as unknown as UserBody);

        const service = container.resolve<updateUserService>(UPDATE_USER_SERVICE);
        const response = await service.process({body});
        return response;
    } catch (error) {
        console.log(error);
         logger.error('Invoked update user error', error);
        return LambdaHandlerException(error);
    }finally{
        await connection.disconnect();
    }
}