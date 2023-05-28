import { browser, by, element, protractor } from "protractor";
import { HeaderPartPage } from "./header-part.page";
import { elementById, elementByName, expectSuccess } from "../util/ui-util";
import { enterTextInput } from "../util/form-util";
import { waitForElementToStopMoving } from "../util/wait-util";
import { Meme } from "../../src/app/model/meme";
import { QueueItem } from "../../src/app/model/queue.item";

const EC = protractor.ExpectedConditions;

export class QueuePage {
  header = new HeaderPartPage();

  getHeader() {
    return this.header;
  }

  get(profile) {
    browser.get("profile/" + profile.id + "/queue");
    this.expectOn();
  }

  expectOn() {
    browser.wait(EC.urlContains("queue"));
  }

  enterText(tweet: string) {
    enterTextInput(elementById("tweet"), tweet);
  }

  async editTweetFirst(tweet: string) {
    await element.all(by.id("content")).first().clear();
    element.all(by.id("content")).first().sendKeys(tweet);
  }

  edit() {
    const xpath = "//button[contains(@name,'edit') and contains(@class,'textOnly')]";
    element.all(by.xpath(xpath)).first().click();
    expectSuccess("Queue item updated succesfully.");
  }

  removeTextOnlyTweetFirst() {
    const xpath = "//a[@name='removeTweet' and contains(@class,'textOnly')]";
    element.all(by.xpath(xpath)).first().click();
    expectSuccess("Queue item removed succesfully.");
  }

  removeMemeTweet(queueItem: QueueItem) {
    const xpath = "//a[contains(@id,'removeFromQueue" + queueItem.id + "')]";
    element(by.xpath(xpath)).click();
    expectSuccess("Queue item removed succesfully.");
  }

  addTweet() {
    elementById("addTweet").click();
    expectSuccess("Tweet added to queue succesfully.");
  }

  getTextTweetFirst() {
    const xpath = "//app-queue-item//textarea[@id='content' and contains(@class,'textOnly')]";
    return element.all(by.xpath(xpath)).first().getAttribute("value");
  }

  expectTextTweetFirst(tweet: string) {
    const xpath = "//app-queue-item//textarea[@id='content' and contains(@class,'textOnly') and contains(text(),'" + tweet + "')]";
    return element.all(by.xpath(xpath)).first().isPresent();
  }

  expectMeme(meme: Meme) {
    return element(by.id("memeId" + meme.id)).isPresent();
  }

  export() {
    const xpath = "//button[@id='exportCsv']";
    return element(by.xpath(xpath)).click();
  }
}
