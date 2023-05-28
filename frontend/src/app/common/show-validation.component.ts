import { AfterContentInit, Component, ContentChild, ElementRef, HostBinding, Input } from "@angular/core";
import { NgModel } from "@angular/forms";
import { ValidationMessage } from "./validation-message";
import { VALIDATION_MESSAGE_DEFAULTS } from "./validation-message-defaults";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-show-validation,[appShowValidation]",
  template: `
    <ng-content></ng-content>
    <div class="{{appShowValidation}}" *ngIf="hasErrors">
      <span class="text-danger" *ngFor='let message of messages'>{{message}}</span>
    </div>
  `
})
export class ShowValidationComponent implements AfterContentInit {
  @ContentChild(NgModel)
  model: NgModel;

  label: string;

  validationMessages: ValidationMessage[];

  @Input("appShowValidation") appShowValidation: string;

  @HostBinding("class.has-error") get hasErrors() {
    // console.log("this.model.touched", this.model.value, this.model.touched);
    if (this.model && (this.model.touched || !isNullOrUndefined(this.model.value))) {
      return this.model.invalid;
    }
    return false;
  }

  constructor(private elementRef: ElementRef) {
  }

  ngAfterContentInit(): void {
    this.validationMessages = VALIDATION_MESSAGE_DEFAULTS;
    const labelElement = this.elementRef.nativeElement.querySelector(".control-label");
    this.label = labelElement && labelElement.textContent ? labelElement.textContent.trim() : "This field";
  }

  get messages(): string[] {
    const messages = [];
    if (this.hasErrors) {
      Object.keys(this.model.errors).forEach(key => {
        const error = this.validationMessages.find(msg => msg.key === key);
        // console.log("error", error);
        if (error) {
          // console.log("pushing", error.format(this.label, this.model.errors[key]));
          messages.push(error.format(this.label, this.model.errors[key]));
        }
      });
    }
    return messages;
  }

}
