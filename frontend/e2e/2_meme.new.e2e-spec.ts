import { MemeViewPage } from "./page/meme-view.page";
import { MemeNewPage } from "./page/meme-new.page";
import { browser } from "protractor";
import { MemeData } from "./data/meme-data";
import { HeaderPartPage } from "./page/header-part.page";
import { login } from "./util/login-util";
import { ProfileData } from "./data/profile-data";
import { expectInputText } from "./util/form-util";


describe("Meme new journey", () => {
  const memeViewPage = new MemeViewPage();
  const memeNewPage = new MemeNewPage();
  const headerPage = new HeaderPartPage();

  beforeAll(function () {
    login(ProfileData.existingAdminAccount());
  });

  it("should create new meme", () => {
    headerPage.memesMenu();
    headerPage.menu("Create new meme");
    memeNewPage.expectOn();
    expect(memeNewPage.canCreate()).toBe(false);

    memeNewPage.enterMemeDetails(MemeData.newMeme());
    memeNewPage.enterTag("a");
    memeNewPage.enterFile(browser.params.testImagePath + "test.jpg");
    browser.sleep(200);
    expect(memeNewPage.canCreate()).toBe(true);
    memeNewPage.create();

    memeViewPage.expectOn();
  });

  it("should clear form", () => {
    headerPage.memesMenu();
    headerPage.menu("Create new meme");
    memeNewPage.expectOn();

    memeNewPage.enterMemeDetails(MemeData.newMeme());
    memeNewPage.clear();

    expectInputText("title", "");
    expectInputText("caption", "");
    expectInputText("credits", "");
  });
});
