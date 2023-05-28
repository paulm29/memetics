import { EventEmitter, Injectable } from "@angular/core";
import { User } from "../model/user";

@Injectable()
export class UserService {
  _user: User;
  public userAdded$: EventEmitter<User> = new EventEmitter<User>();

  constructor() {
  }

  set user(user: User) {
    this._user = user;
    this.userAdded$.emit(user);
  }

  get user(): User {
    return this._user;
  }
}
