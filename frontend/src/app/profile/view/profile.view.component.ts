import {Component, OnInit} from "@angular/core";

import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../uiqc/alert/alert.service";
import {Profile} from "../../model/profile";
import {ProfileService} from "../../service/profile.service";
import {ProfileStats} from "../../model/profile.stats";

@Component({
  templateUrl: "./profile.view.component.html"
})
export class ProfileViewComponent implements OnInit {
  title:string = "View profile";
  profile: Profile;
  profileView: Profile;
  ownProfile: boolean;
  profileViewId: string;
  stats: ProfileStats;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private alertService: AlertService, private router: Router) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];
    this.profileViewId = this.route.snapshot.params["profileViewId"];

    // console.log("profile");
    // console.log(this.profile);
    // console.log("profileViewId");
    // console.log(this.profileViewId);
    //
    // console.log("this.route");
    // console.log(this.route);

    this.profileService.profileView(this.profileViewId).subscribe((response) => {
      // console.log("************");
      //   console.log(response);
        this.profileView = response;
        this.ownProfile = this.profileService.isOwnProfile(this.profileViewId);
        this.getProfileStats();
      },
      () => {
        this.alertService.error("Profile does not exist");
        this.router.navigate(["profile", this.profile.id, "meme-search"]);
      }
    );
  }

  updateCallback() {
    this.profileService.get(this.profile.id.toString()).subscribe((response) => {
      this.profile = response;
    });
  }

  getProfileStats() {
    this.profileService.getProfileStats(this.profileView).subscribe((response) => {
        this.stats = response;
      },
      this.alertService.defaultError
    );
  }
}
