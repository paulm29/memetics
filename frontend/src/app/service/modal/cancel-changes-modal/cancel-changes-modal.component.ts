import { Component, EventEmitter, Renderer2 } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";

@Component({
  templateUrl: "./cancel-changes-modal.component.html"
})
export class CancelChangesModalComponent {
  message: string;
  yesText: string;
  noText: string;
  modalClosed: EventEmitter<boolean> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef, private renderer: Renderer2) {
  }

  focus() {
    const focus = this.renderer.selectRootElement("#closeChangesModalProceed");
    focus.innerText = this.yesText; // for some reason the button text disappears
    focus.focus();
  }

  close(proceed) {
    this.bsModalRef.hide();
    this.modalClosed.emit(proceed);
  }
}
