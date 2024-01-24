import { LOGGER_HELPER } from "@commons/config/injection-tokens.config";
import { ErrorHandler } from "@commons/exceptions/error-handler";
import { IApplicationService } from "@commons/interfaces/applicant-service.interface";
import { ILogger } from "@commons/interfaces/logger.interface";
import { CreatedResponse } from "@commons/responses/created.response";
import { IUserRepository } from "@lambdas/users/domain/contracts/user-repository";
import { USER_REPOSITORY } from "@lambdas/users/infrastructure/container/injection-tokens.config";
import { User } from '@lambdas/users/domain/User';
import { APIGatewayProxyResult } from "aws-lambda";
import { inject, injectable } from "tsyringe";
import { validateOrReject } from "class-validator";
import { EntityNotFoundError } from "typeorm";
import { NotFoundException } from "@commons/exceptions/not-found.exception";
import { DeleteUserCommand } from "@lambdas/users/domain/contracts/delete-user-command";


@injectable()
export class deleteUserService implements IApplicationService<DeleteUserCommand>{
    constructor(
        @inject(LOGGER_HELPER) private readonly logger: ILogger,
        @inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
    ){}

    public async process({ id }: DeleteUserCommand): Promise<APIGatewayProxyResult> {
        let user: User;
        try {
        user = await this.userRepository.getUser(id);
        } catch (error) {
        if (error instanceof EntityNotFoundError) {
            throw new NotFoundException({
            code: 'not_user_found',
            detail: 'The user was not found',
            });
        }
        throw new ErrorHandler(error);
        }
        try {
            await this.userRepository.delete(user!.id);
        } catch (error) {
            this.logger.error(error as string);
            throw new ErrorHandler(error);
        }
      return new CreatedResponse({});
    }
}