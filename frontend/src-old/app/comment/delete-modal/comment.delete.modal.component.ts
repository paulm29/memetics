import {Component, EventEmitter} from "@angular/core";
import {BsModalRef} from "ngx-bootstrap";

@Component({
  templateUrl: "./comment.delete.modal.component.html"
})
export class CommentDeleteModalComponent {
  title: string = "Delete comment";
  modal: BsModalRef;
  commentText: string;
  modalClosed: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  close(proceed) {
    this.modalClosed.emit(proceed);
  }
}
