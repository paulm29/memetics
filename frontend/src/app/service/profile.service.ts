import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MemeticsClient } from "./memetics.client";
import { Profile } from "../model/profile";
import { UserService } from "./user.service";
import { ProfileStats } from "../model/profile.stats";
import { ProfileSearchCriteria } from "../model/profile.search.criteria";

@Injectable()
export class ProfileService {

  constructor(private memeticsClient: MemeticsClient, private userService: UserService) {
  }

  get(profileId: string): Observable<Profile> {
    return this.memeticsClient.profileGet(profileId);
  }

  profileView(profileId: string): Observable<Profile> {
    return this.memeticsClient.profileGet(profileId);
  }

  profileCreate(profile: Profile): Observable<Profile> {
    return this.memeticsClient.profileCreate(profile);
  }

  profileUpdate(profile: Profile): Observable<Profile> {
    return this.memeticsClient.profileUpdate(profile);
  }

  profileDelete(profile: Profile) {
    return this.memeticsClient.profileDelete(profile.id);
  }

  isOwnProfile(profileId): boolean {
    return this.userService.user.id === Number(profileId);
  }

  isTwitterAccount(): boolean {
    return this.userService.user.socialMediaSignin === "TWITTER";
  }

  isFacebookAccount(): boolean {
    return this.userService.user.socialMediaSignin === "FACEBOOK";
  }

  isStandardAccount(): boolean {
    return this.userService.user.socialMediaSignin === "" || this.userService.user.socialMediaSignin === "NONE";
  }

  getProfileStats(profile: Profile): Observable<ProfileStats> {
    return this.memeticsClient.profileStats(profile);
  }

  search(criteria: ProfileSearchCriteria): Observable<Profile[]> {
    return this.memeticsClient.profileGetAll(criteria);
  }

  profilesGet(): Observable<Profile[]> {
    return this.memeticsClient.profileGetAll({});
  }
}
