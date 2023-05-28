import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AdminService } from "../service/admin.service";
import { AlertService } from "../uiqc/alert/alert.service";
import { ApplicationConfigService } from "../service/application-config.service";

@Component({
  templateUrl: "./admin.component.html"
})
export class AdminComponent implements OnInit {
  imgurCredits;
  twitterRateLimit;
  title = "Admin";

  constructor(private router: Router, private adminService: AdminService,
              private alertService: AlertService, private applicationConfigService: ApplicationConfigService) {
  }

  ngOnInit(): void {
  }

  backup() {
    this.adminService.imagesBackup().subscribe(() => this.alertService.success("Backup done."));
  }

  checkImgurCredits() {
    const API_KEY = "Client-ID " + this.applicationConfigService.config.imgurClientId;
    this.adminService.imgurCreditsGet(API_KEY).subscribe((response) => {
      this.imgurCredits = response;
    });
  }

  checkTwitterRateLimit() {
    this.adminService.twitterRateLimitGet().subscribe((response) => {
      this.twitterRateLimit = response;
      console.log("this.twitterRateLimit", this.twitterRateLimit);
    }, (error) => {
      console.log(error);
    });
  }
}
