import { BodyResponseType } from '@commons/types/body-response.type';
import { HttpResponse } from './http.response';

export class CreatedResponse extends HttpResponse {
  constructor(response?: BodyResponseType) {
    super(201, response);
  }
}
