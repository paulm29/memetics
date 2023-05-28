import {Tweet} from "./tweet";
import {EmbedTweet} from "./embed.tweet";

export class StatsRetweets {
  tweets: Tweet[] = [];
  embedTweets: EmbedTweet[] = [];
  mostPopularList: Tweet[] = [];
  mostPopularEmbedList: EmbedTweet[] = [];
}
