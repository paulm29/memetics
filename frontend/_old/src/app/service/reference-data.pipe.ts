import { Pipe, PipeTransform } from "@angular/core";
import { ReferenceDataService } from "./reference.data.service";

@Pipe({name: "referenceDataDescription"})
export class ReferenceDataPipe implements PipeTransform {

  constructor(private referenceDataService: ReferenceDataService) {
  }

  transform(code: string, type: string) {
    return this.referenceDataService.description(type, code);
  }
}
