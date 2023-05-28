import { Component, Input } from "@angular/core";
import { ViewCell } from "ng2-smart-table";

@Component({
  template: `
    <div *ngIf="total">
      {{total}}
    </div>
  `
})
export class TweetTotalColumnComponent implements ViewCell {
  @Input() value;
  @Input() rowData;
  total: number;

  constructor() {
  }

  ngOnInit(): void {
    this.total = this.rowData.retweetCount +  this.rowData.favoriteCount;
  }
}
