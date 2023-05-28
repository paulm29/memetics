import { Component, Input, OnInit } from "@angular/core";
import { MemeService } from "../../service/meme.service";
import { TagService } from "../../service/tag.service";
import { AlertService } from "../../uiqc/alert/alert.service";
import { ProfileService } from "../../service/profile.service";
import { Meme } from "../../model/meme";
import { Profile } from "../../model/profile";
import { TweetService } from "../../service/tweet.service";
import { BsModalService } from "ngx-bootstrap";

@Component({
  selector: "app-mm-meme-facebook-post",
  templateUrl: "./meme.facebook.post.component.html"
})
export class MemeFacebookPostComponent implements OnInit {
  @Input() profile: Profile;
  @Input() meme: Meme;
  dataUrl: string;

  constructor(private memeService: MemeService,
              private tagService: TagService,
              private alertService: AlertService,
              private tweetService: TweetService,
              private profileService: ProfileService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.dataUrl = this.meme.url;
  }
}
