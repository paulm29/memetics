import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Profile } from "../model/profile";
import { MemeticsClient } from "./memetics.client";

@Injectable()
export class AuthClient {

  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<Object> {
    return this.http.post("login", (credentials), {});
  }

  logout(): Observable<Object> {
    return this.http.post("logout", {});
  }

  prepopulateRegistrationFromSocial(): Observable<Profile> {
    return this.http.get<Profile>("register");
  }

  register(registration): Observable<Profile> {
    return this.http.post<Profile>("register", registration);
  }

  emailCheck(emailAddress: string) {
    return this.http.get("email-check", {params: {emailAddress: emailAddress}, responseType: "text"});
  }

  nicknameCheck(nickname: string) {
    return this.http.get("nickname-check", {params: {nickname: nickname}, responseType: "text"});
  }
}
