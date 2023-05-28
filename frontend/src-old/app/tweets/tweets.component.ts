import {Component, OnInit} from "@angular/core";

import {ActivatedRoute, Router} from "@angular/router";
import {Profile} from "../model/profile";
import {StatsRetweets} from "../model/stats.retweets";
import {AlertService} from "../uiqc/alert/alert.service";
import {StatsService} from "../service/stats.service";
import {DateUtilService} from "../service/date.util.service";
import {StatsTweets} from "../model/stats.tweets";


@Component({
  templateUrl: "./tweets.component.html"
})
export class TweetsComponent implements OnInit {
  title: string = "Tweets";
  profile: Profile;
  tweets: StatsTweets;
  today: Date;
  startDate: Date = new Date();
  time: string = "";
  loading: boolean;
  maxRetweets = 999;
  maxLikes = 999;

  constructor(private route: ActivatedRoute, private alertService: AlertService, private router: Router, private statService: StatsService, private dateUtilService: DateUtilService) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];
    this.startDate = this.getDefaultStartDate();
    this.getTweets(this.startDate);
  }

  getTweets(startDate: Date): void {
    console.log("getTweets");
    // console.log("getRetweets");
    // console.log(startDate);
    this.loading = true;
    this.statService.tweetsGet(this.profile, this.dateString(startDate), this.maxRetweets, this.maxLikes).subscribe((response) => {
      console.log("");
      console.log("response", response);
      this.tweets = response;
      this.loading = false;
    });
  }

  dateString(date: Date): string {
    console.log("date", date);

    if (!this.time.length) {
      console.log("1");
      date.setHours(0,0,0,0);
      console.log("1 date", date);
    } else {
      console.log("2");

      const hour: number = Number(this.time.substring(0,2));
      const minute: number = Number(this.time.substring(3,5));
      console.log("this.time", this.time);
      console.log("hour", hour);
      console.log("minute", minute);
      date.setHours(hour, minute, 0, 0);
      console.log("2 date", date);
    }

    // console.log("this.dateUtilService.formatDatetime(date)", this.dateUtilService.formatDatetime(date));
    // console.log("date.toDateString()", date.toDateString());
    return this.dateUtilService.formatDatetime(date);
  }

  getDefaultStartDate(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
  }

  submit() {
    this.loading = true;
    this.getTweets(this.startDate);
  }
}
