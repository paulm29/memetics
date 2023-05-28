import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MemeticsClient } from "./memetics.client";
import { Profile } from "../model/profile";
import { QueueItem } from "../model/queue.item";

@Injectable()
export class QueueService {

  constructor(private memeticsClient: MemeticsClient) {
  }

  queueGetForProfile(profile: Profile): Observable<QueueItem[]> {
    return this.memeticsClient.queueGetForProfile(profile);
  }

  addToQueue(meme, profile, content, hashtags): Observable<QueueItem> {
    return this.memeticsClient.queueCreate(meme, profile, content, hashtags);
  }

  addTextOnlyTweetToQueue(profile, content, hashtags): Observable<QueueItem> {
    return this.memeticsClient.queueItemCreateTextOnly(profile, content, hashtags);
  }

  updateQueueItem(queueItem: QueueItem) {
    return this.memeticsClient.queueUpdate(queueItem);
  }

  removeFromQueue(queueItem) {
    return this.memeticsClient.queueDelete(queueItem);
  }

}
