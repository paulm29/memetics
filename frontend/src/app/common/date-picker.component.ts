import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from "@angular/core";
import { NgForm, NgModel, ValidatorFn, Validators } from "@angular/forms";
import { DatePickerDirective, IDatePickerConfig } from "ng2-date-picker";
import {dateFormatValidator} from "./validate-date-format.directive";

@Component({
  selector: "app-date-picker",
  exportAs: "DatePickerComponent",
  template: `
    <span class="input-group">
      <input class="form-control {{class}}"
             placeholder="DD/MM/YYYY"
             id="{{id}}"
             name="{{name}}"
             #appDatePicker="dpDayPicker"
             [ngModel]="toDatePickerString(model)"
             [dpDayPicker]="datePickerConfig"
             (ngModelChange)="dateChanged($event)"
             (open)="onDatePickerOpen()"
             (close)="onDatePickerClose()"
             (blur)="onDatePickerBlur()"
             qcDateFormat
             [required]="required"
             [disabled]="disabled"
      >
      <span class="input-group-btn">
        <button type="button" class="btn btn-secondary"
                (click)="toggleDatePickerOpened()"><i
          class="glyphicon glyphicon-calendar"></i></button>
      </span>
    </span>
  `
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  @Input() class?: string;
  @Input() id: string;
  @Input() name: string;
  @Input() required?: boolean;
  @Input() parentForm: NgForm;
  @Input() model: string;
  @Input() validators?: ValidatorFn[];
  @Input() minDate?;
  @Input() maxDate?;
  @Input() disabled?;

  @Output() modelChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter();

  @ViewChild("appDatePicker") datePicker: DatePickerDirective;
  @ViewChildren(NgModel) controls: QueryList<NgModel>;

  datePickerConfig: IDatePickerConfig;
  datePickerOpened: boolean;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.datePickerConfig = {
      format: "DD/MM/YYYY",
      showMultipleYearsNavigation: true,
    };
    if (this.minDate) {
      this.datePickerConfig.min = this.toDatePickerString(this.minDate);
    }
    if (this.maxDate) {
      this.datePickerConfig.max = this.toDatePickerString(this.maxDate);
    }
  }

  ngAfterViewInit(): void {
    this.controls.forEach((control: NgModel) => {
      this.parentForm.addControl(control);
    });

    if (this.validators) {
      this.setValidators(this.validators);
      this.cdRef.detectChanges();
    }
  }

  setValidators(inputVals?: ValidatorFn[]) {
    let vals = [dateFormatValidator()];
    if (this.required) {
      vals.push(Validators.required);
    }
    if (inputVals) {
      vals = vals.concat(inputVals);
    }
    let datePicker = this.controls.find(dp => dp.name === this.name);
    datePicker.control.setValidators(vals);
    datePicker.control.updateValueAndValidity();
  }

  setMinDate(dateString) {
    this.datePickerConfig = {...this.datePickerConfig};
    this.datePickerConfig.min = this.toDatePickerString(dateString);
  }

  getMinDate() {
    return this.fromDatePickerString(this.datePickerConfig.min);
  }

  setMaxDate(dateString) {
    this.datePickerConfig = {...this.datePickerConfig};
    this.datePickerConfig.max = this.toDatePickerString(dateString);
  }

  getMaxDate() {
    return this.fromDatePickerString(this.datePickerConfig.max);
  }

  dateChanged(newValue) {
    let formattedString = this.fromDatePickerString(newValue);
    this.model = formattedString;
    this.modelChange.emit(formattedString);
  }

  onDatePickerBlur() {
    this.blur.emit();
  }

  onDatePickerOpen() {
    this.datePickerOpened = true;
  }

  onDatePickerClose() {
    this.datePickerOpened = false;
  }

  toggleDatePickerOpened(state?: boolean) {
    if (state === undefined) {
      this.datePickerOpened = !this.datePickerOpened;
    } else {
      this.datePickerOpened = state;
    }
    if (this.datePickerOpened) {
      this.datePicker.api.open();
    } else {
      this.datePicker.api.close();
    }
  }

  // YYYY-MM-DD => DD/MM/YYYY
  toDatePickerString(dateString) {
    if (dateString) {
      return dateString.split("-").reverse().join("/");
    }
    return;
  }

  // DD/MM/YYYY => YYYY-MM-DD
  fromDatePickerString(dateString) {
    if (dateString) {
      return dateString.split("/").reverse().join("-");
    }
    return;
  }
}
