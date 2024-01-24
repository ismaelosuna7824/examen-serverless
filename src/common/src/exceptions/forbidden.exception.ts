import { IErrorResponse } from '@commons/interfaces/error.interface';
import { HttpErrorResponse } from './http-response.exception';

export class ForbiddenException extends HttpErrorResponse {
  constructor(error: IErrorResponse) {
    super(403, error);
  }
}
