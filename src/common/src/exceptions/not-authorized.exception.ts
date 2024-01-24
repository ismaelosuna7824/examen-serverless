import { IErrorResponse } from '@commons/interfaces/error.interface';
import { HttpErrorResponse } from './http-response.exception';

export class NotAuthorizedException extends HttpErrorResponse {
  constructor(error: IErrorResponse) {
    super(401, error);
  }
}
