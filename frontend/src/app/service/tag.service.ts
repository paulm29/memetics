import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MemeticsClient } from "./memetics.client";
import { Tag } from "../model/tag";
import { TagStat } from "../model/tag.stat";
import { Profile } from "../model/profile";

@Injectable()
export class TagService {
  compareTagArrays(direction, tagArrayA: Tag[], tagArrayB: Tag[]) {
    const aString = this.tagObjectsToTagString(tagArrayA);
    const bString = this.tagObjectsToTagString(tagArrayB);

    if (aString > bString) {
      return direction * -1;
    } else if (bString < aString) {
      return direction * 1;
    }
  }

  constructor(private memeticsClient: MemeticsClient) {
  }

  get(tagId: string): Observable<Tag> {
    return this.memeticsClient.tagGet(tagId);
  }

  getAll(): Observable<Tag[]> {
    return this.memeticsClient.tagGetAll();
  }

  getTagStats(): Observable<TagStat[]> {
    return this.memeticsClient.tagStats();
  }

  chipsToTags(chips) {
    const tags = [];
    chips.forEach((chip) => {
      tags.push({name: chip});
    });
    return tags;
  }

  tagsToChips(tags) {
    const chips = [];
    tags.forEach((tag) => {
      chips.push(tag.name);
    });
    return chips;
  }

  tagStringToTags(tagString): Tag[] {
    const tags = tagString.split(",");
    const tagObjects = [];
    tags.forEach((tag) => {
      const tagObject = new Tag();
      tagObject.name = tag;
      tagObjects.push(tagObject);
    });
    return tagObjects;
  }

  tagsToHashtags(tags) {
    if (!tags) {
      return "";
    }

    let hashtags = "";
    tags.forEach((tag) => {
      hashtags = hashtags + "#" + tag.name + " ";
    });
    return hashtags;
  }

  tagObjectsToTagString(tagObjects: Tag[]): string {
    const names = tagObjects.map(chip => chip.name);
    return names.join();
  }

  getFirstTag(tags) {
    if (tags.length > 0) {
      return tags[0].name;
    }
  }

  getHashtagLink(hashtag: string, profileId: number) {
    return "profile/" + profileId + "/meme-search?tags=" + hashtag;
  }

  getHashtagRouterLink(hashtag, profileId): any[] {
    return ["profile", profileId, "meme-search?tags=" + hashtag];
  }

  tagsToString(tagsArray) {
    const names = tagsArray.map(tag => "#" + tag.name);
    return names.join(" ");
  }

  getUnusedTags(): Observable<Tag[]> {
    return this.memeticsClient.tagUnused();
  }

  tagDelete(tagId) {
    return this.memeticsClient.tagDelete(tagId);
  }

  tagUpdate(tag: Tag): Observable<Tag> {
    return this.memeticsClient.tagUpdate(tag);
  }

  tagCreate(tag: Tag): Observable<Tag> {
    return this.memeticsClient.tagCreate(tag);
  }
}
