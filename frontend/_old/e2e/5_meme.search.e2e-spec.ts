import { MemeSearchPage } from "./page/meme-search.page";
import { MemeViewPage } from "./page/meme-view.page";
import { MemeData } from "./data/meme-data";
import { ProfileData } from "./data/profile-data";
import { login } from "./util/login-util";
import { e2eMemeService } from "./util/e2eMemeService";
import { expectFile } from "./util/file-export-util";


describe("Meme search journey", () => {
  const memeSearchPage = new MemeSearchPage();
  const memeViewPage = new MemeViewPage();
  const profile = ProfileData.existingAdminAccount();
  let meme;

  beforeAll(() => {
    login(ProfileData.existingAdminAccount());
  });

  it("should search by tags", async () => {
    meme = await e2eMemeService.create(MemeData.newMeme());
    memeSearchPage.get(profile);
    memeSearchPage.expectOn();

    memeSearchPage.search({tags: meme.tags[0].name});

    expect(memeSearchPage.resultCount()).toBeGreaterThan(0);

    expect(memeSearchPage.filterResultsByTitle(meme.title));
    expect(memeSearchPage.canPreviewMeme(meme)).toBe(true);
    expect(memeSearchPage.canViewMeme(meme)).toBe(true);
    expect(memeSearchPage.canEditMeme(meme)).toBe(true);
    expect(memeSearchPage.canTweetStandardAccountMeme(meme)).toBe(true);
    expect(memeSearchPage.canFacebookPostMeme(meme)).toBe(true);
  });

  it("should search by title", async () => {
    memeSearchPage.clear();

    memeSearchPage.search({title: meme.title});

    expect(memeSearchPage.resultCount()).toBe(1);
  });

  it("should search by nickname", async () => {
    memeSearchPage.clear();

    memeSearchPage.search({title: meme.nickname});

    expect(memeSearchPage.resultCount()).toBeGreaterThan(0);
  });

  it("should search by tag cloud", async () => {
    memeSearchPage.clear();

    memeSearchPage.tagCloud(meme.tags[0].name);

    memeSearchPage.expectOn();
    expect(memeSearchPage.resultCount()).toBeGreaterThan(0);
  });

  it("should preview from search", async () => {
    memeSearchPage.filterResultsByTitle(meme.title);

    memeSearchPage.preview(meme);

    expect(memeSearchPage.expectPreview()).toBe(true);
  });

  it("should view from search", async () => {
    memeSearchPage.view(meme);

    memeViewPage.expectOn();
  });

  it("should tweet from search", async () => {
    memeViewPage.back();
    memeSearchPage.filterResultsByTitle(meme.title);
    // browser.sleep(200);

    memeSearchPage.tweetTwitterStandard(meme);
  });

  it("should facebook from search", async () => {
    memeSearchPage.facebookPost(meme);
  });

  // it("should add to queue from search", async () => {
  //   memeSearchPage.addToQueue(meme);
  //
  //   memeSearchPage.inQueue(meme);
  // });
  //
  // it("should remove from queue from search", async () => {
  //   memeSearchPage.removeFromQueue(meme);
  //
  //   memeSearchPage.outOfQueue(meme);
  // });

  it("should export", async () => {
    // browser.sleep(11000);
    memeSearchPage.export();

    expectFile("meme_search_export.csv");
  });
});
