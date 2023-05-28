import { Component, Input, OnInit } from "@angular/core";
import { Profile } from "../../model/profile";
import { Meme } from "../../model/meme";
import { MemeService } from "../../service/meme.service";

@Component({
  selector: "app-meme-manage",
  templateUrl: "./meme.manage.component.html"
})
export class MemeManageComponent implements OnInit {
  @Input() profile: Profile;
  @Input() meme: Meme;

  constructor(private memeService: MemeService) {
  }

  ngOnInit(): void {
    // console.log("MemeToolbarComponent");
  }

  incrementUsageCount() {
    this.memeService.incrementUsageCount(this.meme).subscribe(this.memeUpdatedCallback);
  }

  decrementUsageCount() {
    this.memeService.decrementUsageCount(this.meme).subscribe(this.memeUpdatedCallback);
  }

  markDuplicate(meme) {
    this.memeService.memeUpdate(meme).toPromise().then(this.memeUpdatedCallback);
  }

  memeUpdatedCallback() {
    this.memeService.get(this.meme.id).subscribe((response) => {
      this.meme = response;
    });
  }

}
