import { Component, Input, OnInit } from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import { Meme } from "../../../model/meme";
import { Profile } from "../../../model/profile";

@Component({
  styleUrls: ["./meme-search-actions.component.scss"],
  templateUrl: "./meme-search-actions.component.html"
})

export class MemeSearchActionsComponent implements ViewCell, OnInit {
  @Input() value: string;
  @Input() rowData: any;
  profile: Profile;
  meme: Meme;

  constructor() {
  }

  ngOnInit(): void {
    this.meme = this.rowData;
  }
}
