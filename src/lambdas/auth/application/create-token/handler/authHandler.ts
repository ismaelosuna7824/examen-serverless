import 'reflect-metadata';
import { LOGGER_HELPER } from "@commons/config/injection-tokens.config";
import { LambdaHandlerException } from "@commons/exceptions/lambda-handler.exception";
import { LoggerHelper } from "@commons/helpers/logger.helper";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { AuthJwtService } from '@lambdas/auth/infrastructure/jwt/createTokenJwt.service';
import { JWTTOKENSERVICE } from '@lambdas/auth/infrastructure/container/injection-tokens.config';
import { OkResponse } from '@commons/responses/ok.response';
import { container } from '@lambdas/auth/infrastructure/container/conatiner';



export const createToken = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const logger: LoggerHelper = container.resolve<LoggerHelper>(LOGGER_HELPER);
    try {
        const service = container.resolve<AuthJwtService>(JWTTOKENSERVICE);
        const response = await service.signToken();
        return new OkResponse({token: response});
    } catch (error) {
        console.log(error);
         logger.error('Invoked create user error', error);
        return LambdaHandlerException(error);
    }
}