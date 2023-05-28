import { Component, EventEmitter, OnDestroy, Renderer2 } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";

@Component({
  templateUrl: "./confirm-modal.component.html"
})
export class ConfirmModalComponent implements OnDestroy {
  message: string;
  okBtnText: string;
  cancelBtnText: string;
  proceed: boolean;
  modalClosed: EventEmitter<boolean> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef, private renderer: Renderer2) {
  }

  focus() {
    const focus = this.renderer.selectRootElement("#confirmModalProceed");
    focus.innerText = this.okBtnText; // for some reason the button text disappears
    focus.focus();
  }

  close(proceed) {
    this.proceed = proceed;
    this.bsModalRef.hide();
    this.modalClosed.emit(proceed);
  }

  ngOnDestroy() {
    if (this.proceed == null) {
      this.modalClosed.emit(false);
    }
  }
}
