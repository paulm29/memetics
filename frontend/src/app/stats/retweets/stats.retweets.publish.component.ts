import { Component, Input, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../uiqc/alert/alert.service";
import { Profile } from "../../model/profile";
import { StatsService } from "../../service/stats.service";
import { DateUtilService } from "../../service/date.util.service";
import { TweetSearchCriteria } from "../../model/tweet.search.criteria";
import { TweetPost } from "../../model/wordpress/tweet-post";
import { PostData } from "../../model/wordpress/post-data";

@Component({
  selector: "app-stats-retweets-publish",
  templateUrl: "./stats.retweets.publish.component.html"
})
export class StatsRetweetsPublishComponent implements OnInit {
  @Input() profile: Profile;
  count: number;
  publishCount: number;
  loadingYesterday: boolean;
  loadingToday: boolean;
  loadingWeekly: boolean;
  newPostUrl: string;

  constructor(private route: ActivatedRoute, private alertService: AlertService, private router: Router, private statService: StatsService, private dateUtilService: DateUtilService) {
  }

  ngOnInit() {
  }

  publishRetweets() {
    this.count = 400;
    this.publishCount = 5;

    this.loadingYesterday = true;
    const criteria = new TweetSearchCriteria();
    criteria.startDate = this.dateUtilService.getYesterdayStart();
    criteria.endDate =  this.dateUtilService.getYesterdayEnd();
    criteria.count = this.count;
    console.log("criteria", criteria);

    const postData = new PostData();
    postData.title = "Top stories";
    postData.excerpt = "";
    postData.content = "";

    const tweetPost = new TweetPost();
    tweetPost.criteria = criteria;
    tweetPost.publishCount = this.publishCount;
    tweetPost.postData = postData;

    this.statService.statsRetweetsPublish(this.profile, tweetPost).subscribe((newPostId) => {
      console.log("newPostId", newPostId);
      this.newPostUrl = "https://aupolnews.com/?p=" + newPostId;
      this.loadingYesterday = false;
    });
  }

  publishRetweetsToday() {
    this.count = 400;
    this.publishCount = 5;

    this.loadingToday = true;
    const criteria = new TweetSearchCriteria();
    criteria.startDate = this.dateUtilService.getTodayStart();
    criteria.endDate = this.dateUtilService.getTodayEnd();
    criteria.count = this.count;
    console.log("criteria", criteria);

    const postData = new PostData();
    postData.title = "Top stories";
    postData.excerpt = "";
    postData.content = "";

    const tweetPost = new TweetPost();
    tweetPost.criteria = criteria;
    tweetPost.publishCount = this.publishCount;
    tweetPost.postData = postData;

    this.statService.statsRetweetsPublish(this.profile, tweetPost).subscribe((newPostId) => {
      console.log("newPostId", newPostId);
      this.newPostUrl = "https://aupolnews.com/?p=" + newPostId;
      this.loadingToday = false;
    });
  }

  publishRetweetsWeekly() {
    this.count = 700;
    this.publishCount = 10;

    this.loadingWeekly = true;
    const criteria = new TweetSearchCriteria();
    criteria.startDate = this.dateUtilService.getLastWeekStart();
    criteria.endDate =  this.dateUtilService.getLastWeekEnd();
    criteria.count = this.count;
    console.log("criteria", criteria);

    const postData = new PostData();
    postData.title = "Top stories this week";
    postData.excerpt = "";
    postData.content = "";

    const tweetPost = new TweetPost();
    tweetPost.criteria = criteria;
    tweetPost.publishCount = this.publishCount;
    tweetPost.postData = postData;

    this.statService.statsRetweetsPublish(this.profile, tweetPost).subscribe((newPostId) => {
      console.log("newPostId", newPostId);
      this.newPostUrl = "https://aupolnews.com/?p=649" + newPostId;
      this.loadingWeekly = false;
    });
  }

}
