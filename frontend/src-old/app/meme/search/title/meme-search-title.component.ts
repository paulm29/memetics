import { Component, Input, OnInit } from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import { Meme } from "../../../model/meme";
import { Profile } from "../../../model/profile";

@Component({
  template: `
    <a [routerLink]="['/profile', profile.id, 'meme', meme.id, 'view']">{{meme.title}}</a>
  `,
})

export class MemeSearchTitleComponent implements ViewCell, OnInit {
  @Input() value: string;
  @Input() rowData: any;
  profile: Profile;
  meme: Meme;

  constructor() {
  }

  ngOnInit(): void {
    this.meme = this.rowData;
    // console.log("profile", this.profile);
    // console.log("this.rowData", this.rowData);
  }
}
