import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../../service/profile.service";
import {AlertService} from "../../uiqc/alert/alert.service";
import {HashtagFavouriteService} from "../../service/hashtag.favourite.service";
import {Profile} from "../../model/profile";
import {NgForm} from "@angular/forms";


@Component({
  selector: "mm-profile-hashtag-favourites",
  templateUrl: "./profile.hashtag.favourites.component.html"
})
export class ProfileHashtagFavouritesComponent implements OnInit {
  @Input() profile: Profile;
  @Input() updateCallback: Function;

  constructor(private route: ActivatedRoute, private router: Router, private alertService: AlertService, private profileService: ProfileService, private hashtagFavouriteService: HashtagFavouriteService) {
  }

  ngOnInit(): void {
  }

  addFavouriteHashtag(favouriteHashtagForm: NgForm) {
    this.hashtagFavouriteService.addFavouriteHashtag(this.profile, favouriteHashtagForm.form.controls.favouriteHashtag.value).subscribe(
      () => {
        this.alertService.success("Add successful.");
        this.updateCallback();
      },
      this.alertService.defaultError
    );
  }

  removeFavouriteHashtag(favouriteHashtagId) {
    this.hashtagFavouriteService.removeFavouriteHashtag(this.profile, favouriteHashtagId).subscribe(
      () => {
        this.alertService.success("Remove successful.");
        this.updateCallback();
      },
      this.alertService.defaultError
    );
  }
}
