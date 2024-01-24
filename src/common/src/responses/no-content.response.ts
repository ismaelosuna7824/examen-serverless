import { HttpResponse } from './http.response';

export class NoContentResponse extends HttpResponse {
  constructor() {
    super(204);
  }
}
