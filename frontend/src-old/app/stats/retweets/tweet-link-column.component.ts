import {Component, Input, OnInit} from "@angular/core";
import { ViewCell } from "ng2-smart-table";

@Component({
  template: `
    <div *ngIf="rowData?.id">
      <a href="https://twitter.com/aupol_news/status/{{rowData.id}}">Link</a>
    </div>
  `
})
export class TweetLinkColumnComponent implements ViewCell, OnInit {
  @Input() value;
  @Input() rowData;
  // link: string;

  constructor() {
  }

  ngOnInit(): void {
    // this.link = this.value;
  }
}
