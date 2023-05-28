import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../uiqc/alert/alert.service";
import { Profile } from "../../model/profile";
import { TweetService } from "../../service/tweet.service";
import { DownloadStat } from "../../model/download.stat";

@Component({
  templateUrl: "./utility.download.liked.component.html"
})
export class DownloadLikedComponent implements OnInit {
  profile: Profile;
  title: string = "Download images form liked tweets";
  downloadStat: DownloadStat;
  loading: boolean;
  criteria: {
    twitterProfile: string,
    folder: string,
    pageSize: number,
    deleteTweet: boolean,
  };

  constructor(private route: ActivatedRoute, private alertService: AlertService, private router: Router, private tweetService: TweetService) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];

    this.criteria = {twitterProfile: null, folder: "c:/_pol/", pageSize: 50, deleteTweet: true};

    this.tweetService.twitterProfileGet().subscribe((response) => {
      console.log("response");
      console.log(response);
      // this.criteria.twitterProfile = response["twitterProfileName"];
      this.criteria.twitterProfile = response;
    }, () => {
      this.alertService.error("An error occurred retrieving your twitter profile.");
      this.criteria.twitterProfile = this.profile.username;
    });
  }

  submit() {
    this.loading = true;

    this.tweetService.tweetLikedDownload(this.criteria.twitterProfile, this.criteria.folder, this.criteria.pageSize, this.criteria.deleteTweet).subscribe(
      (response) => {
        this.alertService.success("Images from tweets downloaded successfully.");
        this.downloadStat = response;
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
