import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MemeticsClient } from "./memetics.client";
import { Profile } from "../model/profile";
import { ProfileSearchCriteria } from "../model/profile.search.criteria";
import { AuthClient } from "./auth.client";

@Injectable()
export class RegistrationService {

  constructor(private memeticsClient: MemeticsClient, private authClient: AuthClient) {
  }

  search(criteria: ProfileSearchCriteria): Observable<Profile[]> {
    return this.memeticsClient.registrationGetAll(criteria);
  }

  prepopulateRegistrationFromSocial(): Observable<Profile> {
    return this.authClient.prepopulateRegistrationFromSocial();
  }

  register(registration): Observable<Profile> {
    return this.authClient.register(registration);
  }

  emailCheck(emailAddress: string) {
    return this.authClient.emailCheck(emailAddress);
  }

  nicknameCheck(nickname: string) {
    return this.authClient.nicknameCheck(nickname);
  }
}
