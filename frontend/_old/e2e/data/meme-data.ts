import * as faker from "faker/locale/en_AU";
import { Meme } from "../../src/app/model/meme";
import { browser } from "protractor";
import { ProfileData } from "./profile-data";
import { Tag } from "../../src/app/model/tag";
import { Profile } from "../../src/app/model/profile";

export class MemeData {

  static newMeme(profile: Profile = ProfileData.existingAdminAccount()): Meme {
    const meme = new Meme();

    meme.title = faker.name.lastName();
    // meme.file = "c:/_/test.jpg";
    meme.caption = "test caption";
    meme.credits = "test credits";
    meme.originalContent = true;
    meme.url = "https://i.imgur.com/dgs0kUP.jpg";
    // meme.url = browser.params.testImagePath + "test.jpg";
    meme.profile = profile;

    const tagA = new Tag();
    tagA.id = 1;
    tagA.name = "a";
    meme.tags = [tagA];

    return meme;
  }
}
