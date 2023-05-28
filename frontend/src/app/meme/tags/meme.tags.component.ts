import { Component, Input, OnInit } from "@angular/core";
import { Meme } from "../../model/meme";
import { Tag } from "../../model/tag";
import { TagService } from "../../service/tag.service";
import { AlertService } from "../../uiqc/alert/alert.service";

@Component({
  selector: "app-mm-meme-tags",
  templateUrl: "./meme.tags.component.html"
})
export class MemeTagsComponent implements OnInit {
  @Input() meme: Meme;
  @Input() addNew: boolean;
  tagInputText: string;
  selectedTag: Tag;
  tags: Tag[];
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  allTags: Tag[];

  constructor(private tagService: TagService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.getAllTags();

    this.tags = this.meme.tags;
  }

  getAllTags() {
    this.tagService.getAll().subscribe(
      (tags) => {
        this.allTags = tags;
      },
      () => this.alertService.defaultError());
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  onSelect(event) {
    this.selectedTag = event.item;
    this.meme.tags.push(this.selectedTag);
    this.tagInputText = "";
  }

  onInputChange() {
    this.selectedTag = null;
  }

  getTags() {
    if (this.tagInputText) {
      return this.allTags
        .filter((tag) => {
          return !this.meme.tags.find(t => t.name.toLowerCase() === tag.name.toLowerCase());
        })
        .filter(sub => sub.name.toLowerCase().includes(this.tagInputText.toLowerCase()));
    }
    return [];
  }

  addNewTag() {
    const tag = new Tag();
    tag.name = this.tagInputText;
    this.tagService.tagCreate(tag).subscribe((newTag) => {
      console.log("newTag");
      this.meme.tags.push(newTag);
      this.tagInputText = "";
      this.typeaheadNoResults = false;
    });
  }

  deleteTag(tagId: number) {
    this.meme.tags = this.meme.tags.filter((tag) => {
      return tag.id !== tagId;
    });
    this.tagInputText = "";
  }
}
