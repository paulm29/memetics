import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Profile } from "../../model/profile";
import { AlertService } from "../../uiqc/alert/alert.service";
import { ProfileService } from "../../service/profile.service";
import { CommentService } from "../../service/comment.service";
import { Comment } from "../../model/comment";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { CommentEditModalComponent } from "../edit-modal/comment.edit.modal.component";
import { CommentDeleteModalComponent } from "../delete-modal/comment.delete.modal.component";


@Component({
  selector: "app-mm-comment-toolbar",
  templateUrl: "./comment.toolbar.component.html"
})
export class CommentToolbarComponent implements OnInit {
  @Input() profile: Profile;
  @Input() comment: Comment;
  @Output() commentUpdated = new EventEmitter<string>();
  modal: BsModalRef;

  constructor(private router: Router,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private commentService: CommentService,
              private alertService: AlertService,
              private profileService: ProfileService) {
  }

  ngOnInit(): void {
  }

  editComment() {
    this.modal = this.modalService.show(CommentEditModalComponent);
    this.modal.content.title = "Confirm edit";
    this.modal.content.commentText = this.comment.commentText;
    this.modal.content.modalClosed.subscribe((confirmation) => {
      if (confirmation.proceed) {
        this.doEdit(confirmation.updatedComment);
      }
    });
  }

  doEdit(updatedComment: string) {
    this.commentService.commentUpdate(this.comment.id, this.comment.memeId, this.profile, updatedComment).subscribe(() => {
      this.alertService.success("Comment successfully edited.");
      this.commentUpdated.emit(updatedComment);
    }, this.alertService.defaultError);
  }

  deleteComment() {
    this.modal = this.modalService.show(CommentDeleteModalComponent);
    this.modal.content.title = "Confirm delete";
    this.modal.content.commentText = this.comment.commentText;
    this.modal.content.modalClosed.subscribe((confirmation) => {
      if (confirmation.proceed) {
        this.doDelete();
      }
    });
  }

  doDelete() {
    this.commentService.commentDelete(this.comment.id, this.comment.memeId).subscribe(() => {
      this.alertService.success("Comment successfully deleted.");
      this.commentUpdated.emit(null);
    }, this.alertService.defaultError);
  }
}
