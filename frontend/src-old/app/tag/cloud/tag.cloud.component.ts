import {Component, Input, OnInit} from "@angular/core";

import {ActivatedRoute, Router} from "@angular/router";
import {CloudData, CloudOptions} from "../../tag-cloud/tag-cloud.interfaces";

// https://www.npmjs.com/package/angular-tag-cloud-module
@Component({
  selector: "app-mm-tag-cloud",
  templateUrl: "./tag.cloud.component.html"
})
export class TagCloudComponent implements OnInit {
  @Input("cloudData") cloudData:Array<CloudData> = [];

  // data: Array<CloudData> = [
  //   {text: "Weight-10-link-color", weight: 10, link: "https://google.com", color: "#ffaaee"},
  //   {text: "Weight-10-link", weight: 10, link: "https://google.com"},
  //   // ...
  // ];
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width: 400,
    height: 250,
    overflow: false,
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
