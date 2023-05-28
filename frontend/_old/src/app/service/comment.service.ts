import { Injectable } from "@angular/core";
import { MemeticsClient } from "./memetics.client";
import { Comment } from "../model/comment";


@Injectable()
export class CommentService {

  constructor(private memeticsClient: MemeticsClient) {
  }

  get(commentId) {
    return this.memeticsClient.commentsGet(commentId);
  }

  commentsGetForProfile(memeId) {
    return this.memeticsClient.commentsGetForProfile(memeId);
  }

  commentCreate(comment: Comment) {
    return this.memeticsClient.commentCreate(comment);
  }

  commentUpdate(commentId, memeId, profile, commentText) {
    return this.memeticsClient.commentUpdate(commentId, memeId, profile, commentText);
  }

  commentDelete(commentId, memeId) {
    return this.memeticsClient.commentDelete(commentId, memeId);
  }
}
