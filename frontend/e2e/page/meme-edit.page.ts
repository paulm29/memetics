import { browser, by, element, protractor } from "protractor";
import { HeaderPartPage } from "./header-part.page";
import { elementById, elementByName } from "../util/ui-util";
import { enterTextInput } from "../util/form-util";
import { waitForElementToStopMoving } from "../util/wait-util";

const EC = protractor.ExpectedConditions;

export class MemeEditPage {
  header = new HeaderPartPage();

  getHeader() {
    return this.header;
  }

  get(profile, memeId) {
    browser.get("profile/" + profile.id + "/meme/" + memeId + "/edit");
    this.expectOn();
  }

  expectOn() {
    browser.wait(EC.urlContains("/edit"));
  }

  title(title) {
    enterTextInput(elementById("title"), title);
  }

  caption(caption) {
    enterTextInput(elementById("caption"), caption);
  }

  credits(credits) {
    enterTextInput(elementById("credits"), credits);
  }

  expectTitle(title) {
    expect(elementById("title").getAttribute("value")).toBe(title);
  }

  expectCaption(caption) {
    expect(elementById("caption").getAttribute("value")).toBe(caption);
  }

  expectCredits(credits) {
    expect(elementById("credits").getAttribute("value")).toBe(credits);
  }

  update() {
    elementByName("submit").click();
  }

  delete() {
    elementById("delete").click();
  }

  deleteConfirm() {
    waitForElementToStopMoving(element(by.css(".modal-body")));
    elementById("deleteConfirm").click();
  }
}
