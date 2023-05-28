import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Profile } from "../model/profile";
import { AlertService } from "../uiqc/alert/alert.service";
import { User } from "../model/user";
import { RegistrationService } from "../service/registration.service";
import { finalize } from "rxjs/operators";

@Component({
  templateUrl: "./registration.component.html"
})
export class RegistrationComponent implements OnInit {
  profile: Profile = new Profile();
  duplicateEmailCheckLoading: boolean;
  isDuplicateEmail: boolean;
  duplicateNicknameCheckLoading: boolean;
  isDuplicateNickname: boolean;

  @ViewChild("registerForm") registerForm: HTMLFormElement;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService,
              private alertService: AlertService,
              private registrationService: RegistrationService) {
  }

  ngOnInit(): void {
    this.prepopulate();
  }

  prepopulate() {
    this.registrationService.prepopulateRegistrationFromSocial().subscribe((response) => {
        this.profile = Object.assign(response);
        if (this.profile.nickname) {
          this.duplicateNicknameCheck();
        }
      },
      () => this.alertService.defaultError());
  }

  cancel() {
    this.router.navigateByUrl("/login");
  }

  duplicateEmailCheck() {
    // if (!this.registerForm.controls["email"].valid) {
    //   this.isDuplicateEmail = false;
    //   return;
    // }

    this.registrationService.emailCheck(this.profile.email).pipe(finalize(() => {
      this.duplicateEmailCheckLoading = false;
    })).subscribe((response) => {
        this.isDuplicateEmail = (response === "true");
        if (this.isDuplicateEmail) {
          console.log("set errors true");
          this.registerForm.controls.email.setErrors("duplicate", "Duplicate email");
        } else {
          console.log("set errors false");
          this.registerForm.controls.email.setErrors(null);
        }
      },
      (error) => {
        console.error(error);
        this.alertService.error("An error occurred while performing duplicate email check.");
      });
  }

  duplicateNicknameCheck() {
    this.registrationService.nicknameCheck(this.profile.nickname).pipe(finalize(() => {
      this.duplicateNicknameCheckLoading = false;
    })).subscribe((response) => {
        this.isDuplicateNickname = (response === "true");
        if (this.isDuplicateNickname) {
          this.registerForm.controls.nickname.setErrors("nickname", "Duplicate nickname");
        } else {
          this.registerForm.controls.nickname.setErrors(null);
        }
      },
      (error) => {
        console.error(error);
        this.alertService.error("An error occurred while performing duplicate nickname check.");
      });
  }

  register(): void {
    this.registrationService.register(this.profile).subscribe((response) => {
        this.userService.user = Object.assign(new User(), response); // TODO smell
        this.router.navigate(["profile", this.userService.user.id, "memeSearch"]);
      },
      this.alertService.defaultError);
  }

  passwordsDontMatch(): boolean {
    return this.profile.password && this.profile.passwordVerification && this.profile.password.length > 0 && this.profile.passwordVerification.length > 0 && this.profile.password !== this.profile.passwordVerification;
    // return this.registerForm && this.registerForm.form.controls.password && (this.registerForm.form.controls.password.length >= 1)
    //       && this.registerForm.form.controls.passwordVerification && (this.registerForm.form.controls.passwordVerification.length >= 1)
    //       && (this.registerForm.form.controls.password !== this.registerForm.form.controls.passwordVerification);
  }

  isFormValid() {
    return this.registerForm.valid && this.registerForm.dirty && !this.passwordsDontMatch();
  }
}
