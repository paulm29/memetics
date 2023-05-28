import { Component } from "@angular/core";
import { DEFAULT_INTERRUPTSOURCES, Idle } from "@ng-idle/core";
import { AuthService } from "../service/auth.service";


@Component({
  selector: "mm-idle",
  templateUrl: "./idle.component.html"
})
export class IdleComponent {
  // started: false;
  // lastPing?: Date = null;
  idleState = "Not started.";
  // timedOut = false;
  timeoutWarning: boolean;

  constructor(private idle: Idle, private authService: AuthService) { // , private keepalive: Keepalive

    this.init(this.idle, 300, 30);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);     // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document

    idle.onTimeout.subscribe(() => {
      // this.alertService.error("Timed out!");
      // this.idleState = "Timed out!";
      // this.timedOut = true;
      console.log("onTimeout");
      this.timeoutWarning = false;
      this.authService.logout();
    });
    idle.onIdleStart.subscribe(() => {
      // this.alertService.warning("You've gone idle!");
      this.idleState = "You've gone idle!";
    });
    idle.onIdleEnd.subscribe(() => {
      this.timeoutWarning = false;
      this.idleState = "No longer idle.";
    });
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.timeoutWarning = true;
      this.idleState = "You will time out in " + countdown + " seconds!";
    });

    // sets the ping interval to 15 seconds
    // keepalive.interval(15);
    // keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  init(idle: Idle, idleTime: number, idleTimeoutTime: number) {
    idle.setIdle(idleTime);     // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setTimeout(idleTimeoutTime);     // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
  }

  reset() {
    console.log("reset");
    this.idle.watch();
    this.idleState = "Started.";
    // this.timedOut = false;
  }
}
