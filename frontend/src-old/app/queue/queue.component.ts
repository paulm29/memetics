import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { QueueService } from "../service/queue.service";
import { Profile } from "../model/profile";
import { AlertService } from "../uiqc/alert/alert.service";
import { DragulaService } from "ng2-dragula";
import { QueueItem } from "../model/queue.item";

@Component({
  templateUrl: "./queue.component.html"
})
export class QueueComponent implements OnInit {
  profile: Profile;
  queue: QueueItem[] = [];
  newTweet: string;
  maxlength = 280;

  options = {
    fieldSeparator: ",",
    quoteStrings: "\"",
    decimalseparator: ".",
    showLabels: true,
    headers: ["content", "hashtags", "imgur url"],
    showTitle: false,
    title: "Export",
    useBom: false,
    removeNewLines: true,
    keys: ["content", "hashtags", "imgur url"]
  };

  constructor(private route: ActivatedRoute,
              private queueService: QueueService,
              private alertService: AlertService,
              private dragulaService: DragulaService) {

    dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });
  }

  ngOnInit(): void {
    this.newTweet = "";
    this.profile = this.route.parent.snapshot.data["profile"];

    this.getQueue();
  }

  private hasClass(el: any, name: string) {
    return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(" ") : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
    }
  }

  private onDrag(args) {
    const [e, el] = args;
    this.removeClass(e, "ex-moved");
  }

  private onDrop(args) {
    const [e, el] = args;
    this.addClass(e, "ex-moved");
  }

  private onOver(args) {
    const [e, el, container] = args;
    this.addClass(el, "ex-over");
  }

  private onOut(args) {
    const [e, el, container] = args;
    this.removeClass(el, "ex-over");
  }

  getQueue() {
    this.queueService.queueGetForProfile(this.profile).subscribe((response) => {
        this.queue = response;
      },
      () => this.alertService.defaultError()
    );
  }

  getCsvArray() {
    const csvArray = [];
    this.queue.forEach((queueItem) => {
      const queueItemExport = {
        content: queueItem.content,
        hashtags: queueItem.hashtags,
        meme: queueItem.meme ? queueItem.meme.url : ""
      };
      csvArray.push([queueItem.content, queueItem.hashtags, queueItem.meme ? queueItem.meme.url : ""]);
    });
    return csvArray;
  }

  addTweet() {
    this.queueService.addTextOnlyTweetToQueue(this.profile, this.newTweet, "").subscribe(
      (response) => {
        this.queue.push(response);
        this.newTweet = "";
        this.alertService.success("Tweet added to queue succesfully.");
      },
      () => this.alertService.defaultError());
  }

  onItemChanged() {
    this.getQueue();
  }
}
