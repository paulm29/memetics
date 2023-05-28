import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import { Meme } from "../../../model/meme";
import { Profile } from "../../../model/profile";
import { QueueItem } from "../../../model/queue.item";

@Component({
  templateUrl: "./meme-search-queue.component.html"
})

export class MemeSearchQueueComponent implements ViewCell, OnInit {
  @Input() value: string;
  @Input() rowData: any;
  profile: Profile;
  meme: Meme;
  queue: QueueItem[];
  @Output() queueChanged = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
    this.meme = this.rowData;
  }

  onQueueChanged() {
    this.queueChanged.emit();
  }
}
