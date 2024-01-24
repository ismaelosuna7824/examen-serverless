import { APIGatewayProxyResult } from 'aws-lambda';
import { HttpErrorResponse } from './http-response.exception';

export function LambdaHandlerException(error: unknown): APIGatewayProxyResult {
  if (error instanceof HttpErrorResponse) {
    return error;
  }

  if (typeof error === 'string') {
    return new HttpErrorResponse(500, { code: 'unknown', detail: error });
  }

  if (typeof error === 'object') {
    return parsingError(error);
  }

  return parsingError({});
}

function parsingError(error: any): HttpErrorResponse {
  const { code = 'unknown', detail = 'Unknown error', statusCode = 500 } = error;
  return new HttpErrorResponse(statusCode, { code, detail });
}
