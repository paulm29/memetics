import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Tag } from "../../../model/tag";
import { TagService } from "../../../service/tag.service";
import { AlertService } from "../../../uiqc/alert/alert.service";

@Component({
  selector: "app-meme-tags-typeahead",
  templateUrl: "./meme.tags.typeahead.component.html"
})
export class MemeTagsTypeaheadComponent implements OnInit {
  @Input() selectedTags: Tag[];
  @Output() selectedTagsChange = new EventEmitter<Tag[]>();

  tagInputText: string;
  selectedTag: Tag;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  allTags: Tag[];

  constructor(private tagService: TagService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.getAllTags();
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
    this.selectedTags.push(this.selectedTag);
    this.selectedTagsChange.emit(this.selectedTags);
    this.tagInputText = "";
  }

  onInputChange() {
    this.selectedTag = null;
  }

  getTags() {
    if (this.tagInputText) {
      return this.allTags
        .filter((tag) => {
          return !this.selectedTags.find(t => t.name.toLowerCase() === tag.name.toLowerCase());
        })
        .filter(sub => sub.name.toLowerCase().includes(this.tagInputText.toLowerCase()));
    }
    return [];
  }

  deleteTag(tagId: number) {
    this.selectedTags = this.selectedTags.filter((tag) => {
      return tag.id !== tagId;
    });
    this.selectedTagsChange.emit(this.selectedTags);

    this.tagInputText = "";
  }
}
