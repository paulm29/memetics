import { Component, Input, OnInit } from "@angular/core";
import { Profile } from "../../model/profile";
import { TagStat } from "../../model/tag.stat";
import { Tag } from "../../model/tag";

@Component({
  selector: "app-mm-tag-link",
  templateUrl: "./tag.link.component.html"
})
export class TagLinkComponent implements OnInit {
  @Input() profile: Profile;
  @Input() tagStat?: TagStat;
  @Input() tag?: Tag;
  @Input() route: string;
  link: any[];
  text: string;
  queryParams: any;

  ngOnInit(): void {
    if (this.tag) {
      this.link = ["/profile", this.profile.id, this.route];
      this.text = this.tag.name;
      this.queryParams = {tags: this.tag.name};
    } else if (this.tagStat) {
      this.link = ["/profile", this.profile.id, this.route];
      this.text = this.tagStat.text;
      this.queryParams = {tags: this.tagStat.text};
    }

  }

}
