import { ICommand } from '@commons/interfaces/command.interface';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEventPathParameters,
} from 'aws-lambda';

export class HandleEventCommand implements ICommand {
  constructor(public event: APIGatewayProxyEvent) {}

  get headers(): APIGatewayProxyEventHeaders {
    return this.event.headers || {};
  }

  get params(): APIGatewayProxyEventPathParameters {
    return this.event.pathParameters || {};
  }

  get body(): { [key: string]: any } {
    return JSON.parse(this.event.body || '');
  }

  get authorization(): string {
    const { authorization = null, Authorization = null } = this.headers;

    return authorization || Authorization || '';
  }
}
