import { Injectable } from "@angular/core";

import * as log4javascript from "log4javascript";

@Injectable()
export class LoggerService {

  private logger: log4javascript.Logger;

  constructor() {
    log4javascript.logLog.setQuietMode(true);

    const ajaxAppender = new log4javascript.AjaxAppender("rest/log");
    ajaxAppender.setLayout(new log4javascript.JsonLayout());
    ajaxAppender.addHeader("Content-Type", "application/json");
    ajaxAppender.setThreshold(log4javascript.Level.DEBUG);

    this.logger = log4javascript.getLogger();
    this.logger.addAppender(ajaxAppender);
  }

  error(...messages: any[]) {
    this.logger.error(messages);
  }

}
