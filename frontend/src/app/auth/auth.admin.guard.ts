import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../service/user.service";
import { UserLoadService } from "../service/user.load.service";
import { AuthService } from "../service/auth.service";

@Injectable()
export class AuthAdminGuard implements CanActivate {

  constructor(private userService: UserService,
              private userLoadService: UserLoadService,
              private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.userService.user && this.authService.isAdmin()) {
      return true;
    }

    return this.userLoadService.loadUser().toPromise()
      .then((user) => {
        this.userService.user = user;
        return true;
      })
      .catch(() => {
        this.router.navigate(["/login"], {queryParams: {returnUrl: state.url}});
        return false;
      });
  }

}
