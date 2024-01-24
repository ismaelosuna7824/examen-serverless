import { LOGGER_HELPER } from "@commons/config/injection-tokens.config";
import { ErrorHandler } from "@commons/exceptions/error-handler";
import { IApplicationService } from "@commons/interfaces/applicant-service.interface";
import { ILogger } from "@commons/interfaces/logger.interface";
import { IUserRepository } from "@lambdas/users/domain/contracts/user-repository";
import { USER_REPOSITORY } from "@lambdas/users/infrastructure/container/injection-tokens.config";
import { User } from "@lambdas/users/domain/User";
import { APIGatewayProxyResult } from "aws-lambda";
import { inject, injectable } from "tsyringe";
import { validateOrReject } from "class-validator";
import { UpdateUserCommand } from "@lambdas/users/domain/contracts/update-user-command";
import { NoContentResponse } from "@commons/responses/no-content.response";
import { EntityNotFoundError } from "typeorm";
import { NotFoundException } from "@commons/exceptions/not-found.exception";

@injectable()
export class updateUserService
  implements IApplicationService<UpdateUserCommand>
{
  constructor(
    @inject(LOGGER_HELPER) private readonly logger: ILogger,
    @inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}
  public async process({
    body,
  }: UpdateUserCommand): Promise<APIGatewayProxyResult> {
    try {
      this.logger.info("Checking update user command", body);
      await validateOrReject(body);
    } catch (error) {
      this.logger.error("Error to update user command", body);
      throw new ErrorHandler(error);
    }

    const { username, email, id } = body;
    try {
     await this.userRepository.getUser(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException({
          code: "not_user_found",
          detail: "The user was not found",
        });
      }
      throw new ErrorHandler(error);
    }
    try {
      const user = new User({
        id,
        username,
        email,
      });
      await this.userRepository.update(user);
    } catch (error) {
      this.logger.error(error as string);
      throw new ErrorHandler(error);
    }
    return new NoContentResponse();
  }
}
