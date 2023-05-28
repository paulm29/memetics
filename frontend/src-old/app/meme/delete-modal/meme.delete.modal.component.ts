import { Component, EventEmitter, OnInit, Renderer2 } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";

@Component({
  templateUrl: "./meme.delete.modal.component.html"
})
export class MemeDeleteModalComponent implements OnInit {
  title: string;
  deleteFromImgur = true;
  modalClosed: EventEmitter<Confirmation> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  focus() {
    const focus = this.renderer.selectRootElement("#delete");
    focus.innerText = "Delete"; // for some reason the button text disappears
    focus.focus();
  }

  close(proceed) {
    this.bsModalRef.hide();
    this.modalClosed.emit({proceed: proceed, deleteFromImgur: this.deleteFromImgur});
  }

}

interface Confirmation {
  proceed: boolean;
  deleteFromImgur: boolean;
}

