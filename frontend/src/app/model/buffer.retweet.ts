export class BufferRetweet {
  // https://buffer.com/developers/api/updates
  // This parameter can be used to create a 'retweet' update. It will be silently ignored for any other profiles.
  // tweet_id (required) - the id of the tweet which is to be retweeted
  // comment (optional)
  tweetId: string;
  comment: string;
  top: boolean;

  constructor(tweetId: string, comment: string, top = false) {
    this.tweetId = tweetId;
    this.comment = comment;
    this.top = top;
  }
}
