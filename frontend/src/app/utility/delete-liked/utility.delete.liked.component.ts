import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../uiqc/alert/alert.service";
import { Profile } from "../../model/profile";
import { TweetService } from "../../service/tweet.service";

@Component({
  templateUrl: "./utility.delete.liked.component.html"
})
export class DeleteLikedComponent implements OnInit {
  profile: Profile;
  loading: boolean;
  criteria: {
    twitterProfile: string,
    pageSize: number
  };

  constructor(private route: ActivatedRoute, private alertService: AlertService, private router: Router, private tweetService: TweetService) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];

    this.criteria = {twitterProfile: null, pageSize: 50};

    this.tweetService.twitterProfileGet().subscribe((response) => {
      console.log("response");
      console.log(response);
      // this.criteria.twitterProfile = response["twitterProfileName"];
      this.criteria.twitterProfile = response;
    }, (response) => {
      console.log("response", response);
      this.alertService.error("An error occurred retrieving your twitter profile.");
      this.criteria.twitterProfile = this.profile.username;
    });
  }

  submit() {
    this.loading = true;

    this.tweetService.tweetLikedDelete(this.criteria.twitterProfile, this.criteria.pageSize).subscribe(
      (response) => {
        this.alertService.success("Images from tweets deleted successfully.");
        this.loading = false;
      },
      () => {
        this.alertService.defaultError();
        this.loading = false;
      }
    );
  }

  clear() {
    this.criteria = null;
  }
}
