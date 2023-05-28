import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "../model/user";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { USER_ROLES } from "../auth/user-roles";
import { Router } from "@angular/router";
import { AuthClient } from "./auth.client";
import { PERMISSIONS } from "../auth/permissions";


@Injectable()
export class AuthService {

  constructor(private userService: UserService,
              private http: HttpClient,
              private authClient: AuthClient,
              private router: Router) {
  }

  login(credentials): Promise<User> {
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    const body = "username=" + credentials.username + "&password=" + credentials.password;
    return this.http.post<User>("login", body, {headers})
      .toPromise()
      .then((user) => {
        // console.log("AuthService - login - user", user);
        this.userService.user = user;
        return user;
      });
  }

  isAuthenticated(): boolean {
    return !!this.userService.user;
  }

  isAdmin(): boolean {
    return (this.userService.user.role === USER_ROLES.admin);
  }

  logout(): void {
    console.log("authservice logout");
    this.userService.user = null;
    this.http.post<void>("logout", null).subscribe(); // weird, but an empty subscribe is needed. can't log anything within it
    console.log("authservice navigateByUrl");
    this.router.navigateByUrl("/login");
  }

  hasPermission(permission: string): boolean {
    // console.log("hasPermission", permission);
    if (permission === PERMISSIONS.any) {
      return true;
    }

    // console.log("this.userService.user", this.userService.user);

    return this.userService.user.permissions.includes(permission);
  }

  hasAnyPermission(permissions: [string]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }
}
