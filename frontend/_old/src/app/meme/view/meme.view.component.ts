import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { AlertService } from "../../uiqc/alert/alert.service";
import { MemeService } from "../../service/meme.service";
import { Profile } from "../../model/profile";
import { Meme } from "../../model/meme";
import { TagService } from "../../service/tag.service";
import { QueueService } from "../../service/queue.service";
import { CommentService } from "../../service/comment.service";
import { MemeCurrentService } from "../../service/meme.current.service";
import { QueueItem } from "../../model/queue.item";
import { AuthService } from "../../service/auth.service";
import "rxjs/add/operator/skip";

@Component({
  styleUrls: ["./meme.view.component.scss"],
  templateUrl: "./meme.view.component.html"
})
export class MemeViewComponent implements OnInit {
  profile: Profile;
  meme: Meme;
  hashtags: string;
  queue: QueueItem[];
  loading = true;

  constructor(private route: ActivatedRoute,
              private memeCurrentService: MemeCurrentService,
              private memeService: MemeService,
              private tagService: TagService,
              private commentService: CommentService,
              private queueService: QueueService,
              private alertService: AlertService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.parent.snapshot.data["profile"];

    this.route.parent.params.subscribe((params) => {
      this.memeCurrentService.setMemeCurrentById(params["memeId"]);
    });

    this.memeCurrentService.memeCurrent$.skip(1).subscribe((meme) => {
      this.meme = meme;
      this.loading = false;
    });

    this.queueService.queueGetForProfile(this.profile).subscribe((response) => {
        this.queue = response;
      },
      () => this.alertService.defaultError()
    );
  }

  memeUpdatedCallback() {
    this.memeService.get(this.meme.id).subscribe((response) => {
      this.meme = response;
    });
  }

  canEdit() {
    return this.profile && this.meme && this.meme.profile && (this.profile.id === this.meme.profile.id)
      || this.authService.isAdmin();
  }

}
