import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AdminService } from "../../service/admin.service";
import { AlertService } from "../../uiqc/alert/alert.service";
import { TagService } from "../../service/tag.service";
import { TagStat } from "../../model/tag.stat";
import { Tag } from "../../model/tag";
import { Profile } from "../../model/profile";
import { LocalDataSource } from "ng2-smart-table";
import { CustomModalService } from "../../service/modal/custom-modal.service";

@Component({
  templateUrl: "./admin.manage.tags.component.html"
})
export class AdminManageTagsComponent implements OnInit {
  allTags: Tag[];
  unusedTags: Tag[];
  tagStats: TagStat[];
  source: LocalDataSource;
  settings: any;

  constructor(private router: Router,
              private adminService: AdminService,
              private alertService: AlertService,
              private tagService: TagService,
              private customModalService: CustomModalService) {
  }

  ngOnInit(): void {
    this.settings = this.initSettings();
    this.getUnusedTags();
    this.getTagStats();
    this.getAllTags();
  }

  getTagStats() {
    this.tagService.getTagStats().subscribe((tagStats) => {
        this.tagStats = tagStats;
      },
      () => {
        this.alertService.error("An error occurred.");
      }
    );
  }

  getAllTags() {
    this.tagService.getAll().subscribe((result) => {
      console.log("tagService.getAll()", result);
      this.allTags = result;
      this.source = new LocalDataSource(this.allTags);
    });
  }

  getUnusedTags() {
    this.tagService.getUnusedTags().subscribe(result => {
      this.unusedTags = result;
    });
  }

  deleteTag(tagId) {
    this.tagService.tagDelete(tagId).subscribe(() => {
        this.getUnusedTags();
      },
      () => {
        this.alertService.error("An error occurred.");
      });
  }

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
        name: {
          title: "Name",
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

    const newTag = Object.assign(new Tag(), event.newData);
    newTag.id = null;

    this.tagService.tagCreate(newTag).subscribe((tag) => {
        const resolvedData = Object.assign(new Tag(), event.newData, tag.id);
        event.confirm.resolve(resolvedData);
      },
      () => this.alertService.defaultError());
  }

  onEditConfirm(event) {
    console.log("onEditConfirm", event);

    this.tagService.tagUpdate(event.newData).subscribe((tag) => {
        event.confirm.resolve(event.newData);
      },
      () => this.alertService.defaultError());
  }

  onDeleteConfirm(event) {
    console.log("onDeleteConfirm", event);

    this.customModalService.confirm("Confirm delete?", "Delete", "Cancel").subscribe((confirmed) => {
      if (confirmed) {
        this.tagService.tagDelete(event.data.id).subscribe((response) => {
            console.log("response", response);
            event.confirm.resolve(event.source.data);
          },
          () => this.alertService.defaultError());
      }
    });
  }
}
