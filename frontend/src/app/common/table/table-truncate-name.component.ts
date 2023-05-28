import { Component, Input } from "@angular/core";
import { ViewCell } from "ng2-smart-table";

@Component({
  template: `
    <div class="truncate">
      {{value}}
    </div>
  `,
})

export class TableTruncateNameComponent implements ViewCell {
  @Input() value: string;
  @Input() rowData: any;

  constructor() {
  }
}
