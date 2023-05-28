import { Component, EventEmitter } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";

@Component({
  templateUrl: "./session-expired-modal.component.html"
})
export class SessionExpiredModalComponent {
  onClose: EventEmitter<boolean> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) {
  }

  closeModal(closeTab: boolean) {
    this.bsModalRef.hide();
    this.onClose.emit(closeTab);
  }
}
