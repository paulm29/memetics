import { Component, Input, OnInit } from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import * as moment from "moment";

@Component({
  template: `
    <div *ngIf="age">
      {{age}}
    </div>
  `
})
export class TweetAgeColumnComponent implements OnInit, ViewCell {
  @Input() value;
  @Input() rowData;
  age: number;

  constructor() {
  }

  ngOnInit(): void {
    const created = moment(new Date(this.rowData.createdAt));
    const now = moment(new Date());
    this.age =  now.diff(created, "hours");
  }
}
