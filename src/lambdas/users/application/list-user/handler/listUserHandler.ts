import 'reflect-metadata';
import { DatabaseConnection } from "@commons/config/database";
import { LOGGER_HELPER } from "@commons/config/injection-tokens.config";
import { LambdaHandlerException } from "@commons/exceptions/lambda-handler.exception";
import { LoggerHelper } from "@commons/helpers/logger.helper";
import { LIST_USER_SERVICE } from "@lambdas/users/infrastructure/container/injection-tokens.config";
import { container } from '@lambdas/users/infrastructure/container/container';
import { HandleEventCommand } from '@commons/helpers/handle-event.helper';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ListUserService } from '../services/listUser.service';



export const listUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const logger: LoggerHelper = container.resolve<LoggerHelper>(LOGGER_HELPER);
    const connection: DatabaseConnection = container.resolve<DatabaseConnection>(DatabaseConnection);
    try {
        await connection.connect();
      } catch (error) {
        logger.error('Invoked to connect Database', error as Error);
        return LambdaHandlerException(error);
      }
    try {
        const service = container.resolve<ListUserService>(LIST_USER_SERVICE);
        const response = await service.process();
        return response;
    } catch (error) {
        console.log(error);
         logger.error('Invoked list user error', error);
        return LambdaHandlerException(error);
    }finally{
        await connection.disconnect();
    }
}