import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { Profile } from "../model/profile";
import { AlertService } from "../uiqc/alert/alert.service";
import { DateUtilService } from "../service/date.util.service";
import { Post } from "../model/wordpress/post";
import { WordpressService } from "../service/wordpress.service";
import { PostData } from "../model/wordpress/post-data";
import { ReferenceDataService } from "../service/reference.data.service";
import { ReferenceData } from "../model/reference-data";
import { Code } from "../model/code";


@Component({
  templateUrl: "./wordpress.component.html"
})
export class WordpressComponent implements OnInit {
  title = "Wordpress posts";
  profile: Profile;
  posts: Post[];
  newPost: PostData;
  loading: boolean;
  referenceData: ReferenceData;
  categories: Code[];

  constructor(private route: ActivatedRoute, private alertService: AlertService, private router: Router,
              private wordpressService: WordpressService, private dateUtilService: DateUtilService,
              private referenceDataService: ReferenceDataService) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];
    this.referenceData = this.referenceDataService.referenceData;
    this.categories = this.referenceData.wordpressCategories;
    this.newPost = new PostData();
    this.newPost.date = this.dateUtilService.formatDatetime(new Date());
  }

  getPosts(): void {
    console.log("getPosts()");
    this.loading = true;
    this.wordpressService.wordpressPostsGet().subscribe((response) => {
      console.log("response", response);
      this.posts = response;
      this.loading = false;
    });
  }

  submit() {
    this.loading = true;
    this.wordpressService.wordpressPostsCreate(this.newPost).subscribe((response) => {
      console.log("response", response);
      this.newPost = null;
      this.loading = false;
    });
    this.loading = false;
  }
}
