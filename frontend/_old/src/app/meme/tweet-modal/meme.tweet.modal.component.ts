import { Component, EventEmitter, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";

@Component({
  templateUrl: "./meme.tweet.modal.component.html"
})
export class MemeTweetModalComponent implements OnInit {
  title = "";
  tweet = "";
  caption: string;
  hashtags: string;
  hashtagFavourites: string[];
  modalClosed: EventEmitter<string> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    let captionText = "";
    if (this.caption) {
      console.log("caption", this.caption);
      captionText = this.caption;
    } else if (this.title) {
      console.log("title", this.title);
      captionText = this.title;
    }

    let tags = this.hashtags ? this.hashtags : "";
    if (this.hashtagFavourites && this.hashtagFavourites.length) {
      tags = tags + this.hashtagFavourites.map(value => value["hashtag"]).join(" ");
    }
    this.tweet = captionText + " " + tags;
  }

  close(proceed) {
    if (!proceed) {
      this.tweet = "";
    }
    this.bsModalRef.hide();
    this.modalClosed.emit(this.tweet);
  }

}
