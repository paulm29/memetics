import { Component, Input, OnInit } from "@angular/core";
import { Profile } from "../../model/profile";
import { Meme } from "../../model/meme";

@Component({
  selector: "app-mm-meme-toolbar",
  templateUrl: "./meme.toolbar.component.html"
})
export class MemeToolbarComponent implements OnInit {
  @Input() profile: Profile;
  @Input() meme: Meme;

  ngOnInit(): void {
    // console.log("MemeToolbarComponent");
  }
}
