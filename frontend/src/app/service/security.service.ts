import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { isUndefined } from "util";
import {ProfileService} from "./profile.service";
// import { SecureStatus } from "../common/security/secure-status";

@Injectable()
export class SecurityService {

  constructor(private authService: AuthService, private profileService: ProfileService) {
  }

  // hasAll(statuses: string[], provider: Provider, student: Student): boolean {
  //   return statuses.every(status => this.is(status, provider, student));
  // }
  //
  // hasAny(statuses: string[], provider: Provider, student: Student): boolean {
  //   return statuses.some(status => this.is(status, provider, student));
  // }
  //
  // is(status: string, provider: Provider, student: Student): boolean {
  //   let access = false;
  //
  //   switch (status) {
  //     case SecureStatus.school:
  //       access = provider.school;
  //       break;
  //     case SecureStatus.rto:
  //       access = provider.rto;
  //       break;
  //     case SecureStatus.mlp:
  //       access = this.providerService.isMlp(provider, student);
  //       break;
  //     case SecureStatus.userWithProvider:
  //       access = this.authService.userHasOrg(provider.id);
  //       break;
  //     case SecureStatus.activeRegistration:
  //       access = this.providerService.hasActiveRegistration(student, provider);
  //       break;
  //     case SecureStatus.admin:
  //       access = this.authService.userHasAdminRole();
  //       break;
  //     case SecureStatus.newLearner:
  //       access = isUndefined(student) || isUndefined(student.id);
  //       break;
  //     case SecureStatus.hasRegistration:
  //       access = this.providerService.hasRegistration(student, provider);
  //       break;
  //     default:
  //       access = false;
  //       break;
  //   }
  //
  //   return access;
  // }
}
