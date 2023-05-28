import { forkJoin as observableForkJoin, Observable, of as observableOf } from "rxjs";

import { catchError, map } from "rxjs/operators";
import { Component, OnInit, ViewChild } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { Profile } from "../model/profile";
import { AlertService } from "../uiqc/alert/alert.service";
import { StatsService } from "../service/stats.service";
import { DateUtilService } from "../service/date.util.service";
import { NgForm } from "@angular/forms";
import { TweetService } from "../service/tweet.service";
import { OEmbedTweet } from "../model/oembed.tweet";

@Component({
  templateUrl: "./embed-tweet.component.html"
})
export class EmbedTweetComponent implements OnInit {
  profile: Profile;
  loading: boolean;
  code: string;
  stripPrefix = false;
  howMany = 10;
  title = "Embed tweet";

  @ViewChild("embedTweetForm") embedTweetForm: NgForm;

  constructor(private route: ActivatedRoute, private alertService: AlertService, private router: Router,
              private statService: StatsService, private dateUtilService: DateUtilService, private tweetService: TweetService) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];
  }

  canSubmit(): boolean {
    return this.embedTweetForm && this.embedTweetForm.form && this.embedTweetForm.form.valid && this.embedTweetForm.form.dirty;
  }

  submit() {
    this.loading = true;
    const statusIdsString = this.embedTweetForm.controls.statusIds.value;
    let statusIdsArray = statusIdsString.replace(new RegExp(/\r/, "g"), ""); // for Linux
    statusIdsArray = statusIdsString.split("\n");
    statusIdsArray = statusIdsArray.splice(0, this.howMany);
    console.log("statusIdsArray", statusIdsArray);

    this.getMultiple(statusIdsArray).subscribe((embeds: Array<OEmbedTweet>) => {
        console.log(embeds); // [Single, Single, Single];
        let html = "";
        embeds.forEach((embed) => {
          html += embed.html;
        });

        const regex = new RegExp("<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>", "gi");
        this.code = html.replace(regex, "");
      }
    );
    this.loading = false;
  }

  getMultiple(statusIds: string[]): Observable<Array<OEmbedTweet>> {
    const singleObservables = statusIds.map((singleUrl: string) => {
      console.log("singleUrl", singleUrl);
      let statusId;
      console.log("stripPrefix", this.stripPrefix);
      if (this.stripPrefix) {
        statusId = singleUrl.substr(37, singleUrl.length);
      } else {
        statusId = singleUrl;
      }
      console.log("getMultiple - statusId", statusId);
      return this.tweetService.oembedTweetGet(statusId).pipe(
        map(single => single as OEmbedTweet),
        catchError((error: any) => {
          console.error("Error loading Single, singleUrl: " + singleUrl, "Error: ", error);
          return observableOf(null); // In case error occurs, we need to return Observable, so the stream can continue
        }),);
    });

    return observableForkJoin(singleObservables);
  }
}
