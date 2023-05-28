import { ErrorHandler } from "@angular/core";
import { LoggerService } from "./logger.service";

export class AppErrorHandler implements ErrorHandler {

  constructor(private loggerService: LoggerService) {
  }

  handleError(error: any): void {
    this.loggerService.error(error);
  }
}
