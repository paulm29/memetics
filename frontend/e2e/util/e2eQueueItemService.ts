import { restClient } from "./rest.client";
import { Meme } from "../../src-old/app/model/meme";
import { QueueItem } from "../../src-old/app/model/queue.item";
import { Profile } from "../../src-old/app/model/profile";

async function create(profile: Profile, meme: Meme, content: string, hashtags: string = null) {
  const queueItem = new QueueItem();
  queueItem.meme = meme;
  queueItem.profile = profile;
  queueItem.content = content;
  queueItem.hashtags = hashtags;
  queueItem.posted = false;
  queueItem.textOnly = false;
  return restClient.post("/profiles/" + profile.id + "/queue", queueItem);
}

async function deleteAllQueues() {
  restClient.delete("/queue");
}

export const e2eQueueItemService = {create, deleteAllQueues};
