import { Injectable } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { RemoveConfirmationModalComponent } from "./remove-confirmation-modal/remove-confirmation-modal.component";
import { ConfirmModalComponent } from "./confirm-modal/confirm-modal.component";
import { ErrorModalComponent } from "./error-modal/error-modal.component";

@Injectable()
export class CustomModalService {
  public modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  confirm(message?: string, okBtnText?: string, cancelBtnText?: string) {
    this.modalRef = this.modalService.show(ConfirmModalComponent);
    this.modalRef.content.message = message ? message : "Are you sure you want to proceed?";
    this.modalRef.content.okBtnText = okBtnText ? okBtnText : "Yes";
    this.modalRef.content.cancelBtnText = cancelBtnText ? cancelBtnText : "No";
    this.modalRef.content.focus();
    return this.modalRef.content.modalClosed;
  }

  error(title: string, message: string, closeButtonToClose: boolean = false) {
    const config = {
      keyboard: !closeButtonToClose,
      ignoreBackdropClick: closeButtonToClose,
      class: "error-modal"
    };

    this.modalRef = this.modalService.show(ErrorModalComponent, config);
    this.modalRef.content.title = title;
    this.modalRef.content.message = message;
    this.modalRef.content.focus();
    return this.modalRef.content.modalClosed;
  }

  removeConfirmation(itemDescription) {
    this.modalRef = this.modalService.show(RemoveConfirmationModalComponent);
    this.modalRef.content.itemDescription = itemDescription;
    this.modalRef.content.focus();
    return this.modalRef.content.modalClosed;
  }

}
