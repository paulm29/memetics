import { inject, TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { AuthClient } from "./auth.client";

describe("AuthService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: UserService, useValue: {user: {username: "test"}}},
        {provide: AuthClient, useValue: {}},
        {provide: HttpClient, useValue: {}},
        {provide: Router, useValue: {}}
      ]
    });
  });

  it("should not be authenticated when no user", inject([AuthService, UserService], (service: AuthService, userService: UserService) => {
    userService.user = null;

    expect(service.isAuthenticated()).toBe(false);
  }));

  it("should be authenticated when user", inject([AuthService], (service: AuthService) => {
    expect(service.isAuthenticated()).toBe(true);
  }));
});
