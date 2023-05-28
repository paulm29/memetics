import { Injectable } from "@angular/core";
import { MemeticsClient } from "./memetics.client";
import { DownloadStat } from "../model/download.stat";
import { Observable } from "rxjs";
import { OEmbedTweet } from "../model/oembed.tweet";

@Injectable()
export class TweetService {

  constructor(private memeticsClient: MemeticsClient) {
  }

  tweetText(text) {
    return this.memeticsClient.tweetText(text);
  }

  tweetMeme(text, imageUrl, memeId, profileId) {
    return this.memeticsClient.tweetMeme(text, imageUrl, memeId, profileId);
  }

  twitterProfileGet() {
    return this.memeticsClient.twitterProfileGet();
  }

  tweetLikedDownload(profile, folder, pageSize, deleteTweet): Observable<DownloadStat> {
    return this.memeticsClient.tweetLikedDownload(profile, folder, pageSize, deleteTweet);
  }

  tweetLikedDelete(profile, pageSize): Observable<void> {
    return this.memeticsClient.tweetLikedDelete(profile, pageSize);
  }

  oembedTweetGet(statusId: string): Observable<OEmbedTweet> {
    console.log("service", statusId);
    return this.memeticsClient.oembedTweetGet(statusId);
  }

}
