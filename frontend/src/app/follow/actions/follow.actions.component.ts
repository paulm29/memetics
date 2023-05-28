import { Component, Input, OnInit } from "@angular/core";
import { AlertService } from "../../uiqc/alert/alert.service";
import { Router } from "@angular/router";
import { Profile } from "../../model/profile";
import { FollowService } from "../../service/follow.service";

@Component({
  selector: "mm-follow-actions",
  templateUrl: "./follow.actions.component.html"
})
export class FollowActionsComponent implements OnInit {
  @Input() profile: Profile;
  @Input() otherProfile: Profile;
  @Input() updateCallback: Function;

  constructor(private router: Router, private alertService: AlertService, private followService: FollowService) {
  }

  ngOnInit(): void {
  }

  isFollowing(profile, otherProfile) {
    return this.followService.isFollowing(profile, otherProfile);
  }

  follow() {
    this.followService.follow(this.profile, this.otherProfile).subscribe(
      () => {
        this.alertService.success("Followed " + this.otherProfile.nickname);
        this.updateCallback();
      },
      this.alertService.defaultError);
  }

  unfollow() {
    const follow = this.followService.isFollowing(this.profile, this.otherProfile);

    this.followService.unfollow(this.profile, follow).subscribe(
      () => {
        this.alertService.success("Unfollowed " + this.otherProfile.nickname);
        this.updateCallback();
      },
      this.alertService.defaultError);
  }
}
