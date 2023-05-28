import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../uiqc/alert/alert.service";
import { Profile } from "../../model/profile";
import { StatsService } from "../../service/stats.service";
import { StatsRetweets } from "../../model/stats.retweets";
import { DateUtilService } from "../../service/date.util.service";
import { Article } from "../../model/article";
import { OEmbedTweet } from "../../model/oembed.tweet";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  templateUrl: "./stats.newsletter.component.html"
})
export class StatsNewsletterComponent implements OnInit, AfterViewInit {
  title = "Create newsletter";
  profile: Profile;
  retweets: StatsRetweets;
  today: Date;
  startDate: Date = new Date();
  time = "";
  loading: boolean;
  loadingPublish: boolean;
  topTweets: OEmbedTweet[];
  articles: Article[];
  categories: string[] = ["Crime", "Federal politics", "Immigration and population", "Islam", "Economics", "World"];
  category: string;
  downloadJsonHref: SafeUrl;

  @ViewChildren("tweetList") tweetList: QueryList<any>;
  @ViewChildren("articleList") articleList: QueryList<any>;

  constructor(private route: ActivatedRoute, private alertService: AlertService, private router: Router, private statService: StatsService,
              private dateUtilService: DateUtilService, private sanitizer: DomSanitizer) {
  }

  generateDownloadJsonUri() {
    console.log("generateDownloadJsonUri");
    const theJSON = JSON.stringify(this.articles);
    console.log("theJSON", theJSON);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    console.log("this.downloadJsonHref", this.downloadJsonHref);
  }

  ngOnInit(): void {
    this.articles = [];
    this.profile = this.route.parent.snapshot.data["profile"];
    this.startDate = this.getDefaultStartDate();
    this.getRetweets(this.startDate);
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    this.tweetList.changes.subscribe(t => {
      this.ngForRendred();
    });
    this.articleList.changes.subscribe(t => {
      this.ngForRendred2();
    });
  }

  ngForRendred() {
    console.log("NgFor is Rendered");
    this.addTwitterWidget();
  }

  ngForRendred2() {
    console.log("NgFor2 is Rendered");
    this.addTwitterWidget();
  }

  addTwitterWidget() {
    // !function (d, s, id) {
    //   let js: any,
    //     fjs = d.getElementsByTagName(s)[0],
    //     p = "https";
    //   if (!d.getElementById(id)) {
    //     js = d.createElement(s);
    //     js.id = id;
    //     js.src = p + "://platform.twitter.com/widgets.js";
    //     fjs.parentNode.insertBefore(js, fjs);
    //   }
    // };
    // (document, "script", "twitter-wjs");
  }

  getRetweets(startDate: Date): void {
    this.loading = true;
    this.statService.statsRetweetEmbedsGet(this.profile, this.dateString(startDate)).subscribe((response) => {
      this.retweets = response;
      this.topTweets = this.retweets.embedTweets.map((embedTweet) => {
        const html = embedTweet.oembedTweet.html;
        const beforeScript = " ";
        const afterScript = "";
        return embedTweet.oembedTweet;
      });
      this.loading = false;
    });
  }

  dateString(date: Date): string {
    if (!this.time.length) {
      date.setHours(0, 0, 0, 0);
    } else {
      const hour: number = Number(this.time.substring(0, 2));
      const minute: number = Number(this.time.substring(3, 5));
      date.setHours(hour, minute, 0, 0);
    }
    return this.dateUtilService.formatDatetime(date);
  }

  getDefaultStartDate(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 20, 30);
  }

  submit() {
    this.loading = true;
    this.getRetweets(this.startDate);
  }

  addArticle(category: string, oembedTweet: OEmbedTweet) {
    const article: Article = new Article();
    article.oembedTweet = oembedTweet;
    article.category = category;
    this.articles.push(article);
  }
}
