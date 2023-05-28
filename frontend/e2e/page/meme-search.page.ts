import { browser, by, element, protractor } from "protractor";
import { HeaderPartPage } from "./header-part.page";
import { Meme } from "../../src-old/app/model/meme";
import { clickButtonAndCheckNewWindow, elementById, expectSuccess } from "../util/ui-util";
import { waitForElementToStopMoving } from "../util/wait-util";

const EC = protractor.ExpectedConditions;

export class MemeSearchPage {
  header = new HeaderPartPage();

  get(profile) {
    browser.get("profile/" + profile.id + "/meme-search");
    this.expectOn();
  }

  expectOn() {
    browser.wait(EC.urlContains("/meme-search"));
  }

  getHeader() {
    return this.header;
  }

  filterResultsByTitle(data: string) {
    const xpath = "//input[@placeholder='" + "Title" + "']";
    element(by.xpath(xpath)).sendKeys(data);
  }

  resultCount() {
    const xpath = "//ng2-smart-table//tbody//tr";
    return element.all(by.xpath(xpath)).count();
  }

  search(criteria: any) {
    if (criteria.tags) {
      elementById("tags").sendKeys(criteria.tags);
      elementById("tags").sendKeys(protractor.Key.ENTER);
    }
    if (criteria.title) {
      elementById("title").sendKeys(criteria.title);
    }
    if (criteria.nickname) {
      elementById("nickname").sendKeys(criteria.nickname);
    }
    elementById("search").click();
  }

  canEditMeme(meme: Meme) {
    const xpath = "//a[@id='edit" + meme.id + "']";
    return element(by.xpath(xpath)).isPresent();
  }

  canViewMeme(meme: Meme) {
    const xpath = "//a[@id='view" + meme.id + "']";
    return element(by.xpath(xpath)).isPresent();
  }

  canPreviewMeme(meme: Meme) {
    const xpath = "//span[contains(@id,'preview" + meme.id + "')]";
    console.log("meme", meme);
    console.log("canPreviewMeme", meme.title, xpath);
    return element(by.xpath(xpath)).isPresent();
  }

  canTweetStandardAccountMeme(meme: Meme) {
    const xpath = "//a[@id='tweetTwitterStandard" + meme.id + "']";
    return element(by.xpath(xpath)).isPresent();
  }

  canTweetTwitterAccountMeme(meme: Meme) {
    const xpath = "//a[@id='tweetTwitterAccount" + meme.id + "']";
    return element(by.xpath(xpath)).isPresent();
  }

  canFacebookPostMeme(meme: Meme) {
    const xpath = "//a[@id='facebookPost" + meme.id + "']";
    return element(by.xpath(xpath)).isPresent();
  }

  canAddToQueue(meme: Meme) {
    const xpath = "//a[@id='addToQueue" + meme.id + "']";
    return element(by.xpath(xpath)).isPresent();
  }

  tagCloud(tag: string) {
    const xpath = "//a[@id='tag_" + tag + "']";
    return element(by.xpath(xpath)).click();
  }

  export() {
    const xpath = "//button[@id='export']";
    return element(by.xpath(xpath)).click();
  }

  clear() {
    elementById("clear").click();
  }

  preview(meme: Meme) {
    elementById("preview" + meme.id).click();
  }

  view(meme: Meme) {
    elementById("view" + meme.id).click();
  }

  edit(meme: Meme) {
    elementById("edit" + meme.id).click();
  }

  expectPreview() {
    const popover = element(by.className("luiPopover"));
    waitForElementToStopMoving(popover);
    return popover.isPresent();
  }

  async tweetTwitterStandard(meme: Meme) {
    const buttonElement = element(by.id("tweetTwitterStandard" + meme.id));
    clickButtonAndCheckNewWindow(buttonElement, "twitter");
  }

  async facebookPost(meme: Meme) {
    const buttonElement = element(by.id("facebookPost" + meme.id));

    // browser.waitForAngularEnabled(false);
    // browser.ignoreSynchronization = true;
    clickButtonAndCheckNewWindow(buttonElement, "facebook");
  }

  async previewNewWindow(meme: Meme) {
    const buttonElement = element(by.name("previewNewWindow"));
    clickButtonAndCheckNewWindow(buttonElement, "imgur");
  }

  addToQueue(meme: Meme) {
    elementById("addToQueue" + meme.id).click();
    expectSuccess("Meme added to queue succesfully.");
  }

  removeFromQueue(meme: Meme) {
    elementById("removeFromQueue" + meme.id).click();
    expectSuccess("Queue item removed succesfully.");
  }

  inQueue(meme: Meme) {
    expect(elementById("removeFromQueue" + meme.id).isPresent()).toBe(true);
  }

  outOfQueue(meme: Meme) {
    expect(elementById("addToQueue" + meme.id).isPresent()).toBe(true);
  }
}
