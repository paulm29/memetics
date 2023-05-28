import { MemeViewPage } from "./page/meme-view.page";
import { MemeSearchPage } from "./page/meme-search.page";
import { LoginPage } from "./page/login.page";
import { loginTwitter } from "./util/login-util";
import { ProfileData } from "./data/profile-data";
import { QueuePage } from "./page/queue.page";
import { browser } from "protractor";
import { e2eMemeService } from "./util/e2eMemeService";
import { MemeData } from "./data/meme-data";
import { e2eQueueItemService } from "./util/e2eQueueItemService";

fdescribe("queue journey", () => {
  const loginPage = new LoginPage();
  const memeSearchPage = new MemeSearchPage();
  const memeViewPage = new MemeViewPage();
  const queuePage = new QueuePage();
  const twitterProfile = ProfileData.existingTwitterAccount();
  let meme;
  let queueItem;

  beforeAll(async () => {
    loginTwitter(twitterProfile);
    await e2eQueueItemService.deleteAllQueues();
  });

  it("should navigate to queue", () => {
    memeSearchPage.expectOn();

    queuePage.get(twitterProfile);
  });

  it("should add text only tweet", () => {
    queuePage.expectOn();

    queuePage.enterText("test");
    queuePage.addTweet();

    expect(queuePage.getTextTweetFirst()).toBe("test");
  });

  it("should edit text only tweet", () => {
    queuePage.expectOn();

    queuePage.editTweetFirst("test edit");
    queuePage.edit();

    expect(queuePage.getTextTweetFirst()).toBe("test edit");
  });

  it("should remove text only tweet", () => {
    queuePage.expectOn();

    queuePage.removeTextOnlyTweetFirst();

    expect(queuePage.expectTextTweetFirst("test edit")).toBe(false);
  });

  it("should remove meme tweet", async () => {
    meme = await e2eMemeService.create(MemeData.newMeme(twitterProfile));
    queueItem = await e2eQueueItemService.create(twitterProfile, meme, "content");
    queuePage.get(twitterProfile);
    queuePage.expectOn();

    queuePage.removeMemeTweet(queueItem);

    expect(queuePage.expectMeme(meme)).toBe(false);
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
