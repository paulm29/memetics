import { ErrorPage } from "./page/error.page";
import { MemeNewPage } from "./page/meme-new.page";
import { MemeViewPage } from "./page/meme-view.page";
import { MemeSearchPage } from "./page/meme-search.page";
import { RegistrationPage } from "./page/registration.page";
import { LoginPage } from "./page/login.page";
import { MemeEditPage } from "./page/meme-edit.page";
import { loginTwitter } from "./util/login-util";
import { ProfileData } from "./data/profile-data";
import { browser } from "protractor";

describe("social registration journey", () => {
  const registrationPage = new RegistrationPage();
  const loginPage = new LoginPage();
  const memeSearchPage = new MemeSearchPage();
  const memeViewPage = new MemeViewPage();
  const memeEditPage = new MemeEditPage();
  const errorPage = new ErrorPage();
  const memeNewPage = new MemeNewPage();
  const twitterProfile = ProfileData.newTwitterAccount();

  beforeAll(() => {
    loginTwitter(twitterProfile);
  });

  it("should prepopulate registration using Twitter", () => {
    registrationPage.expectOn();
    expect(registrationPage.canRegister()).toBe(false);
    // browser.sleep(90000);

    registrationPage.expectFirstName(twitterProfile.firstName);
    registrationPage.expectNickname(twitterProfile.nickname);

    // registrationPage.enterProfileDetails(twitterProfile); // not completing registration as not able to re-run test as is if I do
    // expect(registrationPage.canRegister()).toBe(true);
  });

  // // TODO - need a testing account
  // xit("should initialise registration using Facebook", () => {
  //   memeSearchPage.getHeader().logout();
  //   loginPage.expectOn();
  //
  //   loginPage.signinFacebook();
  //   browser.ignoreSynchronization = true;
  //   var email = browser.driver.findElement(by.id("email"));
  //   email.clear().then(() => {
  //     email.sendKeys("mansplainer");
  //   });
  //   var password = browser.driver.findElement(by.id("pass"));
  //   password.clear().then(() => {
  //     password.sendKeys("tr0t5ky2");
  //   });
  //   browser.driver.findElement(by.id("loginbutton")).click();
  //   browser.ignoreSynchronization = false;
  //
  //   registrationPage.expectOn();
  // });
  //
  // xit("should register as Facebook user", () => {
  //   registrationPage.expectOn();
  //   expect(registrationPage.canRegister()).toBe(false);
  //
  //   var profile = new ProfileData();
  //   registrationPage.enterProfileDetails(profile.newFacebookProfile());
  //   expect(registrationPage.canRegister()).toBe(true);
  //   registrationPage.register();
  //
  //   memeSearchPage.expectOn();
  // });
  //
});
