import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";
import { ActivatedRoute } from "@angular/router";
import { Profile } from "../model/profile";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  profile: Profile;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.userService.userAdded$.subscribe((user) => {
      this.profile = user;
      this.ref.detectChanges();
    });
  }

  logout() {
    this.authService.logout();
  }

  //
  //   if (this.authService.isAuthenticated()) {
  //     this.route.data.subscribe((data: { currentProvider: Provider }) => {
  //       this.currentProvider = data.currentProvider;
  //       this.bottomLinks = this.navLeft().concat(this.navRight()) as any;
  //     });
  //   }
  // }
  //


}
