import {Component, OnInit} from "@angular/core";

import {ActivatedRoute} from "@angular/router";
import {Profile} from "../../model/profile";
import {TweetInfo} from "../../model/tweet.info";
import {StatsService} from "../../service/stats.service";
import {AlertService} from "../../uiqc/alert/alert.service";


@Component({
  templateUrl: "./tweets.memetics.component.html"
})
export class TweetsMemeticsComponent implements OnInit {
  title = "Tweets";
  profile: Profile;
  tweetInfos: TweetInfo[] = [];

  constructor(private route: ActivatedRoute, private statsService: StatsService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];

    this.statsService.tweetInfosGet(this.profile).subscribe((response) => {
      this.tweetInfos = response;
    }, () => {
      this.alertService.defaultError();
    });
  }
}
