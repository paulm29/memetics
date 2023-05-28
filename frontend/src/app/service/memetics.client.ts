import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Profile } from "../model/profile";
import { QueueItem } from "../model/queue.item";
import { StatsRetweets } from "../model/stats.retweets";
import { TweetInfo } from "../model/tweet.info";
import { DownloadStat } from "../model/download.stat";
import { MemeSearchCriteria } from "../model/meme.search.criteria";
import { StatsTweets } from "../model/stats.tweets";
import { OEmbedTweet } from "../model/oembed.tweet";
import { Tag } from "../model/tag";
import { TagStat } from "../model/tag.stat";
import { ProfileStats } from "../model/profile.stats";
import { Meme } from "../model/meme";
import { SearchResult } from "../model/search.result";
import { TweetSearchCriteria } from "../model/tweet.search.criteria";
import { ProfileSearchCriteria } from "../model/profile.search.criteria";
import { Post } from "../model/wordpress/post";
import { PostData } from "../model/wordpress/post-data";
import { TweetPost } from "../model/wordpress/tweet-post";
import { ApplicationConfig } from "../model/application.config";
import { ReferenceData } from "../model/reference-data";
import { BufferUpdate } from "../model/buffer.update";
import { BufferRetweet } from "../model/buffer.retweet";
import { Comment } from "../model/comment";
import { Vote } from "../model/vote";

@Injectable()
export class MemeticsClient {

  constructor(private http: HttpClient) {
  }

