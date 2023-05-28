import { map } from "rxjs/operators";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../service/user.service";
import { UserLoadService } from "../service/user.load.service";
import { AuthService } from "../service/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  /*
  1. if no permissions => return true
  2. if permissions AND user (already) AND has permission => return true
  3. if permissions AND user (already) AND NOT has permission => return false, not authorised
  4. if permissions AND NOT user AND user found (maybe the user hit refresh and we bootstrapped again) AND has permission => return true
  5. if permissions AND NOT user AND NOT user found => return false, session expired
  6. if permissions AND NOT user AND user found AND NOT permission => return false, not authorised
  7. if permissions AND NOT user AND error => return false, session expired
 */
  constructor(private userService: UserService,
              private userLoadService: UserLoadService,
              private authService: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // console.log("next", next);
    // console.log("state", state);

    const permission = next.data["requiredPermission"] as string;
    if (!permission && this.userService.user) {
      return true;
    }

    console.log("canActivate", this.userService.user);

    if (this.userService.user) {
      return this.checkPermission(permission);
    }

    return this.userLoadService.loadUser().pipe(map(user => {
        if (!user) { // || user.username === "dummy"
          return this.navigateToSessionExpired(state);
        } else {
          //
        }
        this.userService.user = user;
        return this.checkPermission(permission);
      },
      () => {
        return this.navigateToSessionExpired(state);
      }));
  }

  private navigateToSessionExpired(state: RouterStateSnapshot) {
    // this.router.navigateByUrl("/session-expired");
    console.log("navigateToSessionExpired");
    this.router.navigate(["/login"], {queryParams: {returnUrl: state.url}});
    return false;
  }

  private checkPermission(permission: string): boolean {
    if (this.authService.hasPermission(permission)) {
      return true;
    }
    console.log("no permission");
    this.router.navigateByUrl("/login");
    return false;
  }

}
