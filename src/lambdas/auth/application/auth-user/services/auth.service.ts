import { LOGGER_HELPER } from "@commons/config/injection-tokens.config";
import { IApplicationService } from "@commons/interfaces/applicant-service.interface";
import { ILogger } from "@commons/interfaces/logger.interface";
import { APIGatewayIAMAuthorizerResult } from "aws-lambda";
import { inject, injectable } from "tsyringe";
import { CreateIAMPolicyCommand } from "@commons/helpers/create-iam-policy.helper";
import { HandleAuthorizerCommand } from "@commons/helpers/handle-authorizer.helper";
import { IAuthJwt } from "@lambdas/auth/infrastructure/interfaces/authJwt.interface";
import { JWTTOKENSERVICE } from "@lambdas/auth/infrastructure/container/injection-tokens.config";

@injectable()
export class authUserService implements IApplicationService<HandleAuthorizerCommand> {
  constructor(
    @inject(LOGGER_HELPER) private readonly logger: ILogger,
    @inject(JWTTOKENSERVICE) private readonly authJws: IAuthJwt
  ) {}
  public async process(body: HandleAuthorizerCommand): Promise<APIGatewayIAMAuthorizerResult> {
    this.logger.info('Processing request and validate permissions to get access');
    const { resource, authorization } = body;
    let principalId;
    try {
    
        const decode = this.authJws.verifyToken(authorization);
        this.logger.info('The token is valid', decode);
        principalId = decode.id;
  
        if (decode) {
          return new CreateIAMPolicyCommand({
            action: 'execute-api:Invoke',
            effect: 'Allow',
            resource,
            principalId,
          });
        }
        return new CreateIAMPolicyCommand({
          action: 'execute-api:Invoke',
          effect: 'Deny',
          resource,
          principalId,
        });
      } catch (err) {
        this.logger.error('Error Lambda Authorizer', err as Error);
        console.log(err);
        throw new Error('Unauthorized');
      }
  }
}
