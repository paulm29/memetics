import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { ReferenceData } from "../model/reference-data";
import { ReferenceDataService } from "./reference.data.service";
import { Observable } from "rxjs";

@Injectable()
export class ReferenceDataResolver implements Resolve<ReferenceData> {

  constructor(private referenceDataService: ReferenceDataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReferenceData> | Promise<ReferenceData> | ReferenceData {
    return this.referenceDataService.init();
  }
}
