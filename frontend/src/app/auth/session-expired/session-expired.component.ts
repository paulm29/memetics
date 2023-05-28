import { interval as observableInterval } from "rxjs";

import { map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "./session-expired.component.html"
})
export class SessionExpiredComponent implements OnInit {

  // How soon are we redirecting ?
  redirectIn: number;

  constructor() {
  }

  ngOnInit() {

    // give the user some time to see the message
    observableInterval(1000).pipe(map(x => x + 1)).subscribe(x => {

      // apply countdown
      this.redirectIn = 30 - x;

      // navigate at 0
      if (this.redirectIn === 0) {

        // navigate to the login page
        window.location.href = "";
      }
    });
  }

}
