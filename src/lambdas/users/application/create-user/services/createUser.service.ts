import { EMAIL, LOGGER_HELPER } from "@commons/config/injection-tokens.config";
import { ErrorHandler } from "@commons/exceptions/error-handler";
import { IApplicationService } from "@commons/interfaces/applicant-service.interface";
import { ILogger } from "@commons/interfaces/logger.interface";
import { CreatedResponse } from "@commons/responses/created.response";
import { IUserRepository } from "@lambdas/users/domain/contracts/user-repository";
import { USER_REPOSITORY } from "@lambdas/users/infrastructure/container/injection-tokens.config";
import { CreateUserCommand } from "@lambdas/users/domain/contracts/create-user-command";
import { User } from '@lambdas/users/domain/User';
import { APIGatewayProxyResult } from "aws-lambda";
import { inject, injectable } from "tsyringe";
import { validateOrReject } from "class-validator";
import { IEmailService } from "@commons/interfaces/email-service.interface";


@injectable()
export class UserService implements IApplicationService<CreateUserCommand>{
    constructor(
        @inject(LOGGER_HELPER) private readonly logger: ILogger,
        @inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
        @inject(EMAIL) private readonly email: IEmailService,
    ){}

    public async process({ body }: CreateUserCommand): Promise<APIGatewayProxyResult> {
        try {
            this.logger.info('Checking create user command', body);
            await validateOrReject(body);
          } catch (error) {
            this.logger.error('Error to create user command', body);
            throw new ErrorHandler(error);
          }
        try {
            const { username, email} = body;
            const user = new User({
                username,
                email
            });
            await this.userRepository.persist(user);

            await this.email.sendEmail({
              from: "cuentaspam1234534@outlook.com",
              to: email,
              subject: "Welcome",
              text: "you have been successfully registered"
            })

        } catch (error) {
            this.logger.error(error as string);
            throw new ErrorHandler(error);
        }
      return new CreatedResponse({});
    }
}