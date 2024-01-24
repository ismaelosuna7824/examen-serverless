import { BodyResponseType } from '@commons/types/body-response.type';
import { HttpResponse } from './http.response';

export class OkResponse extends HttpResponse {
  constructor(response: BodyResponseType) {
    super(200, response);
  }
}
