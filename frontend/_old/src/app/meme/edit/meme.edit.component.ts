import { finalize, skip } from "rxjs/operators";
import { Component, OnInit, ViewChild } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../uiqc/alert/alert.service";
import { MemeService } from "../../service/meme.service";
import { Profile } from "../../model/profile";
import { Meme } from "../../model/meme";
import { MemeCurrentService } from "../../service/meme.current.service";
import { ProfileService } from "../../service/profile.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { MemeDeleteModalComponent } from "../delete-modal/meme.delete.modal.component";
import { Subscription } from "rxjs";
import { MemeFormComponent } from "../form/meme.form.component";

@Component({
  templateUrl: "./meme.edit.component.html"
})
export class MemeEditComponent implements OnInit {
  title = "Edit meme";
  profile: Profile;
  meme: Meme;
  modal: BsModalRef;
  memeCurrentServiceSubscription: Subscription;
  loading: boolean;

  @ViewChild(MemeFormComponent)
  private memeForm: MemeFormComponent;

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              private memeCurrentService: MemeCurrentService,
              private memeService: MemeService,
              private alertService: AlertService,
              private router: Router,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.profile = this.route.parent.parent.snapshot.data["profile"];

    this.route.parent.params.subscribe((params) => {
      this.memeCurrentService.setMemeCurrentById(params["memeId"]);
    });

    this.memeCurrentServiceSubscription = this.memeCurrentService.memeCurrent$.pipe(skip(1)).subscribe((meme) => {
      this.meme = meme;

      // TODO should use a guard
      if (!this.profileService.isOwnProfile(this.profile.id) || this.profile.id !== this.meme.profile.id) {
        this.alertService.warning("Not authorised to edit this meme");
        this.router.navigate(["profile", this.profile.id, "meme", this.meme.id, "view"]);
      }
    });
  }

  update(meme: Meme) {
    this.memeService.memeUpdate(meme).pipe(finalize(() => {
      this.loading = false;
    })).subscribe(
      () => {
        this.alertService.success("Meme has been updated successfully.");
        this.memeService.get(meme.id).subscribe((response) => {
            this.meme = response;
          },
          () => this.alertService.defaultError()
        );
      },
      () => this.alertService.defaultError()
    );
  }

  confirmDelete() {
    this.modal = this.modalService.show(MemeDeleteModalComponent);
    this.modal.content.title = "Confirm delete";
    this.modal.content.modalClosed.subscribe((confirmation) => {
      if (confirmation.proceed) {
        this.deleteMeme(confirmation.deleteFromImgur);
      }
    });
    this.modal.content.focus();
  }

  deleteMeme(deleteFromImgurAlso: boolean) {
    this.memeService.memeDelete(this.meme, deleteFromImgurAlso).subscribe(
      () => {
        this.alertService.success("Meme deleted.");
        this.router.navigate(["profile", this.profile.id, "meme-search"]);
      },
      () => this.alertService.defaultError()
    );
  }
}
