import { IErrorResponse } from '@commons/interfaces/error.interface';
import { HttpErrorResponse } from './http-response.exception';

export class BadRequestException extends HttpErrorResponse {
  constructor(error: IErrorResponse) {
    super(400, error);
  }
}
