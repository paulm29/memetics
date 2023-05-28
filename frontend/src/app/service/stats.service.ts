import { Injectable } from "@angular/core";
import { MemeticsClient } from "./memetics.client";
import { Observable } from "rxjs";
import { Profile } from "../model/profile";
import { StatsRetweets } from "../model/stats.retweets";
import { TweetInfo } from "../model/tweet.info";
import { StatsTweets } from "../model/stats.tweets";
import { TweetSearchCriteria } from "../model/tweet.search.criteria";
import { TweetPost } from "../model/wordpress/tweet-post";

@Injectable()
export class StatsService {

  constructor(private memeticsClient: MemeticsClient) {
  }

  statsRetweetsGet(profile: Profile, criteria: TweetSearchCriteria): Observable<StatsRetweets> {
    return this.memeticsClient.statsRetweetsGet(profile, criteria);
  }

  statsRetweetsPublish(profile: Profile, tweetPost: TweetPost): Observable<number> {
    return this.memeticsClient.statsRetweetsPublish(profile, tweetPost);
  }

  statsRetweetEmbedsGet(profile: Profile, startDate: string): Observable<StatsRetweets> {
    return this.memeticsClient.statsRetweetEmbedsGet(profile, startDate);
  }

  tweetsGet(profile: Profile, startDate: string, maxRetweets: number, maxLikes: number): Observable<StatsTweets> {
    return this.memeticsClient.tweetsGet(profile, startDate, maxRetweets, maxLikes);
  }

  tweetInfosGet(profile: Profile): Observable<TweetInfo[]> {
    return this.memeticsClient.tweetInfosGet(profile);
  }


}
