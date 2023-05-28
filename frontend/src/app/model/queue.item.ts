import { Meme } from "./meme";
import { Profile } from "./profile";

export class QueueItem {
  id: number;
  meme: Meme;
  content: string;
  hashtags: string;
  profile: Profile;
  posted: boolean;
  textOnly: boolean;
  version: number;
}
