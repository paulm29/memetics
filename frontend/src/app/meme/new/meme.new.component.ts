import { Component, OnInit, ViewChild } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../uiqc/alert/alert.service";
import { MemeService } from "../../service/meme.service";
import { Profile } from "../../model/profile";
import { Meme } from "../../model/meme";
import { MemeFormComponent } from "../form/meme.form.component";

@Component({
  templateUrl: "./meme.new.component.html"
})
export class MemeNewComponent implements OnInit {
  profile: Profile;
  meme: Meme = new Meme();
  loading: boolean;

  @ViewChild(MemeFormComponent) private memeForm: MemeFormComponent;

  constructor(private route: ActivatedRoute,
              private memeService: MemeService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.snapshot.data["profile"];
  }

  memeCreate = (meme) => {
    this.memeService.memeCreate(meme, this.profile).subscribe((response) => {
        this.alertService.success("Meme created successfully");
        this.router.navigate(["profile", this.profile.id, "meme", response.id, "view"]);
      },
      () => {
        this.alertService.defaultError();
      }
    );
  }
}
