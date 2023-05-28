import { Component, Input, OnInit } from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import { Meme } from "../../../model/meme";
import { Profile } from "../../../model/profile";

@Component({
  template: `
    <ng-container *ngIf="meme.tags.length === 0">
      No tags
    </ng-container>
    <ng-container *ngFor="let tag of meme.tags; let first = first; let last = last">
      <app-mm-tag-link [tag]="tag" [profile]="profile" [route]="'meme-slideshow'"></app-mm-tag-link>
      <span *ngIf="!last">, </span>
    </ng-container>
  `,
})

export class MemeSearchTagsComponent implements ViewCell, OnInit {
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
