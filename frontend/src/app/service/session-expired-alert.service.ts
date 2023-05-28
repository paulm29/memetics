import { Injectable } from "@angular/core";
import { SessionExpiredModalComponent } from "../session-expired-modal/session-expired-modal.component";
import { BsModalService } from "ngx-bootstrap";
import {AlertService} from "../uiqc/alert/alert.service";

@Injectable()
export class SessionExpiredAlertService {

  private open = false;

  constructor(private modalService: BsModalService, private alertService: AlertService) {
  }

  showSessionExpiredPopup() {
    console.log("clearAndPauseAlerts");
    // this.alertService.clearAndPauseAlerts();
    if (this.open) {
      return;
    }
    this.open = true;
    const bsModalRef = this.modalService.show(SessionExpiredModalComponent, {ignoreBackdropClick: true, keyboard: false});

    bsModalRef.content.onClose.subscribe((closeTab) => {
      this.open = false;
      // this.alertService.resumeAlerts();
      console.log("resumeAlerts");
    });
  }
}
