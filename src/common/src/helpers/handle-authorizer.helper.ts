import { TokenStrategyEnum } from '@commons/enums/token-strategy.enum';
import { ICommand } from '@commons/interfaces/command.interface';
import { APIGatewayRequestAuthorizerEvent, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

export class HandleAuthorizerCommand implements ICommand {
  constructor(public event: APIGatewayRequestAuthorizerEvent) {}

  get resource(): string {
    return this.event.methodArn || '';
  }

  get authorization(): string {
    const token = this.event?.headers?.Authorization?.split(TokenStrategyEnum.BEARER)[1] ?? '';
    return token.trim();
  }
}
