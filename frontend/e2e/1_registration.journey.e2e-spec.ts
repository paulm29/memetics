import { browser } from "protractor";
import { ErrorPage } from "./page/error.page";
import { MemeNewPage } from "./page/meme-new.page";
import { MemeViewPage } from "./page/meme-view.page";
import { MemeSearchPage } from "./page/meme-search.page";
import { RegistrationPage } from "./page/registration.page";
import { LoginPage } from "./page/login.page";
import { MemeEditPage } from "./page/meme-edit.page";
import { ProfileData } from "./data/profile-data";

describe("Registration journey", () => {
  const registrationPage = new RegistrationPage();
  const loginPage = new LoginPage();
  const memeSearchPage = new MemeSearchPage();
  const memeViewPage = new MemeViewPage();
  const memeEditPage = new MemeEditPage();
  const errorPage = new ErrorPage();
  const memeNewPage = new MemeNewPage();

  beforeAll(() => {
  });

  it("unauthenticated user is redirected to login page", () => {
    browser.get("");

    loginPage.expectOn();
  });

  it("should navigate to standard registration", () => {
    loginPage.expectOn();

    loginPage.createEmailAccount();

    registrationPage.expectOn();
  });

  it("should cancel register standard account", () => {
    registrationPage.expectOn();

    registrationPage.cancel();

    loginPage.expectOn();
  });

  it("should get duplicate email error", () => {
    loginPage.expectOn();
    loginPage.createEmailAccount();
    registrationPage.expectOn();

    const profile = ProfileData.existingAdminAccount();
    registrationPage.enterProfileDetails(profile);

    registrationPage.hasError("Email is already taken.");
    expect(registrationPage.canRegister()).toBe(false);
  });

  it("should get duplicate nickname error", () => {
    registrationPage.cancel();
    loginPage.expectOn();
    loginPage.createEmailAccount();
    registrationPage.expectOn();

    const profile = ProfileData.existingAdminAccount();
    profile.email = "original";
    registrationPage.enterProfileDetails(profile);

    registrationPage.hasError("Nickname is already taken.");
    expect(registrationPage.canRegister()).toBe(false);
  });

  it("should get duplicate nickname error", () => {
    registrationPage.cancel();
    loginPage.expectOn();
    loginPage.createEmailAccount();
    registrationPage.expectOn();

    const profile = ProfileData.emailAccount();
    profile.password = "password";
    profile.passwordVerification = "different password";
    registrationPage.enterProfileDetails(profile);

    registrationPage.hasError("Passwords do not match");
    expect(registrationPage.canRegister()).toBe(false);
  });

  it("should register standard account", () => {
    registrationPage.cancel();
    loginPage.expectOn();
    loginPage.createEmailAccount();
    registrationPage.expectOn();
    expect(registrationPage.canRegister()).toBe(false);

    const profile = ProfileData.emailAccount();
    registrationPage.enterProfileDetails(profile);
    registrationPage.register();

    memeSearchPage.expectOn();
  });

  it("should log out", () => {
    memeSearchPage.getHeader().logout();

    loginPage.expectOn();
  });

  it("should not login with incorrect password", () => {
    loginPage.expectOn();

    const wrongPassword = Object.assign({}, ProfileData.existingAdminAccount());
    wrongPassword.password = "wrong";
    loginPage.loginEmail(wrongPassword);

    loginPage.hasErrorMessage();
  });

  it("should log in", () => {
    loginPage.expectOn();

    loginPage.loginEmail(ProfileData.existingAdminAccount());

    memeSearchPage.expectOn();
  });

  it("should not view pages not belonging to profile (redirect to login then search)", () => {
    memeSearchPage.expectOn();

    browser.get("profile/" + 666 + "/meme-search");

    memeSearchPage.expectOn();
  });

  it("should redirect to desired page after login", () => {
    memeSearchPage.getHeader().logout();
    loginPage.expectOn();

    // http://localhost:8080/memetics/profile/14/meme-new
    browser.get("profile/" + ProfileData.existingAdminAccount().id + "/meme-new");
    loginPage.expectOn();
    loginPage.loginEmail(ProfileData.existingAdminAccount());

    memeNewPage.expectOn();
  });

  it("user should be redirected to current page when session times out and user tries to perform action.", () => {
    // Simulate user session timeout and remain on page.
    browser.driver.manage().deleteAllCookies();
    browser.get("profile/" + ProfileData.existingAdminAccount().id + "/meme-new");

    loginPage.expectOn();
    loginPage.get(); // set up for next test, so that login functions works correctly
  });
});
