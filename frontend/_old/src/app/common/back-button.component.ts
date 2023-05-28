import { Component } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-back-button",
  template: `
    <span class="pull-right">
      <button name="back" type="button" class="btn btn-sm btn-secondary"
              (click)="back()">Back
      </button>
    </span>
  `
})
export class BackButtonComponent {
  constructor(private location: Location) {

  }

  back() {
    this.location.back();
  }
}
