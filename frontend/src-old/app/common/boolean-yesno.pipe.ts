import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'YesNo'})
export class BooleanYesNoPipe implements PipeTransform {

  constructor() {}

  transform(boolean: boolean) {
      return boolean ? "Yes" : "No";
  }
}
