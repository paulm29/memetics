import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AdminService } from "../../service/admin.service";
import { AlertService } from "../../uiqc/alert/alert.service";
import { TagService } from "../../service/tag.service";
import { Profile } from "../../model/profile";
import { LocalDataSource } from "ng2-smart-table";
import { ProfileService } from "../../service/profile.service";
import { CustomModalService } from "../../service/modal/custom-modal.service";
import { Meme } from "../../model/meme";
import { MemeService } from "../../service/meme.service";
import { Comment } from "../../model/comment";
import { QueueItem } from "../../model/queue.item";
import { Tag } from "../../model/tag";
import { Vote } from "../../model/vote";

@Component({
  templateUrl: "./admin.manage.memes.component.html"
})
export class AdminManageMemesComponent implements OnInit {
  memes: Meme[];
  source: LocalDataSource;
  settings: any;

  constructor(private router: Router,
              private adminService: AdminService,
              private alertService: AlertService,
              private tagService: TagService,
              private memeService: MemeService,
              private customModalService: CustomModalService) {
  }

  ngOnInit(): void {
    this.settings = this.initSettings();
    this.memesGet();
  }

  memesGet() {
    this.memeService.getAll().subscribe((response) => {
        this.memes = this.prepareForView(response.results);
        this.source = new LocalDataSource(this.memes);
      },
      () => this.alertService.defaultError());
  }

  prepareForView(memes: Meme[]) {
    memes.forEach(meme => {
      meme.tagString = this.tagService.tagObjectsToTagString(meme.tags);
    });
    return memes;
  }

  // caption: string;
  // credits: string;
  // comments: Comment[] = [];
  // currentMemeVote;
  // deleteLink: string;
  // duplicate: number;
  // id: number;
  // originalContent: boolean;
  // profile: Profile;
  // queueItem: QueueItem; // this being here doesn't seem right
  // url: string;
  // tags: Tag[] = [];
  // title: string;
  // usageCount: number;
  //
  // upvotes: number;
  // downvotes: number;
  // score: number;
  // votes: Vote[];
  //
  // // meme search
  // nickname: string;
  //
  // // upload only
  // file: string;

  initSettings() {
    return {
      add: {
        confirmCreate: true,
        mode: "inline"
      },
      edit: {
        confirmSave: true,
        mode: "inline"
      },
      delete: {
        confirmDelete: true,
        mode: "inline"
      },
      columns: {
        id: {
          title: "ID",
          filter: false
        },
        title: {
          title: "Title",
          filter: false
        },
        tagString: {
          title: "Tags",
          filter: false
        },
        usageCount: {
          title: "Usage count",
          filter: false
        },
        active: {
          title: "Active",
          filter: false
        }
      }
    };
  }

  onUserRowSelect(event) {
    console.log("onUserRowSelect", event);
  }

  onCreateConfirm(event) {
    console.log("onCreateConfirm", event);

    // const newProfile = Object.assign(new Profile(), event.newData);
    // newProfile.id = null;
    //
    // this.profileService.profileCreate(newProfile).subscribe((profile) => {
    //     const resolvedData = Object.assign(new Profile(), event.newData, profile.id);
    //     event.confirm.resolve(resolvedData);
    //   },
    //   () => this.alertService.defaultError());
  }

  onEditConfirm(event) {
    console.log("onEditConfirm", event);

    // this.profileService.profileUpdate(event.newData).subscribe((profile) => {
    //     event.confirm.resolve(event.newData);
    //   },
    //   () => this.alertService.defaultError());
  }

  onDeleteConfirm(event) {
    console.log("onDeleteConfirm", event);
    const meme = event.data;

    this.customModalService.confirm("Confirm delete? (Also will delete from imgur)", "Delete", "Cancel").subscribe((confirmed) => {
      if (confirmed) {
        this.memeService.memeDelete(meme, true).subscribe(
          () => {
            this.alertService.success("Meme deleted.");
          },
          () => this.alertService.defaultError()
        );
      }
    });
  }
}
