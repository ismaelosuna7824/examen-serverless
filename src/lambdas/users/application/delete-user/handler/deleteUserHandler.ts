import 'reflect-metadata';
import { DatabaseConnection } from "@commons/config/database";
import { LOGGER_HELPER } from "@commons/config/injection-tokens.config";
import { LambdaHandlerException } from "@commons/exceptions/lambda-handler.exception";
import { LoggerHelper } from "@commons/helpers/logger.helper";
import { DELETE_USER_SERVICE } from "@lambdas/users/infrastructure/container/injection-tokens.config";
import { container } from '@lambdas/users/infrastructure/container/container';
import { HandleEventCommand } from '@commons/helpers/handle-event.helper';
import { UserBody } from '@lambdas/users/domain/user-body';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { deleteUserService } from '../services/deleteUser.service';
import { DeleteUserCommand } from '@lambdas/users/domain/contracts/delete-user-command';



export const deleteUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const logger: LoggerHelper = container.resolve<LoggerHelper>(LOGGER_HELPER);
    const connection: DatabaseConnection = container.resolve<DatabaseConnection>(DatabaseConnection);
    try {
        await connection.connect();
      } catch (error) {
        logger.error('Invoked to connect Database', error as Error);
        return LambdaHandlerException(error);
      }
    try {

        const { params } = new HandleEventCommand(event);
        const service = container.resolve<deleteUserService>(DELETE_USER_SERVICE);
        const command = new DeleteUserCommand(params as unknown as DeleteUserCommand);
        const response = await service.process({id: command.id});
        return response;
    } catch (error) {
         logger.error('Invoked delete user error', error);
        return LambdaHandlerException(error);
    }finally{
        await connection.disconnect();
    }
}