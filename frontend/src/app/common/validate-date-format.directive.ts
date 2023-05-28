import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from "@angular/forms";

export function dateFormatValidator(): ValidatorFn {
  return (c: AbstractControl): {[key: string]: any} => {
    let dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
    if (!c.value || c.value.match(dateRegex)) {
      return null;
    }
    return {date: c.value.match(dateRegex)};
  }
}

@Directive({
  selector: '[qcDateFormat][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: DateFormatDirective, multi: true}
  ]
})
export class DateFormatDirective implements Validator {

  constructor() {
  }

  validate(c: AbstractControl) {
    return dateFormatValidator()(c);
  }
}
