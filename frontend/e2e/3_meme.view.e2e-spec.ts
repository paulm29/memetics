import { MemeSearchPage } from "./page/meme-search.page";
import { MemeViewPage } from "./page/meme-view.page";
import { MemeData } from "./data/meme-data";
import { ProfileData } from "./data/profile-data";
import { login } from "./util/login-util";
import { e2eMemeService } from "./util/e2eMemeService";


describe("Meme view journey", () => {
  const memeSearchPage = new MemeSearchPage();
  const memeViewPage = new MemeViewPage();
  let meme;

  beforeAll(() => {
    login(ProfileData.existingAdminAccount());
  });

  it("should view meme", async () => {
    meme = await e2eMemeService.create(MemeData.newMeme());
    console.log("meme", meme.id);

    memeViewPage.get(ProfileData.existingAdminAccount(), meme.id);

    memeViewPage.expectOn();
  });

  it("should share via facebook", async () => {
    memeViewPage.facebookPost();
  });

  it("should share via twitter", async () => {
    memeViewPage.tweetTwitterStandard();
  });

  it("should preview new window", async () => {
    memeViewPage.previewNewWindow();
  });

  it("should add to queue", async () => {
    memeViewPage.addToQueue();

    // TODO add expectation
  });

  it("should add comment", async () => {
    memeViewPage.addComment("test comment");

    memeViewPage.expectCommentCount(1);
  });
});
