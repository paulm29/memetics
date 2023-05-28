import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProfileService } from "./profile.service";
import { Profile } from "../model/profile";


@Injectable()
export class ProfileResolver implements Resolve<Profile> {

  constructor(private profileService: ProfileService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile> | Promise<Profile> | Profile {
    // console.log("ProfileResolver");

    const profileId = route.params["profileId"];
    // console.log("profileId");
    // console.log(profileId);
    return this.profileService.get(profileId);
  }

}
