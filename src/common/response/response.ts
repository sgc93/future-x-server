import { Code, Status } from "./response.enum";

export class HttpResponse {
  private timestamp: string;

  constructor(
    private code?: Code,
    private status?: Status,
    private message: string,
    private data?: {}
  ) {
    this.timestamp = new Date().toLocaleString();
    this.status = status ?? Status.OK;
    this.code = code ?? Code.OK;
    this.message = message;
    this.data = data;
  }
}
