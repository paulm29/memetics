import { Injectable } from "@angular/core";
import { MemeticsClient } from "./memetics.client";
import { Observable } from "rxjs";
import { Vote } from "../model/vote";
import { Meme } from "../model/meme";
import { Profile } from "../model/profile";

@Injectable()
export class VoteService {

  constructor(private memeticsClient: MemeticsClient) {
  }

  voteUpdate(vote: Vote) {
    return this.memeticsClient.voteUpdate(vote);
  }

  voteCreate(meme, profile, score): Observable<Vote> {
    return this.memeticsClient.voteCreate(meme.id, profile.id, score);
  }

  getCurrentMemeVote(meme: Meme, profile: Profile): Vote {
    return meme.votes.find((v) => v.profileId === profile.id);
  }

  getCurrentMemeTotalVote(meme): number {
    return meme.votes.reduce((vote, memo) => memo + vote.score);
  }
}
