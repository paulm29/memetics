import { Injectable } from "@angular/core";
import { Code } from "../model/code";
import { MemeticsClient } from "./memetics.client";
import { ReferenceData } from "../model/reference-data";

@Injectable()
export class ReferenceDataService {
  referenceData: ReferenceData;

  constructor(private memeticsClient: MemeticsClient) {
  }

  init() {
    return this.memeticsClient.referenceData().toPromise().then((response) => {
      this.referenceData = response;
      return this.referenceData;
    });
  }

  get() {
    return this.referenceData;
  }

  description(type: string, code: string) {
    const refData = this.referenceData[type].find((element: Code) => {
      return element.code === code;
    });
    if (!refData) {
      return "";
    }
    return refData.description;
  }

  isAustralianCountryCode(code: string) {
    return this.description("countries", code).toUpperCase() === "AUSTRALIA";
  }
}
