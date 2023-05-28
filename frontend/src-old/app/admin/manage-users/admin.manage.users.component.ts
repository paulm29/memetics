import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AdminService } from "../../service/admin.service";
import { AlertService } from "../../uiqc/alert/alert.service";
import { TagService } from "../../service/tag.service";
import { Profile } from "../../model/profile";
import { LocalDataSource } from "ng2-smart-table";
import { ProfileService } from "../../service/profile.service";
import { CustomModalService } from "../../service/modal/custom-modal.service";

@Component({
  templateUrl: "./admin.manage.users.component.html"
})
export class AdminManageUsersComponent implements OnInit {
  profiles: Profile[];
  source: LocalDataSource;
  settings: any;

  constructor(private router: Router,
              private adminService: AdminService,
              private alertService: AlertService,
              private tagService: TagService,
              private profileService: ProfileService,
              private customModalService: CustomModalService) {
  }

  ngOnInit(): void {
    this.settings = this.initSettings();
    this.profilesGet();
  }

  profilesGet() {
    this.profileService.profilesGet().subscribe((response) => {
        this.profiles = response;
        this.source = new LocalDataSource(this.profiles);
      },
      () => this.alertService.defaultError());
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
        firstName: {
          title: "First name",
          filter: false
        },
        lastName: {
          title: "Last name",
          filter: false
        },
        nickname: {
          title: "Nickname",
          filter: false
        },
        password: {
          title: "Password",
          filter: false
        },
        email: {
          title: "Email",
          filter: false
        },
        role: {
          title: "Role",
          filter: false
        },
        socialMediaSignin: {
          title: "socialMediaSignin",
          filter: true
        },
        country: {
          title: "country",
          filter: true
        }
      }
    };
  }

  onUserRowSelect(event) {
    console.log("onUserRowSelect", event);
  }

  onCreateConfirm(event) {
    console.log("onCreateConfirm", event);

    const newProfile = Object.assign(new Profile(), event.newData);
    newProfile.id = null;

    this.profileService.profileCreate(newProfile).subscribe((profile) => {
        const resolvedData = Object.assign(new Profile(), event.newData, profile.id);
        event.confirm.resolve(resolvedData);
      },
      () => this.alertService.defaultError());
  }

  onEditConfirm(event) {
    console.log("onEditConfirm", event);

    this.profileService.profileUpdate(event.newData).subscribe((profile) => {
        event.confirm.resolve(event.newData);
      },
      () => this.alertService.defaultError());
  }

  onDeleteConfirm(event) {
    console.log("onDeleteConfirm", event);

    this.customModalService.confirm("Confirm delete?", "Delete", "Cancel").subscribe((confirmed) => {
      if (confirmed) {
        this.profileService.profileDelete(event.data).subscribe((response) => {
            console.log("response", response);
            event.confirm.resolve(event.source.data);
          },
          () => this.alertService.defaultError());
      }
    });
  }
}
