import { Component, Input, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { AlertService } from "../../uiqc/alert/alert.service";
import { MemeService } from "../../service/meme.service";
import { Profile } from "../../model/profile";
import { Meme } from "../../model/meme";
import { TagService } from "../../service/tag.service";
import { CommentService } from "../../service/comment.service";
import { MemeCurrentService } from "../../service/meme.current.service";
import { VoteService } from "../../service/vote.service";
import { Vote } from "../../model/vote";

@Component({
  selector: "app-meme-vote-star",
  templateUrl: "./meme.vote.star.component.html"
})
export class MemeVoteStarComponent implements OnInit {
  @Input() profile: Profile;
  @Input() meme: Meme;
  existingVote: Vote;
  overStar: boolean;
  loading = false;

  constructor(private route: ActivatedRoute,
              private memeCurrentService: MemeCurrentService,
              private memeService: MemeService,
              private tagService: TagService,
              private commentService: CommentService,
              private voteService: VoteService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.existingVote = this.voteService.getCurrentMemeVote(this.meme, this.profile);

    if (!this.existingVote) {
      this.existingVote = new Vote();
    }
  }

  vote() {
    this.loading = true;
    if (!this.existingVote.id) {
      this.voteService.voteCreate(this.meme, this.profile, this.existingVote.score).subscribe(() => {
        this.memeUpdatedCallback();
      }, () => {
        this.alertService.defaultError();
      });
    } else if (this.existingVote.score !== this.meme.currentMemeVote) {
      this.voteService.voteUpdate(this.existingVote)
        .subscribe(() => {
          this.memeUpdatedCallback();
        }, () => {
          this.alertService.defaultError();
        });
    }
  }

  hoveringOver() {
    this.overStar = this.meme.currentMemeVote;
  }

  onLeave() {
    this.overStar = null;
    this.vote();
  }

  memeUpdatedCallback() {
    this.memeService.get(this.meme.id).subscribe((response) => {
      this.meme = response;
      this.existingVote = this.voteService.getCurrentMemeVote(response, this.profile);
      this.loading = false;
    });
  }
}
