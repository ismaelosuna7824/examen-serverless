import { HttpResponseHelper } from '@commons/helpers/http-response.helper';
import { IErrorResponse } from '@commons/interfaces/error.interface';

export class HttpErrorResponse extends HttpResponseHelper {
  constructor(statusCode: number, body: IErrorResponse) {
    super();

    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
  }
}
