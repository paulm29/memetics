import {Component, OnInit} from "@angular/core";

import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../uiqc/alert/alert.service";
import {Profile} from "../../model/profile";
import {ProfileService} from "../../service/profile.service";

@Component({
  templateUrl: "./profile.edit.component.html"
})
export class ProfileEditComponent implements OnInit {
  title: string = "Edit profile";
  profile: Profile;
  ownProfile: boolean;
  loading: boolean;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private alertService: AlertService, private router: Router) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];

    if (!this.profileService.isOwnProfile(this.profile.id)) {
      this.alertService.warning("Not authorised to edit this profile");
      this.router.navigate(["profile", this.profile.id, "profile-view", this.profile.id]);
    }
    this.ownProfile = true;
  }

  submit() {
    this.update(this.profile);
  }

  updateCallback() {
    this.profileService.get(this.profile.id.toString()).subscribe((response) => {this.profile = response});
  }

  update(profile) {
    this.profileService.profileUpdate(profile).subscribe(
      () => {
        this.alertService.success("Meme has been updated successfully.");
        this.profileService.get(profile.id).subscribe(
          (response) => {
            this.profile = response;
            this.loading = false;
          },
          () => {
            this.alertService.defaultError();
            this.loading = false;
          });
      },
      () => {
        this.alertService.defaultError();
        this.loading = false;
      }
    );
  }
}
