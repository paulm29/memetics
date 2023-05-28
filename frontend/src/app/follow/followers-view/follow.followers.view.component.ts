import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Component, Input, OnInit} from "@angular/core";
import {AlertService} from "../../uiqc/alert/alert.service";
import {CommentService} from "../../service/comment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Profile} from "../../model/profile";
import {ProfileService} from "../../service/profile.service";
import {Comment} from "../../model/comment";

@Component({
  templateUrl: "./follow.followers.view.component.html"
})
export class FollowersViewComponent implements OnInit {
  title: string = "Your followers";
  @Input() profile: Profile;
  datasource;

  constructor(private router: Router, private modalService: BsModalService, private route: ActivatedRoute, private commentService: CommentService, private alertService: AlertService, private profileService: ProfileService) {
  }

  ngOnInit(): void {
  }


    // ctrl.datasource.get = function (index, count, success) {
    //     const result = [];
    //     for (let i = index; i < index + count; i++) {
    //         if(i < 0 || i >= ctrl.profile.followers.length) {
    //             continue;
    //         }
    //         const item = ctrl.profile.followers[i];
    //         result.push(item);
    //     }
    //     success(result);
    // };
}

