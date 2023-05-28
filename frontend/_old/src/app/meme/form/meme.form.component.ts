import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../uiqc/alert/alert.service";
import { Profile } from "../../model/profile";
import { Meme } from "../../model/meme";
import { TagService } from "../../service/tag.service";
import { ImgurUploader, ImgurUploadOptions } from "../../service/imgur.uploader";
import { ApplicationConfigService } from "../../service/application-config.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-mm-meme-form",
  styleUrls: ["./meme.form.component.scss"],
  templateUrl: "./meme.form.component.html"
})
export class MemeFormComponent implements OnInit {
  @Input() formTitle: string;
  @Input() profile: Profile;
  @Input() meme: Meme;
  @Input() submitText: string;
  @Input() loading: boolean;

  @Output() deleteHandler = new EventEmitter();
  @Output() submitHandler = new EventEmitter<Meme>();
  @Output() closeHandler = new EventEmitter();

  @ViewChild("memeForm") memeForm;

  uploading: boolean;
  file: File; // File is specialisation of Blob

  constructor(private route: ActivatedRoute,
              private alertService: AlertService,
              private router: Router,
              private tagService: TagService,
              private imgurUploader: ImgurUploader,
              private applicationConfigService: ApplicationConfigService) {
  }

  ngOnInit(): void {
  }

  upload(event) {
    this.uploading = true;
    this.file = event.target.files[0];

    const options: ImgurUploadOptions = {
      clientId: this.applicationConfigService.config.imgurClientId, // "Client-ID " + APPLICATION.imgurClientId
      imageData: this.file,               // should be blob
      title: ""                           // optional
    };

    this.imgurUploader.upload(options).pipe(finalize(() => {
      this.uploading = false;
    })).subscribe((imgurUploadResponse) => {
      this.meme.url = imgurUploadResponse.data.link;
      this.meme.deleteLink = "https://api.imgur.com/3/image/" + imgurUploadResponse.data.deleteHash;

      if (!this.meme.title) {
        const filename = this.file.name;
        if (filename.lastIndexOf(".") > 0) {
          this.meme.title = filename.substring(0, filename.lastIndexOf("."));
        }
      }
    }, () => {
      this.alertService.defaultError();
    });
  }

  submit() {
    this.loading = true;
    this.submitHandler.emit(this.meme);
  }

  clear() {
    this.meme = new Meme();
  }
}
