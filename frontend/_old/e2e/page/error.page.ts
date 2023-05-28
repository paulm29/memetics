import { browser, by, element, protractor } from "protractor";

const EC = protractor.ExpectedConditions;

export class ErrorPage {
  errorMessage = element(by.id("errorMessage"));
  signinLink = element(by.id("signinError"));

  expectOn() {
    browser.wait(EC.urlContains("/error"));
  }

  getErrorMessage() {
    return this.errorMessage.getText();
  }

  signin() {
    this.signinLink.click();
  }
}
