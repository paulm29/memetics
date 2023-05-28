import { Profile } from "./profile";

export class Comment {
  id: number;
  commentText: string;
  createdDate: Date;
  memeId: number;
  profile: Profile;

  version: number;
}
