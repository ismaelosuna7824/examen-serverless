import { IErrorResponse } from '@commons/interfaces/error.interface';
import { HttpErrorResponse } from './http-response.exception';

export class ConflictException extends HttpErrorResponse {
  constructor(error: IErrorResponse) {
    super(409, error);
  }
}
