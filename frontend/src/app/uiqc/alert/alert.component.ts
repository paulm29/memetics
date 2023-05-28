import { Component, NgZone, OnInit } from "@angular/core";
import { UserService } from "../../service/user.service";
import { AlertService } from "./alert.service";
import { isUndefined } from "util";
import { User } from "../../model/user";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"]
})
export class AlertComponent implements OnInit {
  alerts = [];
  user: User;

  constructor(private alertService: AlertService,
              private userService: UserService,
              private zone: NgZone) {
  }

  ngOnInit(): void {
    this.alertService.alertEvent.subscribe((alert) => this.addAlert(alert));
    this.alertService.clearAlertEvent.subscribe(() => this.alerts = []);
    this.user = this.userService.user;
  }

  addAlert(alert) {
    if (alert.timeout === undefined) {
      this.alerts = this.alerts.filter((existing) => existing.type !== alert.type);
    }

    this.alerts.push(alert);

    if (alert.timeout) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.zone.run(() => this.closeAlert(alert));
        }, alert.timeout);
      });
    }
  }

  closeAlert(alert) {
    const indexOf = this.alerts.indexOf(alert);
    if (indexOf > -1) {
      this.alerts.splice(indexOf, 1);
    }
  }
}
