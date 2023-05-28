import {Directive} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator, Validators} from "@angular/forms";

@Directive({
  selector: '[optionalEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: OptionalEmailDirective, multi: true }
  ]
})
export class OptionalEmailDirective implements Validator {

  constructor() {}

  validate(c: AbstractControl) {
    return c.value? Validators.email(c) : null;
  }
}
