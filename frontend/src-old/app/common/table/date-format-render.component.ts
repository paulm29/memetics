import { Component, Input, OnInit } from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import { DateUtilService } from "../../service/date.util.service";

@Component({
  template: `
    <div>
      {{renderValue}}
    </div>
  `,
})

export class DateFormatRenderComponent implements ViewCell, OnInit {
  @Input() value: string;
  @Input() rowData: any;

  renderValue: string;

  constructor(private dateUtilService: DateUtilService) {
  }

  ngOnInit(): void {
    if (this.value) {
      this.renderValue = this.dateUtilService.yyyymmddTOddmmyyyy(this.value);
    }
  }


}
