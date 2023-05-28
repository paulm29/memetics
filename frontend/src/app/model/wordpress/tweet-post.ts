import { PostData } from "./post-data";
import { TweetSearchCriteria } from "../tweet.search.criteria";

export class TweetPost {
  postData: PostData;
  publishCount: number;
  criteria: TweetSearchCriteria;
}