  public static toHttpParams(obj): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(obj).forEach(function (key) {
      const val = obj[key];
      if (val !== null && val !== undefined) {
        httpParams = httpParams.append(key, obj[key]);
      }
    });
    return httpParams;
  }

  applicationConfigGet(): Observable<ApplicationConfig> {
    return this.http.get<ApplicationConfig>("rest/application-config");
  }

  commentCreate(comment: Comment) {
    return this.http.post("rest/memes/" + comment.memeId + "/comments", comment);
  }

  commentDelete(commentId, memeId) {
    return this.http.delete("rest/memes/" + memeId + "/comments/" + commentId);
  }

  commentsGet(memeId) {
    return this.http.get("rest/memes/" + memeId + "/comments");
  }

  commentsGetForProfile(profileId) {
    return this.http.get("rest/memes/comments?profileId=" + profileId);
  }

  commentUpdate(commentId, memeId, profile, commentText) {
    const commentRequest = {
      id: commentId,
      memeId: memeId,
      profile: profile,
      commentText: commentText
    };
    return this.http.put("rest/memes/" + memeId + "/comments/" + commentId, commentRequest);
  }

  favouriteHashtagCreate(profile, hashtag) {
    const hashtagFavourite = {
      profile: profile,
      hashtag: hashtag
    };
    return this.http.post("rest/profiles/" + profile.id + "/hashtag-favourites", hashtagFavourite);
  }

  favouriteHashtagDelete(profile, favouriteHashtagId) {
    return this.http.delete("rest/profiles/" + profile.id + "/hashtag-favourites/" + favouriteHashtagId);
  }

  followCreate(profile, follow) {
    return this.http.post("rest/profiles/" + profile.id + "/follows", follow);
  }

  followDelete(profile, follow) {
    return this.http.delete("rest/profiles/" + profile.id + "/follows/" + follow.id);
  }

  memeGet(memeId: number): Observable<Meme> {
    return this.http.get<Meme>("rest/memes/" + memeId);
  }

  memeCount() {
    return this.http.get("rest/memes/count");
  }

  memeUpdate(meme) {
    return this.http.put("rest/memes/" + meme.id, meme);
  }

  memeSearch(criteria: MemeSearchCriteria): Observable<SearchResult> {
    return this.http.get<SearchResult>("rest/memes", {params: MemeticsClient.toHttpParams(criteria)});
  }

  memeGetLiked(profileId: string) {
    const httpParams = new HttpParams().append("profileId", profileId);
    return this.http.get("rest/memes/liked", {params: httpParams});
  }

  memeGetUnprocessed(profileId) {
    const httpParams = new HttpParams().append("profileId", profileId);
    return this.http.get("rest/memes/unprocessed", {params: httpParams});
  }

  memeCreate(meme): Observable<Meme> {
    return this.http.post<Meme>("rest/memes", meme);
  }

  memeDelete(memeId, deleteFromImgur: string) {
    const httpParams = new HttpParams().append("deleteFromImgur", deleteFromImgur);
    return this.http.delete("rest/memes/" + memeId, {params: httpParams});
  }

  memeIncrement(meme) {
    return this.http.put(`rest/memes/${meme.id}/increment-usage`, meme);
  }

  memeDecrement(meme) {
    return this.http.put(`rest/memes/${meme.id}/decrement-usage`, meme);
  }

  profileGet(profileId: string): Observable<Profile> {
    return this.http.get<Profile>("rest/profiles/" + profileId);
  }

  profileGetAll(criteria: ProfileSearchCriteria): Observable<Profile[]> {
    return this.http.get<Profile[]>("rest/profiles", {params: MemeticsClient.toHttpParams(criteria)});
  }

  registrationGetAll(criteria: ProfileSearchCriteria): Observable<Profile[]> {
    return this.http.get<Profile[]>("rest/registration", {params: MemeticsClient.toHttpParams(criteria)});
  }

  profileCreate(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>("rest/profiles", profile);
  }

  profileUpdate(profile): Observable<Profile> {
    return this.http.put<Profile>("rest/profiles/" + profile.id, profile);
  }

  profileDelete(profileId: number) {
    return this.http.delete("rest/profiles/" + profileId);
  }

  profileStats(profile: Profile): Observable<ProfileStats> {
    return this.http.get<ProfileStats>(`rest/profiles/${profile.id}/stats`);
  }

  queueCreate(meme, profile, content, hashtags): Observable<QueueItem> {
    const queueItem = {
      meme: meme,
      profile: profile,
      content: content,
      hashtags: hashtags
    };
    return this.http.post<QueueItem>("rest/profiles/" + profile.id + "/queue", queueItem);
  }

  queueItemCreateTextOnly(profile, content, hashtags): Observable<QueueItem> {
    const queueItem = {
      profile: profile,
      content: content,
      hashtags: hashtags,
      textOnly: true
    };
    return this.http.post<QueueItem>("rest/profiles/" + profile.id + "/queue", queueItem);
  }

  queueGetForProfile(profile: Profile): Observable<QueueItem[]> {
    return this.http.get<QueueItem[]>("rest/profiles/" + profile.id + "/queue");
  }

  queueDelete(queueItem) {
    return this.http.delete("rest/profiles/" + queueItem.profile.id + "/queue/" + queueItem.id);
  }

  queueUpdate(queueItem: QueueItem) {
    return this.http.put("rest/profiles/" + queueItem.profile.id + "/queue/" + queueItem.id, queueItem);
  }

  scheduleCreate(schedule) {
    return this.http.post("rest/profiles/" + schedule.profile.id + "/schedule", schedule);
  }

  scheduleGet(profile) {
    return this.http.get("rest/profiles/" + profile.id + "/schedule");
  }

  scheduleUpdate(schedule) {
    return this.http.put("rest/profiles/" + schedule.profile.id + "/schedule/" + schedule.id, schedule);
  }

  tagGet(tagId): Observable<Tag> {
    return this.http.get<Tag>("rest/tags/" + tagId);
  }

  tagCreate(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>("rest/tags", tag);
  }

  tagUpdate(tag: Tag): Observable<Tag> {
    return this.http.put<Tag>("rest/tags/" + tag.id, tag);
  }

  tagGetAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>("rest/tags");
  }

  tagDelete(tagId) {
    return this.http.delete("rest/tags/" + tagId);
  }

  tagStats(): Observable<TagStat[]> {
    return this.http.get<TagStat[]>("rest/tags/stats");
  }

  tagStatsAggregated() {
    return this.http.get("rest/tags/stats-aggregated");
  }

  tagUnused(): Observable<Tag[]> {
    return this.http.get<Tag[]>("rest/tags/unused");
  }

  tweetText(tweet) {
    return this.http.post("tweets/text", tweet);
  }

  tweetMeme(text, imageUrl, memeId, profileId) {
    const memeTweet = {
      text: text,
      imageUrl: imageUrl,
      memeId: memeId,
      profileId: profileId
    };
    return this.http.post("tweets/meme", memeTweet);
  }

  tweetLikedDownload(profile, folder, pageSize, deleteTweet) {
    const url = "tweets/liked" + "?profile=" + profile + "&folder=" + folder + "&pageSize=" + pageSize + "&deleteTweet=" + deleteTweet;
    return this.http.get<DownloadStat>(url);
  }

  tweetLikedDelete(profile: string, pageSize: string): Observable<void> {
    const url = "tweets/liked-delete" + "?profile=" + profile + "&pageSize=" + pageSize;
    return this.http.get<void>(url);
  }

  twitterProfileGet() {
    // const headers = new HttpHeaders();
    // headers.append("responseType", "text");
    // const options = {headers};
    // const options: { responseType: "text" };
    // const httpOptions = { ... responseType: 'text' as 'text' };

    // const headers = new HttpHeaders({
    //   "Content-Type": "application/x-www-form-urlencoded",
    // });

    // const responseType = {responseType: "text"};

    // return this.http.get("tweets/profile-name");
    return this.http.get("tweets/profile-name", {responseType: "text"});
  }

  voteCreate(memeId, profileId, score): Observable<Vote> {
    const vote = {
      memeId: memeId,
      profileId: profileId,
      score: score
    };
    return this.http.post<Vote>("rest/votes", vote);
  }

  voteUpdate(vote: Vote) {
    return this.http.put("rest/votes/" + vote.id, vote);
  }

  statsRetweetsGet(profile: Profile, criteria: TweetSearchCriteria): Observable<StatsRetweets> {
    const params = MemeticsClient.toHttpParams(criteria);
    return this.http.get<StatsRetweets>(`rest/profiles/${profile.id}/stats-retweets`, {params: params});
  }

  statsRetweetsPublish(profile: Profile, tweetPost: TweetPost): Observable<number> {
    return this.http.post<number>(`rest/profiles/${profile.id}/stats-retweets-publish`, tweetPost);
  }

  statsRetweetEmbedsGet(profile: Profile, startDate: string): Observable<StatsRetweets> {
    const httpParams = new HttpParams().append("startDate", startDate);
    return this.http.get<StatsRetweets>(`rest/profiles/${profile.id}/stats-retweets-embed`, {params: httpParams});
  }

  tweetsGet(profile: Profile, startDate: string, maxRetweets: number, maxLikes: number): Observable<StatsTweets> {
    const httpParams = new HttpParams().append("startDate", startDate).append("maxRetweets", maxRetweets.toString()).append("maxLikes", maxLikes.toString());
    return this.http.get<StatsTweets>(`rest/profiles/${profile.id}/stats-tweets`, {params: httpParams});
  }

  tweetInfosGet(profile: Profile): Observable<TweetInfo[]> {
    return this.http.get<TweetInfo[]>(`rest/profiles/${profile.id}/stats-tweets-memetics`);
  }

  oembedTweetGet(statusId: String): Observable<OEmbedTweet> {
    return this.http.get<OEmbedTweet>(`rest/oembed-tweet/${statusId}`);
  }

  wordpressPostCreate(post: PostData): Observable<Post> {
    return this.http.post<Post>(`rest/posts`, post);
  }

  wordpressPostsGet(): Observable<Post[]> {
    return this.http.get<Post[]>(`rest/posts`);
  }

  referenceData(): Observable<ReferenceData> {
    return this.http.get<ReferenceData>("rest/reference-data");
  }

  bufferRetweetCreate(bufferRetweet: BufferRetweet): Observable<BufferUpdate[]> {
    return this.http.post<BufferUpdate[]>(`rest/buffer-retweet`, bufferRetweet);
  }

  bufferUpdateCreate(bufferUpdate: BufferUpdate): Observable<BufferUpdate[]> {
    return this.http.post<BufferUpdate[]>(`rest/buffer-update`, bufferUpdate);
  }
}
