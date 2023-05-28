import { Component, Input, OnInit } from "@angular/core";
import { Meme } from "../../model/meme";
import { Tag } from "../../model/tag";
import { AlertService } from "../../uiqc/alert/alert.service";
import { TagService } from "../../service/tag.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Profile } from "../../model/profile";
import { MemeService } from "../../service/meme.service";
import { MemeSearchCriteria } from "../../model/meme.search.criteria";

@Component({
  templateUrl: "./meme.slideshow.component.html"
})
export class MemeSlideshowComponent implements OnInit {
  @Input() allTags: Tag[];
  @Input() meme: Meme;
  selectedTags: Tag[] = [];
  tagStats = [];
  profile: Profile;
  criteria: MemeSearchCriteria;
  carousel = {
    interval: 0,
    noWrap: false,
    active: 0,
    slides: [],
    showIndicators: false
  };
  memes: Meme[];
  imageLoading: boolean;
  searchLoading: boolean;
  previewImage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private memeService: MemeService,
              private alertService: AlertService,
              private tagService: TagService) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];
    this.criteria = new MemeSearchCriteria();

    this.route.queryParams.subscribe((params) => {
      this.criteria = Object.assign(this.criteria, params);

      if (this.criteria.tags) {
        this.selectedTags = this.tagService.tagStringToTags(this.criteria.tags);
      }
    });

    this.getAllTags();
    this.search();
  }

  getAllTags() {
    this.tagService.getAll().subscribe((response) => {
        this.allTags = response;
      },
      this.alertService.defaultError);
  }

  nextSlide() {
    this.carousel.active = this.carousel.active + 1;
  }

  previousSlide() {
    this.carousel.active = this.carousel.active - 1;
  }

  getPreviewImage(slideNumber) {
    this.imageLoading = true;

    console.log("getPreviewImage", this.carousel.slides[slideNumber]);
    // this.previewImage = "https://i.imgur.com/dgs0kUP.jpg";
    const slide = this.carousel.slides[slideNumber];
    if (slide) {
      this.previewImage = slide.image;
    } else {
      console.log("no slide");
    }

    //
    // const image = new Image();
    //
    // image.addEventListener("load", () => {
    //   console.log("addEventListener");
    //   this.previewImage = url;
    // });
    // image.src = url;

    // console.log("slide", slide);
    // const reader = new FileReader();
    //
    // reader.onload = (e: any) => {
    //   console.log("onload");
    //   this.previewImage = e.target.result;
    // }
    //
    // reader.readAsDataURL(slide.image);
  }

  imageLoaded() {
    // console.log("imageLoaded");
    this.imageLoading = false;
  }

  defaultCriteria() {
    this.criteria.myMemes = true;
    // this.criteria.tags = "";
    this.selectedTags = [];
    this.memes = [];
  }

  clear() {
    this.defaultCriteria();
    this.updateUrlWithSearchCriteria();
  }

  search() {
    this.searchLoading = true;
    this.memes = [];
    this.carousel.slides = [];

    this.updateUrlWithSearchCriteria();
    this.memeService.memeSearch(this.criteria).subscribe(
      (response) => {
        this.searchLoading = false;
        this.memes = response.results;

        if (this.memes.length > 0) {
          this.memes.forEach((meme, index) => {
            this.carousel.slides.push({
              image: meme.url,
              text: meme.title,
              id: index,
              meme: meme
            });
          });
        }
      },
      () => {
        this.searchLoading = false;
      }
    );
  }

  updateUrlWithSearchCriteria() {
    this.criteria.profileId = this.profile.id.toString();
    if (this.selectedTags.length > 0) {
      console.log("a", this.selectedTags);
      this.criteria.tags = this.tagService.tagObjectsToTagString(this.selectedTags);
    } else {
      console.log("b");
      this.criteria.tags = null;
    }
    this.router.navigate([], {relativeTo: this.route, queryParams: this.criteria});
  }
}
