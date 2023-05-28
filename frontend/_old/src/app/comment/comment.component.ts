import { Component, Input, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { Meme } from "../model/meme";
import { Profile } from "../model/profile";
import { MemeService } from "../service/meme.service";
import { AlertService } from "../uiqc/alert/alert.service";
import { NgForm } from "@angular/forms";
import { CommentService } from "../service/comment.service";
import { Comment } from "../model/comment";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html"
})
export class CommentComponent implements OnInit {
  @Input() profile: Profile;
  @Input() meme: Meme;
  comment: string;

  constructor(private route: ActivatedRoute,
              private memeService: MemeService,
              private alertService: AlertService,
              private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];
  }

  commentUpdatedCallback() {
    this.memeService.get(this.meme.id).subscribe((response) => {
      this.meme.comments = response.comments;
    }, () => this.alertService.defaultError());
  }

  addComment(addCommentForm: NgForm) {
    console.log("add comment");
    const comment = new Comment();
    comment.memeId = this.meme.id;
    comment.commentText = addCommentForm.controls.commentText.value;
    comment.profile = this.profile;

    this.commentService.commentCreate(comment).subscribe(() => {
      addCommentForm.controls.commentText.setValue("");
      this.alertService.success("Comment added");
      this.commentUpdatedCallback();
    }, () => this.alertService.defaultError());
  }
}
