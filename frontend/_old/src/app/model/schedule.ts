import { Profile } from "./profile";

export class Schedule {
  profile: Profile;
  times: Date[] = [];
  days: string[] = [];

  version: number;
}
