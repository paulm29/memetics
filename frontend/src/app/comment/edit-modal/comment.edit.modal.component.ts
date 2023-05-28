import {Component, EventEmitter} from "@angular/core";
import {BsModalRef} from "ngx-bootstrap";

@Component({
  templateUrl: "./comment.edit.modal.component.html"
})
export class CommentEditModalComponent {
  title: string = "Edit comment";
  modal: BsModalRef;
  commentText: string;
  modalClosed: EventEmitter<Confirmation> = new EventEmitter();

  constructor() {
  }

  close(proceed) {
    const confirmation = {
      proceed: proceed,
      commentText: this.commentText
    };
    this.modalClosed.emit(confirmation);
  }
}

interface Confirmation {
  proceed: boolean;
  commentText: string;
}
