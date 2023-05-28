import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../service/user.service";
import { UserLoadService } from "../service/user.load.service";
import { NgForm } from "@angular/forms";

@Component({
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loading = false;
  credentials = {username: null, password: null};
  credentialsError = false;
  error = false;

  @ViewChild("loginForm") loginForm: NgForm;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private userLoadService: UserLoadService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    if (!this.authService.isAuthenticated()) {
      this.userLoadService.checkForTwitterLogin().then((loggedIn) => {
        if (loggedIn) {
          this.router.navigate(["profile", this.userService.user.id, "meme-search"]);
        }
      });
    } else {
      this.router.navigate(["profile", this.userService.user.id, "meme-search"]);
    }

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  canSubmit() {
    return this.credentials.username && this.credentials.password && this.loginForm && this.loginForm.form.valid;
  }

  login() {
    this.loading = true;

    const component = this;
    this.authService.login(this.credentials)
      .then(() => {
        if (this.returnUrl === "/") {
          this.router.navigate(["profile", this.userService.user.id, "meme-search"]);
          component.loading = false;
        } else {
          component.loading = false;
          this.router.navigateByUrl(this.returnUrl);
        }
      })
      .catch((response) => {
        if (response.status === 401) {
          component.credentialsError = true;
          component.error = false;
        } else {
          component.error = true;
          component.credentialsError = false;
        }
        component.loading = false;
      });
    return false;
  }

  logout() {
    this.authService.logout();
  }
}
