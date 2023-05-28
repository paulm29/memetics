import { QueueItem } from "./queue.item";
import { Tag } from "./tag";
import { Profile } from "./profile";
import { Comment } from "./comment";
import { Vote } from "./vote";

export class Meme {
  caption: string;
  credits: string;
  comments: Comment[] = [];
  currentMemeVote;
  deleteLink: string;
  duplicate: number;
  id: number;
  originalContent: boolean;
  profile: Profile;
  queueItem: QueueItem; // this being here doesn't seem right
  url: string;
  tags: Tag[] = [];
  title: string;
  usageCount: number;

  upvotes: number;
  downvotes: number;
  score: number;
  votes: Vote[];

  // meme search
  nickname: string;

  // upload only
  file: string;

  active: boolean;

  tagString: string;

  version: number;
}
