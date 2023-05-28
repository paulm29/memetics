import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MemeticsClient } from "./memetics.client";
import { Meme } from "../model/meme";
import { SearchResult } from "../model/search.result";
import { Profile } from "../model/profile";
import { MemeSearchCriteria } from "../model/meme.search.criteria";

@Injectable()
export class MemeService {

  constructor(private memeticsClient: MemeticsClient) {
  }

  get(memeId: number): Observable<Meme> {
    return this.memeticsClient.memeGet(memeId);
  }

  getAll(): Observable<SearchResult> {
    const criteria = new MemeSearchCriteria();
    return this.memeticsClient.memeSearch(criteria);
  }

  getLiked(profileId: string) {
    return this.memeticsClient.memeGetLiked(profileId);
  }

  getUnprocessed(profileId: number) {
    return this.memeticsClient.memeGetUnprocessed(profileId);
  }

  memeSearch(criteria: MemeSearchCriteria): Observable<SearchResult> {
    return this.memeticsClient.memeSearch(criteria);
  }

  memeCount() {
    return this.memeticsClient.memeCount();
  }

  memeUpdate(meme: Meme) {
    return this.memeticsClient.memeUpdate(meme);
  }

  memeCreate(meme: Meme, profile: Profile): Observable<Meme> {
    meme.profile = profile;
    return this.memeticsClient.memeCreate(meme);
  }

  memeDelete(meme, deleteFromImgur) {
    return this.memeticsClient.memeDelete(meme.id, deleteFromImgur);
  }

  incrementUsageCount(meme: Meme) {
    return this.memeticsClient.memeIncrement(meme);
  }

  decrementUsageCount(meme: Meme) {
    return this.memeticsClient.memeDecrement(meme);
  }
}
