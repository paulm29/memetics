import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Profile} from "../model/profile";
import {Meme} from "../model/meme";
import {MemeCurrentService} from "../service/meme.current.service";

@Component({
  template: `
    <router-outlet></router-outlet>
  `
})
export class MemeBaseComponent implements OnInit {
  profile: Profile;
  meme: Meme;

  constructor(private route: ActivatedRoute, private router: Router,
              private memeCurrentService: MemeCurrentService) {
  }

  ngOnInit(): void {
    // console.log("MemeBaseComponent ngOnit");

    this.profile = this.route.parent.snapshot.data["profile"];

    this.route.params.subscribe((params) => {
      this.memeCurrentService.setMemeCurrentById(params["memeId"]);
    });

    this.memeCurrentService.memeCurrent$.subscribe((meme) => {
      this.meme = meme;
    });
  }

  // don't use, but keeping as curious
  isRouteActive(instruction): boolean {
    return this.router.isActive(this.router.createUrlTree(instruction), false);
  }
}
