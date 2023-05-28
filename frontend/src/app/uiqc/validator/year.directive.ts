import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import { Directive } from "@angular/core";

@Directive({
  selector: "[qcYear][ngModel]",
  providers: [{provide: NG_VALIDATORS, useExisting: YearDirective, multi: true}]
})
export class YearDirective implements Validator {
  validate(control: AbstractControl): {[key: string]: any} {
    if (!control.value) {
      return null;
    }
    const valid = /^[0-9]{4}$/.test(control.value);
    return !valid ? {"year": {value: control.value}} : null;
  }
}
