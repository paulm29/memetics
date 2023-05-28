import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { QueueItem } from "../../model/queue.item";
import { Profile } from "../../model/profile";
import { QueueService } from "../../service/queue.service";
import { AlertService } from "../../uiqc/alert/alert.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-queue-item",
  templateUrl: "./queue.item.component.html"
})
export class QueueItemComponent implements OnInit {
  @Input() profile: Profile;
  @Input() item: QueueItem;
  maxlength = 280;
  @Output() itemChanged = new EventEmitter<void>();

  @ViewChild("queueItemForm") queueItemForm: NgForm;

  constructor(private route: ActivatedRoute,
              private queueService: QueueService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  edit() {
    this.queueService.updateQueueItem(this.item).subscribe(
      () => {
        this.queueItemForm.resetForm();
        this.alertService.success("Queue item updated succesfully.");
        this.itemChanged.emit();
      },
      () => this.alertService.defaultError());
  }

  removeTextOnlyTweet() {
    this.queueService.removeFromQueue(this.item).subscribe(
      () => {
        this.alertService.success("Queue item removed succesfully.");
        this.itemChanged.emit();
      },
      () => this.alertService.defaultError());
  }

  canEdit() {
    return this.queueItemForm &&
      this.queueItemForm.form &&
      this.queueItemForm.form.controls &&
      this.queueItemForm.form.controls.content &&
      (this.queueItemForm.form.controls.content.dirty || this.queueItemForm.form.controls.hashtags.dirty);
  }

  onQueueChanged() {
    this.itemChanged.emit();
  }

  isTextOnly(): boolean {
    return !this.item.meme;
  }
}
