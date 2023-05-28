import { Component, Input, OnInit } from "@angular/core";
import { MemeService } from "../../service/meme.service";
import { TagService } from "../../service/tag.service";
import { AlertService } from "../../uiqc/alert/alert.service";
import { ProfileService } from "../../service/profile.service";
import { Meme } from "../../model/meme";
import { Profile } from "../../model/profile";
import { TweetService } from "../../service/tweet.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { MemeTweetModalComponent } from "../tweet-modal/meme.tweet.modal.component";

@Component({
  selector: "app-mm-meme-tweet",
  templateUrl: "./meme.tweet.component.html"
})
export class MemeTweetComponent implements OnInit {
  @Input() profile: Profile;
  @Input() meme: Meme;
  @Input() caption: string;
  @Input() twitterOnly: boolean;
  dataUrl: string;
  hashtags: string;
  modal: BsModalRef;

  constructor(private memeService: MemeService,
              private tagService: TagService,
              private alertService: AlertService,
              private tweetService: TweetService,
              private profileService: ProfileService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    if (this.profileService.isTwitterAccount()) {
      this.hashtags = this.tagService.tagsToHashtags(this.meme.tags);
    }
    this.dataUrl = this.meme.url;
  }

  doTweet(text) {
    this.tweetService.tweetMeme(text, this.meme.url, this.meme.id, this.profile.id).subscribe(() => {
        this.alertService.success("Tweet successful.");
        this.memeUpdatedCallback();
      },
      this.alertService.defaultError
    );
  }

  openTweetModal() {
    this.modal = this.modalService.show(MemeTweetModalComponent);
    console.log("this.meme", this.meme);
    this.modal.content.title = this.meme.title;
    this.modal.content.caption = this.getCaption();
    this.modal.content.hashtags = this.hashtags;
    this.modal.content.hashtagFavourites = this.profile.hashtagFavourites;
    this.modal.content.modalClosed.subscribe((tweet) => {
      if (tweet) {
        this.doTweet(tweet);
      }
    });
  }

  getCaption() {
    if (this.caption) {
      return this.caption;
    }
    return this.meme.caption;
  }

  memeUpdatedCallback() {
    this.memeService.get(this.meme.id).subscribe((response) => {
      this.meme = response;
    });
  }
}
