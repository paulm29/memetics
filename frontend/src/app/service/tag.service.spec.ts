import { async, inject, TestBed } from "@angular/core/testing";
import { DateUtilService } from "./date.util.service";
import { DatePipe } from "@angular/common";
import {TagService} from "./tag.service";
import {MemeticsClient} from "./memetics.client";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe("TagService", () => {
  let tagService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        TagService,
        MemeticsClient,
        HttpClient,
        HttpHandler
      ]
    });
  }));

  beforeEach(inject([TagService], (_tagService_: TagService) => {
    tagService = _tagService_;
  }));

  it("should get hashtag link", function() {

      expect(tagService.getHashtagLink("hashtag", 1)).toBe("profile/1/meme-search?tags=hashtag");
  });

  it("should get hashtag routerLink", function() {

    expect(tagService.getHashtagLink("hashtag", 1)).toBe("profile/1/meme-search?tags=hashtag");
  });

});
