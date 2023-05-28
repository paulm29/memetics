import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../uiqc/alert/alert.service";
import { Profile } from "../../model/profile";
import { StatsService } from "../../service/stats.service";
import { StatsRetweets } from "../../model/stats.retweets";
import { DateUtilService } from "../../service/date.util.service";
import { TweetLinkColumnComponent } from "./tweet-link-column.component";
import { TweetTotalColumnComponent } from "./tweet-total-column.component";
import { LocalDataSource } from "ng2-smart-table";
import { Tweet } from "../../model/tweet";
import { TweetSearchCriteria } from "../../model/tweet.search.criteria";
import * as moment from "moment";
import { TweetTextColumnComponent } from "./tweet-text-column.component";

@Component({
  templateUrl: "./stats.retweets.component.html"
})
export class StatsRetweetsComponent implements OnInit {
  title = "Retweets";
  profile: Profile;
  retweets: StatsRetweets;
  today: Date;
  startDate: Date = new Date();
  startTime = "";
  endDate: Date = new Date();
  endTime = "";
  count = 200;
  loading: boolean;
  settings: any;
  source: LocalDataSource;

  notRetweeted = true;
  minimumAgeHours = 4;

  constructor(private route: ActivatedRoute, private alertService: AlertService, private router: Router, private statService: StatsService, private dateUtilService: DateUtilService) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];
    this.startDate = this.getDefaultStartDate();
    this.startTime = this.getTimeADayAgo();
    this.endTime = this.getTimeNowMinusMinimum();
    // this.getRetweets(this.startDate, this.startTime, this.endDate, this.endTime);
  }

  initSetup(tweets: Tweet[]) {
    this.source = new LocalDataSource(tweets);
    this.settings = {
      columns: this.initColumns(),
      hasPaging: true,
      pager: {display: true, perPage: 25},
      actions: {
        add: false,
        edit: false,
        "delete": false
      },
      attr: {"class": "table table-hover"}
    };
    this.source.setSort([{field: "retweetCount", direction: "desc"}]); // , { field: 'createdAt', direction: 'desc' }
  }

  getRetweets(startDate: Date, startTime: string, endDate: Date, endTime: string): void {
    this.loading = true;
    const criteria = new TweetSearchCriteria();
    criteria.startDate = this.dateString(startDate, startTime);
    criteria.endDate = this.dateString(endDate, endTime);
    criteria.count = this.count;
    criteria.notRetweeted = this.notRetweeted;

    this.statService.statsRetweetsGet(this.profile, criteria).subscribe((response) => {
      this.retweets = response;
      this.prepareForView();
      this.initSetup(this.retweets.mostPopularList);
      this.loading = false;
    });
  }

  prepareForView() {
    this.retweets.mostPopularList = this.retweets.mostPopularList.map((retweet) => {
      const created = moment(new Date(retweet.createdAt));
      const now = moment(new Date());
      retweet.age = now.diff(created, "hours");
      return retweet;
    });
  }

  getTimeADayAgo() {
    const now = moment(new Date());
    now.subtract(1, "days");
    return now.format("HHmm");
  }

  getTimeNowMinusMinimum() {
    const now = moment(new Date());
    now.subtract(this.minimumAgeHours, "hours");
    return now.format("HHmm");
  }

  dateString(date: Date, time: string): string {
    const today = new Date();
    if (!time.length) {
      date.setHours(today.getHours(), today.getMinutes(), 0, 0);
    } else {
      const hour: number = Number(time.substring(0, 2));
      const minute: number = Number(time.substring(2, 4));
      date.setHours(hour, minute, 0, 0);
    }
    return this.dateUtilService.formatDatetime(date);
  }

  getDefaultStartDate(): Date {
    const today = new Date();
    // return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 20, 30);
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, today.getHours(), today.getMinutes());
  }

  submit() {
    this.loading = true;
    this.getRetweets(this.startDate, this.startTime, this.endDate, this.endTime);
  }

  // id: string;
  // text: string;
  // createdAt: Date;
  // fromUser: string;
  // profileImageUrl: string;
  // toUserId: number;
  // inReplyToStatusId: number;
  // inReplyToUserId: number;
  // inReplyToScreenName: string;
  // fromUserId: number;
  // languageCode: string;
  // source: string;
  // retweetCount: number;
  // retweeted: boolean;
  // favorited: number;
  // favoriteCount: number;
  initColumns() {
    const that = this;
    const columnConfig = {
      id: {
        title: "ID",
        editable: false,
        filter: false,
        width: "5%",
        type: "custom",
        renderComponent: TweetLinkColumnComponent,
        onComponentInitFunction() {
          // instance.provider = that.provider;
        }
      },
      text: {
        title: "text",
        editable: false,
        filter: true,
        width: "60%",
        sort: false,
        type: "custom",
        renderComponent: TweetTextColumnComponent,
        onComponentInitFunction(instance) {
          // instance.tweet_id = that.provider;
        }
      },
      retweetCount: {
        title: "RTs (min)",
        editable: false,
        type: "text",
        width: "5%",
        sort: true,
        sortDirection: "desc",
        filterFunction(cell?: any, search?: string): boolean {
          return search === "" || cell >= search;
        }
      },
      favoriteCount: {
        title: "Likes (min)",
        editable: false,
        type: "text",
        width: "5%",
        sort: true,
        filterFunction(cell?: any, search?: string): boolean {
          return search === "" || cell >= search;
        }
      },
      total: {
        title: "Total (min)",
        editable: false,
        width: "5%",
        type: "custom",
        sort: true,
        renderComponent: TweetTotalColumnComponent,
        onComponentInitFunction(instance) {
          // instance.provider = that.provider;
        },
        filterFunction(cell?: any, search?: string): boolean {
          return search === "" || cell >= search;
        }
      },
      retweeted: {
        title: "Retweeted",
        editable: false,
        type: "text",
        width: "5%",
        sort: false,
        filter: {
          type: "list",
          config: {
            list: [{value: false, title: "F"}, {value: true, title: "T"}],
          }
        }
      },
      createdAt: {
        title: "Sent",
        editable: false,
        filter: false,
        type: "text",
        width: "10%",
        sort: false,
        valuePrepareFunction: (val) => {
          return this.dateUtilService.format(val, "dd/MM HH:mm");
        }
      },
      age: {
        title: "Age (max)",
        editable: true,
        filterFunction(cell?: any, search?: string): boolean {
          return search === "" || cell <= search;
        },
        width: "5%",
        type: "number",
        sort: false,
        // renderComponent: TweetAgeColumnComponent,
        // onComponentInitFunction(instance) {
        //   // instance.provider = that.provider;
        // }
      }
    };
    return columnConfig;
  }
}
