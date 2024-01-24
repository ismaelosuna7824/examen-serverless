import { IErrorResponse } from '@commons/interfaces/error.interface';
import { HttpErrorResponse } from './http-response.exception';

export class NotFoundException extends HttpErrorResponse {
  constructor(error: IErrorResponse) {
    super(404, error);
  }
}
