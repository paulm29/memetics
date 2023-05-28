import { Component, EventEmitter, OnInit, Renderer2 } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";

@Component({
  templateUrl: "./remove-confirmation-modal.component.html"
})
export class RemoveConfirmationModalComponent implements OnInit {
  itemDescription: string;
  isDefaultMessage: boolean;
  modalClosed: EventEmitter<boolean> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (this.itemDescription) {
      this.isDefaultMessage = true;
    }
  }

  focus() {
    const focus = this.renderer.selectRootElement("#removeConfirmationModalProceed");
    focus.innerText = "Proceed"; // for some reason the button text disappears
    focus.focus();
  }

  close(proceed) {
    this.bsModalRef.hide();
    this.modalClosed.emit(proceed);
  }
}
