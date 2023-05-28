import { EventEmitter, Injectable } from "@angular/core";
import { Alert } from "./alert";
import { LoggerService } from "../logger.service";

@Injectable()
export class AlertService {
  paused = false;
  alertEvent: EventEmitter<Alert> = new EventEmitter();
  clearAlertEvent = new EventEmitter();

  constructor(private logger: LoggerService) {
  }

  private static errorId(): string {
    let text = "";
    const possible = "ABCDEFGHJKMNPRSTUVWXYZ23456789";

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  success(msg: string): void {
    this.alert({msg: msg, type: "success", timeout: 3000, alertClass: "alert alert-success"});
  }

  error(msg: string): void {
    this.alert({msg: msg, type: "danger", alertClass: "alert alert-danger"});
  }

  fatal(msg: string): void {
    const errorAlert = {msg: msg, type: "danger", alertClass: "alert alert-danger", errorId: AlertService.errorId()};
    this.logger.error(JSON.stringify(errorAlert));
    this.alert(errorAlert);
  }

  defaultError(): void {
    this.error("An unexpected error has occurred.");
  }

  warning(msg: string): void {
    this.alert({msg: msg, type: "warning", alertClass: "alert alert-warning"});
  }

  private alert(alert) {
    if (!this.paused) {
      this.alertEvent.emit(alert);
    }
  }

  clearAndPauseAlerts() {
    this.clearAlertEvent.emit();
    this.paused = true;
  }

  resumeAlerts() {
    this.paused = false;
  }
}
