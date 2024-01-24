import { IErrorResponse } from '@commons/interfaces/error.interface';
import { HttpErrorResponse } from './http-response.exception';

export class InternalServerException extends HttpErrorResponse {
  constructor(error: IErrorResponse) {
    super(500, error);
  }
}
