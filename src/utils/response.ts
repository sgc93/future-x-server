import { Code, Status } from "../types/response.enum";

export class HttpResponse {
  private timestamp: string;

  constructor(
    private status: Code,
    private code: Status,
    private message: string,
    private data?: {}
  ) {
    this.timestamp = new Date().toLocaleString();
    this.status = status;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
