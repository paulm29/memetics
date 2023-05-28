import { RegistrationPage } from "./page/registration.page";
import { MemeSearchPage } from "./page/meme-search.page";
import { MemeViewPage } from "./page/meme-view.page";
import { ErrorPage } from "./page/error.page";
import { MemeNewPage } from "./page/meme-new.page";
import { LoginPage } from "./page/login.page";
import { MemeEditPage } from "./page/meme-edit.page";
import { MemeData } from "./data/meme-data";
import { ProfileData } from "./data/profile-data";
import { HeaderPartPage } from "./page/header-part.page";
import { login } from "./util/login-util";
import { e2eMemeService } from "./util/e2eMemeService";
import { browser } from "protractor";
import { expectSuccess } from "./util/ui-util";


describe("Meme edit journey", () => {
  const registrationPage = new RegistrationPage();
  const loginPage = new LoginPage();
  const memeSearchPage = new MemeSearchPage();
  const memeViewPage = new MemeViewPage();
  const memeEditPage = new MemeEditPage();
  const errorPage = new ErrorPage();
  const memeNewPage = new MemeNewPage();
  const headerPage = new HeaderPartPage();
  let meme;

  beforeAll(() => {
    login(ProfileData.existingAdminAccount());
  });

  it("should edit meme", async () => {
    meme = await e2eMemeService.create(MemeData.newMeme());
    memeEditPage.get(ProfileData.existingAdminAccount(), meme.id);
    memeEditPage.expectOn();

    memeEditPage.title(meme.title + "_updated");
    memeEditPage.caption(meme.caption + "_updated");
    memeEditPage.credits(meme.credits + "_updated");

    memeEditPage.update();

    expectSuccess("Meme has been updated successfully.");
    memeEditPage.expectTitle(meme.title + "_updated");
    memeEditPage.expectCaption(meme.caption + "_updated");
    memeEditPage.expectCredits(meme.credits + "_updated");
  });

  it("should delete meme", async () => {
    memeEditPage.expectOn();

    memeEditPage.delete();
    memeEditPage.deleteConfirm();

    expectSuccess("Meme deleted.");
    memeSearchPage.expectOn();
  });
});
