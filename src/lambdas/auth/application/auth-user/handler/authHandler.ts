import 'reflect-metadata';
import { LOGGER_HELPER } from '@commons/config/injection-tokens.config';
import { HandleAuthorizerCommand } from '@commons/helpers/handle-authorizer.helper';
import { LoggerHelper } from '@commons/helpers/logger.helper';
import { APIGatewayIAMAuthorizerResult, APIGatewayRequestAuthorizerEvent } from 'aws-lambda';
import { container } from '@lambdas/auth/infrastructure/container/conatiner';
import { authUserService } from '../services/auth.service';
import { AUTH_SERVICE } from '@lambdas/auth/infrastructure/container/injection-tokens.config';


export const handler = async (
  event: APIGatewayRequestAuthorizerEvent,
): Promise<APIGatewayIAMAuthorizerResult> => {
  const logger: LoggerHelper = container.resolve<LoggerHelper>(LOGGER_HELPER);
  logger.info('Invoked authorizer lambda with event', event);
  try {

    const service = container.resolve<authUserService>(AUTH_SERVICE);

    const response = await service.process(new HandleAuthorizerCommand(event));

    return response;
  } catch (error) {
    logger.error('Error to invoke session authorizer', error as any);
    throw new Error('Unauthorized');
  }
};