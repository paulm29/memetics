import { browser, by, element, protractor } from "protractor";
import { HeaderPartPage } from "./header-part.page";
import { enterCheckbox, enterTextInputs } from "../util/form-util";

const EC = protractor.ExpectedConditions;

export class MemeNewPage {
  header = new HeaderPartPage();
  createButton = element(by.name("submit"));
  clearButton = element(by.name("clear"));
  viewButton = element(by.name("viewLearner"));     // should be hidden
  deleteButton = element(by.id("deleteLearner"));
  originalContent = element(by.id("originalContent"));
  url = element(by.id("url"));
  file = element(by.id("file"));

  textInputs = {
    title: element(by.id("title")),
    credits: element(by.id("credits")),
    caption: element(by.id("caption"))
  };


  clear() {
    this.clearButton.click();
  }

  enterMemeDetails(meme) {
    enterTextInputs(this.textInputs, meme);
    enterCheckbox(this.originalContent, true);
  }

  enterTag(tag) {
    const tags = element(by.xpath("//input[@id='tags']"));
    tags.sendKeys(tag);
    tags.sendKeys(protractor.Key.ENTER);
  }

  enterFile(file) {
    element(by.id("file")).sendKeys(file);
    // browser.wait(EC.presenceOf(this.uploading()), 15000);
    // browser.wait(EC.visibilityOf(this.uploading()));
  }

  uploading() {
    // const xpath = "//div[contains(text(),'uploading...')]";
    const xpath = "//input[contains(text(),'https')]";
    return element(by.xpath(xpath));
  }

  getHeader() {
    return this.header;
  }

  get(profileId) {
    browser.get("profile/" + profileId + "/meme-new");
    this.expectOn();
  }

  expectOn() {
    browser.wait(EC.urlContains("/meme-new"));
    expect(this.viewButton.isPresent()).toBe(false);
    expect(this.deleteButton.isPresent()).toBe(false);
  }

  canCreate() {
    return this.createButton.isEnabled();
  }

  create() {
    // browser.wait(EC.invisibilityOf(this.uploading()));

    const xpath = "//button[contains(text(),'Create')]";
    const createButton = element(by.xpath(xpath));
    // browser.wait(EC.elementToBeClickable(createButton));

    createButton.click();
  }
}
