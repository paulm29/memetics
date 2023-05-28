import { AfterViewInit, Component, EventEmitter, OnDestroy, Renderer2, ViewChild } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { Subscription } from "rxjs/Subscription";

@Component({
  templateUrl: "./error-modal.component.html",
  styleUrls: ["./error-modal.component.scss"]
})
export class ErrorModalComponent implements OnDestroy {
  message: string;
  title: string;
  modalClosed: EventEmitter<boolean> = new EventEmitter();
  @ViewChild("confirmModalProceed") confirmModalProceed;
  subscription: Subscription;

  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService, private renderer: Renderer2) {
    this.subscription = this.modalService.onHide.subscribe(() => this.modalClosed.emit(true));
  }

  close() {
    this.bsModalRef.hide();
    this.modalClosed.emit(true);
  }

  focus() {
    const focus = this.renderer.selectRootElement("#closeErrorModalButton");
    focus.innerHTML = "<i class='fa fa-times'></i>";
    focus.focus();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
