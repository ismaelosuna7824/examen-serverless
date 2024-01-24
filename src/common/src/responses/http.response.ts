import { HttpResponseHelper } from '@commons/helpers/http-response.helper';
import { BodyResponseType } from '@commons/types/body-response.type';

export class HttpResponse extends HttpResponseHelper {
  constructor(statusCode: number, body: BodyResponseType = {}) {
    super();

    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
  }
}
