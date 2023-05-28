import { browser, by, element, protractor } from "protractor";
import { HeaderPartPage } from "./header-part.page";
import { clickButtonAndCheckNewWindow } from "../util/ui-util";

const EC = protractor.ExpectedConditions;

export class MemeViewPage {
  header = new HeaderPartPage();

  getHeader() {
    return this.header;
  }

  get(profile, memeId) {
    browser.get("profile/" + profile.id + "/meme/" + memeId + "/view");
    this.expectOn();
  }

  expectOn() {
    console.log("memeview - expecton");
    browser.wait(EC.urlContains("view"));
  }

  async facebookPost() {
    const buttonElement = element(by.name("facebookPost"));

    // browser.waitForAngularEnabled(false);
    // browser.ignoreSynchronization = true;
    clickButtonAndCheckNewWindow(buttonElement, "facebook");
  }

  async tweetTwitterStandard() {
    const buttonElement = element(by.name("tweetTwitterStandard"));
    clickButtonAndCheckNewWindow(buttonElement, "twitter");
  }

  async previewNewWindow() {
    const buttonElement = element(by.name("previewNewWindow"));
    clickButtonAndCheckNewWindow(buttonElement, "imgur");
  }

  addToQueue() {
    element(by.name("addToQueue")).click();
  }

  addComment(comment: string) {
    element(by.id("commentText")).sendKeys(comment);
    element(by.id("addComment")).click();
  }

  async expectCommentCount(count: number) {
    const cnt = await element(by.id("commentCount")).getText();
    console.log("cnt", cnt);
    expect(Number(cnt)).toBe(count);
  }

  back() {
    element(by.name("back")).click();
  }
}
