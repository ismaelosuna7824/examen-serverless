import { LOGGER_HELPER } from "@commons/config/injection-tokens.config";
import { ErrorHandler } from "@commons/exceptions/error-handler";
import { IApplicationService } from "@commons/interfaces/applicant-service.interface";
import { ILogger } from "@commons/interfaces/logger.interface";
import { IUserRepository } from "@lambdas/users/domain/contracts/user-repository";
import { USER_REPOSITORY } from "@lambdas/users/infrastructure/container/injection-tokens.config";
import { User } from '@lambdas/users/domain/User';
import { APIGatewayProxyResult } from "aws-lambda";
import { inject, injectable } from "tsyringe";
import { OkResponse } from "@commons/responses/ok.response";
import { GetUsersMap } from "../../Mappers/listUser.mapper";


@injectable()
export class ListUserService implements IApplicationService{
    constructor(
        @inject(LOGGER_HELPER) private readonly logger: ILogger,
        @inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
    ){}
    public async process(): Promise<APIGatewayProxyResult> {
        let listUser: User[];
        try {
          listUser = await this.userRepository.list();
          const response = listUser.map((user) => GetUsersMap(user));
          return new OkResponse(response);
        } catch (error) {
            this.logger.error(error as string);
            throw new ErrorHandler(error);
        }
 
    }
}