import { ICommand } from '@commons/interfaces/command.interface';
import { APIGatewayAuthorizerResultContext, PolicyDocument } from 'aws-lambda';

export class CreateIAMPolicyCommand implements ICommand {
  public principalId: string;
  public policyDocument: PolicyDocument;
  public context?: APIGatewayAuthorizerResultContext | null | undefined;

  constructor({
    action: Action,
    effect: Effect,
    resource: Resource,
    principalId,
    context,
  }: {
    action: string | string[];
    effect: string;
    resource: string | string[];
    principalId: 'unavailable' | string;
    context?: APIGatewayAuthorizerResultContext | null | undefined;
  }) {
    this.principalId = principalId;
    this.context = context;
    this.policyDocument = {
      Version: '2012-10-17',
      Statement: [
        {
          Action,
          Effect,
          Resource,
        },
      ],
    };
  }
}
