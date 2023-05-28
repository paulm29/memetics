export class Tweet {
  id: string;
  text: string;
  createdAt: Date;
  fromUser: string;
  profileImageUrl: string;
  toUserId: number;
  inReplyToStatusId: number;
  inReplyToUserId: number;
  inReplyToScreenName: string;
  fromUserId: number;
  languageCode: string;
  source: string;
  retweetCount: number;
  retweeted: boolean;
  favorited: number;
  favoriteCount: number;
  // private Tweet retweetedStatus;
  // private Entities entities;
  // private TwitterProfile user;
  age?: number;
}
