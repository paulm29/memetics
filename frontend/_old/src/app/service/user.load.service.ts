import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { UserService } from "./user.service";

/*
this is in a separate service to user service to prevent potential issues caused by circular dependency injection of HttpClient when using HTTP interceptors
 */
@Injectable()
export class UserLoadService {

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  loadUser(): Observable<User> {
    console.log("UserLoadService - loadUser");
    return this.http.get<User>("user").pipe(map(user => {
      if (!user || user.username === "dummy") {
        return null;
      }
      return user;
    }));
  }

  /*
  can't assume that we DON'T have a user on login page, as they may have logged in via Twitter or Facebook
 */
  checkForTwitterLogin() {
    return this.loadUser().toPromise()
      .then((user) => {
        if (!user || user.username === "dummy") {
          return false;
        }

        this.userService.user = user;
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
