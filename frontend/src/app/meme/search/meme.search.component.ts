import { Component, OnInit, ViewChild } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../uiqc/alert/alert.service";
import { MemeService } from "../../service/meme.service";
import { TagService } from "../../service/tag.service";
import { QueueService } from "../../service/queue.service";
import { Profile } from "../../model/profile";
import { Meme } from "../../model/meme";
import { Tag } from "../../model/tag";
import { TagStat } from "../../model/tag.stat";
import { QueueItem } from "../../model/queue.item";
import { MemeSearchCriteria } from "../../model/meme.search.criteria";
import { Ng2SmartTableComponent } from "ng2-smart-table/ng2-smart-table.component";
import { TableTruncateNameComponent } from "../../common/table/table-truncate-name.component";
import { finalize } from "rxjs/operators";
import { MemeSearchTitleComponent } from "./title/meme-search-title.component";
import { MemeSearchQueueComponent } from "./queue/meme-search-queue.component";
import { MemeSearchTagsComponent } from "./tags/meme-search-tags.component";
import { MemeSearchActionsComponent } from "./actions/meme-search-actions.component";
import { ExportService } from "../../service/export.service";
import { utils } from "xlsx";
import { ProfileService } from "../../service/profile.service";

@Component({
  styleUrls: ["./meme.search.component.scss"],
  templateUrl: "./meme.search.component.html"
})
export class MemeSearchComponent implements OnInit {
  allTags: Tag[];
  criteria: MemeSearchCriteria;
  loading: boolean;
  memes: Meme[];
  profile: Profile;
  queue: QueueItem[] = [];
  selectedTags: Tag[] = [];
  settings: any;
  tagStats: TagStat[] = [];
  totalResultsCount: number;

