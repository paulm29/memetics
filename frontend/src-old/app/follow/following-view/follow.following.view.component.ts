import {BsModalService} from "ngx-bootstrap";
import {Component, Input, OnInit} from "@angular/core";
import {AlertService} from "../../uiqc/alert/alert.service";
import {CommentService} from "../../service/comment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Profile} from "../../model/profile";
import {ProfileService} from "../../service/profile.service";

@Component({
  templateUrl: "./follow.following.view.component.html"
})
export class FollowingViewComponent implements OnInit {
  title;
  @Input() profile: Profile;
  datasource: Profile[];

  constructor(private router: Router, private alertService: AlertService, private profileService: ProfileService) {
  }

  ngOnInit(): void {
  }

  // ctrl.datasource.get = function (index, count, success) {
  //     const result = [];
  //     for (let i = index; i < index + count; i++) {
  //         if(i < 0 || i >= ctrl.profile.following.length) {
  //             continue;
  //         }
  //         const item = ctrl.profile.following[i];
  //         result.push(item);
  //     }
  //     success(result);
  // };
}

