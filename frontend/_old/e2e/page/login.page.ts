import { browser, by, element, protractor } from "protractor";

const EC = protractor.ExpectedConditions;

export class LoginPage {
  registrationLink = element(by.id("register-email"));
  signinStandardButton = element(by.id("signinStandard"));
  signinTwitterButton = element(by.id("signinTwitter"));
  signinFacebookButton = element(by.id("signinFacebook"));
  username = element(by.id("username"));
  password = element(by.id("password"));
  credentialsError = element(by.id("credentialsError"));

  get() {
    browser.get("login");
  }

  expectOn() {
    browser.wait(EC.urlContains("/login"));
  }

  createEmailAccount() {
    this.registrationLink.click();
  }

  loginEmail(profile) {
    this.username.clear().then(() => {
      this.username.sendKeys(profile.username);
    });
    this.password.clear().then(() => {
      this.password.sendKeys(profile.password);
      this.signinStandardButton.click();
    });
  }

  hasErrorMessage() {
    return this.credentialsError.isPresent();
  }

  signinTwitter() {
    this.signinTwitterButton.click();
  }

  signinFacebook() {
    this.signinFacebookButton.click();
  }
}
