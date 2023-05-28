import { Component, Input, OnInit } from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import { BufferService } from "../../service/buffer.service";
import { BufferRetweet } from "../../model/buffer.retweet";
import { AlertService } from "../../uiqc/alert/alert.service";
import { BufferUpdate } from "../../model/buffer.update";

@Component({
  template: `
    <div>
      {{value}} |
      <button class="btn btn-secondary" (click)="retweet(true)" [disabled]="loading" name="retweetTop">RTT <span
        *ngIf="loading" class="fa fa-spinner fa-spin"></span>
      </button>
      <button class="btn btn-secondary" (click)="retweet(false)" [disabled]="loading" name="retweetBottom">RTB <span
        *ngIf="loading" class="fa fa-spinner fa-spin"></span>
      </button>
      <button class="btn btn-primary" (click)="facebookPost()" [disabled]="loading" name="facebookPost">FB <span
        *ngIf="loading" class="fa fa-spinner fa-spin"></span>
      </button>
      <button class="btn btn-warning" (click)="instagramPost()" [disabled]="loading" name="facebookPost">IG <span
        *ngIf="loading" class="fa fa-spinner fa-spin"></span>
      </button>
      <button class="btn btn-info" (click)="googlePlusPost()" [disabled]="loading" name="facebookPost">GP <span
        *ngIf="loading" class="fa fa-spinner fa-spin"></span>
      </button>
      <span *ngIf="sent">Sending...</span>
    </div>
  `
})
export class TweetTextColumnComponent implements ViewCell, OnInit {
  @Input() value;
  @Input() rowData;

  loading: boolean;
  sent: boolean;

  constructor(private bufferService: BufferService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    // this.link = this.value;
  }

  retweet(top: boolean) {
    this.loading = true;
    const bufferRetweet = new BufferRetweet(this.rowData.id, null, top);
    this.bufferService.retweet(bufferRetweet).subscribe((response) => {
      this.alertService.success("Retweet added to buffer queue");
      this.sent = true;
    });
    this.loading = false;
  }

  facebookPost() {
    this.loading = true;
    const bufferUpdate = new BufferUpdate();
    bufferUpdate.text = this.rowData.text;
    bufferUpdate.services = ["facebook"];
    this.bufferService.bufferUpdateCreate(bufferUpdate).subscribe((response) => {
      this.alertService.success("update added to buffer queue");
      this.sent = true;
    });
    this.loading = false;
  }

  instagramPost() {
    this.loading = true;
    const bufferUpdate = new BufferUpdate();
    bufferUpdate.text = this.rowData.text;
    bufferUpdate.services = ["instagram"];
    this.bufferService.bufferUpdateCreate(bufferUpdate).subscribe((response) => {
      this.alertService.success("update added to buffer queue");
      this.sent = true;
    });
    this.loading = false;
  }

  googlePlusPost() {
    this.loading = true;
    const bufferUpdate = new BufferUpdate();
    bufferUpdate.text = this.rowData.text;
    bufferUpdate.services = ["unknown"];
    this.bufferService.bufferUpdateCreate(bufferUpdate).subscribe((response) => {
      this.alertService.success("update added to buffer queue");
      this.sent = true;
    });
    this.loading = false;
  }
}
