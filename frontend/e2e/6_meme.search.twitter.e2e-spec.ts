import { MemeSearchPage } from "./page/meme-search.page";
import { MemeViewPage } from "./page/meme-view.page";
import { MemeData } from "./data/meme-data";
import { ProfileData } from "./data/profile-data";
import { loginTwitter } from "./util/login-util";
import { e2eMemeService } from "./util/e2eMemeService";


describe("Twitter - Meme search journey", () => {
  const memeSearchPage = new MemeSearchPage();
  const memeViewPage = new MemeViewPage();
  const profile = ProfileData.existingTwitterAccount();
  let meme;

  beforeAll(() => {
    memeSearchPage.getHeader().logout();
    loginTwitter(ProfileData.existingTwitterAccount());
  });

  it("should search by title", async () => {
    meme = await e2eMemeService.create(MemeData.newMeme());
    memeSearchPage.get(profile);
    memeSearchPage.expectOn();

    memeSearchPage.search({title: meme.title});

    expect(memeSearchPage.resultCount()).toBeGreaterThan(0);
    expect(memeSearchPage.canPreviewMeme(meme)).toBe(true);
    expect(memeSearchPage.canViewMeme(meme)).toBe(true);
    expect(memeSearchPage.canEditMeme(meme)).toBe(true);
    expect(memeSearchPage.canTweetTwitterAccountMeme(meme)).toBe(true);
    expect(memeSearchPage.canFacebookPostMeme(meme)).toBe(true);
  });

  it("should tweet from search", async () => {
    memeSearchPage.filterResultsByTitle(meme.title);

    memeSearchPage.tweetTwitterStandard(meme);
  });

  it("should facebook from search", async () => {
    memeSearchPage.facebookPost(meme);
  });

  it("should add to queue from search", async () => {
    memeSearchPage.addToQueue(meme);

    memeSearchPage.inQueue(meme);
  });

  it("should remove from queue from search", async () => {
    memeSearchPage.removeFromQueue(meme);

    memeSearchPage.outOfQueue(meme);
  });
});