  @ViewChild(Ng2SmartTableComponent)
  private tableComponent: Ng2SmartTableComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private memeService: MemeService,
              private alertService: AlertService,
              private tagService: TagService,
              private queueService: QueueService,
              private exportService: ExportService,
              private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];
    this.criteria = new MemeSearchCriteria();

    this.initSearch();

    this.getAllTags();
    this.getTagStats();

    this.settings = {
      attr: {"class": "table table-hover table-fixed"},
      columns: this.initColumns(),
      actions: {
        add: false,
        edit: false,
        delete: false
      }
    };

    this.queueService.queueGetForProfile(this.profile).subscribe((queueItems) => {
        this.queue = queueItems;
      },
      () => this.alertService.defaultError());

    this.search();
  }

  initSearch() {
    this.route.queryParams.subscribe((params) => {
      this.criteria = Object.assign(this.criteria, params);

      this.initMyMemes(params);
      this.initTags();
    });
  }

  initMyMemes(params) {
    const myMemesStorage = sessionStorage.getItem("myMemes");

    if (params.myMemes) {
      this.criteria.myMemes = params.myMemes === "true";
    } else if (myMemesStorage) {
      this.criteria.myMemes = myMemesStorage === "true";
    } else {
      this.criteria.myMemes = false;
    }
  }

  initTags() {
    if (this.criteria.tags && this.criteria.tags.length > 0) {
      this.selectedTags = this.tagService.tagStringToTags(this.criteria.tags);
    }
  }

  initColumns() {
    const that = this;
    let columns: any = {
      nickname: {
        title: "Nickname",
        type: "text",
        width: "160px",
        renderComponent: TableTruncateNameComponent,
      },
      title: {
        title: "Title",
        type: "custom",
        renderComponent: MemeSearchTitleComponent,
        onComponentInitFunction(instance) {
          instance.profile = that.profile;
        }
      },
      score: {
        title: "Rating",
        type: "text",
        width: "95px"
      },
      usageCount: {
        title: "Tweets",
        type: "text",
        width: "95px"
      },
      tagString: {
        title: "Tags",
        type: "custom",
        renderComponent: MemeSearchTagsComponent,
        onComponentInitFunction(instance) {
          instance.profile = that.profile;
        },
        filter: true,
        sort: true
        // valuePrepareFunction: (val) => {
        //   // console.log("val", val, this.tagService.tagObjectsToTagString(val));
        //   return this.tagService.tagObjectsToTagString(val);
        // },
        // // sort: true,
        // compareFunction: (direction: any, tagArrayA, tagArrayB) => {
        //   console.log("compare", direction, tagArrayA, tagArrayB);
        //   // return 0;
        //   return that.tagService.compareTagArrays(direction, tagArrayA, tagArrayB);
        // },
        // filterFunction: (val, search) => {
        //   console.log("filterFunction", val, search);
        //   if (!val) {
        //     return false;
        //   }
        //   return this.tagService.tagObjectsToTagString(val).includes(search);
        // }
      },
      actions: {
        title: "Actions",
        type: "custom",
        filter: false,
        sort: false,
        width: "120px",
        renderComponent: MemeSearchActionsComponent,
        onComponentInitFunction(instance) {
          instance.profile = that.profile;
        }
      }
    };

    if (this.profileService.isTwitterAccount()) {
      const queue = {
        queue: {
          title: "Queue",
          type: "custom",
          filter: false,
          sort: false,
          width: "60px",
          renderComponent: MemeSearchQueueComponent,
          onComponentInitFunction(instance) {
            instance.profile = that.profile;
            instance.queue = that.queue;
            instance.queueChanged.subscribe(() => {
                console.log("refresh");
                // that.tableComponent.source.refresh();
              }
            );
          }
        }
      };
      columns = Object.assign({}, columns, queue);
    }
    return columns;
  }

  getAllTags() {
    this.tagService.getAll().subscribe((response) => {
      this.allTags = response;
    }, () => this.alertService.defaultError());
  }

  getTagStats() {
    this.tagService.getTagStats().subscribe((response) => {
      response.forEach((stat) => {
        stat.link = this.tagService.getHashtagLink(stat.text, this.profile.id);
      });
      this.tagStats = response;
    }, () => this.alertService.defaultError());
  }

  defaultCriteria() {
    this.criteria.myMemes = false;
    this.criteria.title = "";
    this.criteria.nickname = "";
    this.criteria.tags = "";
    this.memes = [];
  }

  clear() {
    this.defaultCriteria();
    this.updateUrlWithSearchCriteria();
  }

  search() {
    this.loading = true;
    this.memes = [];

    this.updateUrlWithSearchCriteria();
    this.memeService.memeSearch(this.criteria).pipe(finalize(() => {
      this.loading = false;
    })).subscribe(
      (results) => {
        this.loading = false;
        this.memes = results.results;
        this.prepareForView(this.memes);
        this.totalResultsCount = results.totalResultsCount;
      });
  }

  prepareForView(memes: Meme[]) {
    memes.forEach((meme) => {
      meme.nickname = meme.profile.nickname;
      meme.tagString = this.tagService.tagObjectsToTagString(meme.tags);
    });
  }

  updateUrlWithSearchCriteria() {
    this.criteria.profileId = this.profile.id.toString();
    if (this.selectedTags.length > 0) {
      this.criteria.tags = this.tagService.tagObjectsToTagString(this.selectedTags);
    } else {
      this.criteria.tags = null;
    }
    if (this.criteria.myMemes) {
      this.criteria.nickname = "";
    }
    this.router.navigate([], {relativeTo: this.route, queryParams: this.criteria});
  }

  export() {
    this.tableComponent.source.getFilteredAndSorted().then((results) => {
      console.log("results", results);

      const workSheet = utils.json_to_sheet(results);
      const csv = [];
      csv.push(utils.sheet_to_csv(workSheet));

      this.exportService.exportAsCsv(csv, "meme_search_export.csv");
    });
  }

  setMyMemes(myMemes) {
    this.criteria.myMemes = myMemes;
    sessionStorage.setItem("myMemes", myMemes.toString());
  }
}

