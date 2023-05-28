import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Profile } from "../../model/profile";
import { Meme } from "../../model/meme";
import { TagService } from "../../service/tag.service";
import { AlertService } from "../../uiqc/alert/alert.service";
import { QueueService } from "../../service/queue.service";
import { QueueItem } from "../../model/queue.item";


@Component({
  selector: "app-queue-toolbar",
  templateUrl: "queue.toolbar.component.html"
})
export class QueueToolbarComponent implements OnInit {
  @Input() profile: Profile;
  @Input() meme: Meme;
  @Input() queue?: QueueItem[]; // optional due to ng2-smart-table rendering issues
  @Input() showLabel?: boolean;
  @Output() queueChanged = new EventEmitter<void>();

  queueItem: QueueItem;

  constructor(private alertService: AlertService,
              private tagService: TagService,
              private queueService: QueueService) {
  }

  ngOnInit() {
    this.getQueueItem();
  }

  getQueueItem() {
    if (this.queue) {
      this.queueItem = this.getItem(this.queue);
    } else {
      this.queueService.queueGetForProfile(this.profile).subscribe((queueItems) => {
        this.queueItem = this.getItem(queueItems);
      });
    }
  }

  private getItem(queueItems) {
    return queueItems.find(qi => {
      return qi.meme && qi.meme.id === this.meme.id;
    });
  }

  addToQueue() {
    let content = this.meme.caption;
    if (!content) {
      content = this.meme.title;
    }
    const hashtags = this.tagService.tagsToString(this.meme.tags);
    this.queueService.addToQueue(this.meme, this.profile, content, hashtags).subscribe(
      (response) => {
        this.queueItem = response;
        this.alertService.success("Meme added to queue succesfully.");
        this.queueChanged.emit();
      },
      this.alertService.defaultError);
  }

  removeFromQueue() {
    this.queueService.removeFromQueue(this.queueItem).subscribe(
      () => {
        this.queueItem = null;
        this.alertService.success("Queue item removed succesfully.");
        this.queueChanged.emit();
      },
      () => {
        this.alertService.defaultError();
      });
  }

  getClass(queueItem: QueueItem): string {
    return "removeFromQueueMeme" + (queueItem.meme ? queueItem.meme.id : "0");
  }
}
