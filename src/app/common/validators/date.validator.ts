import { AbstractControl } from "@angular/forms";

export class DateValidator {
  static isDateValid(control: AbstractControl): {[key: string]: boolean} {
    let regexp = new RegExp(/^(0?[1-9][1-9]?)[\/\-](0?[1-9][1-9]?)[\/\-]\d{4}$/);
    return regexp.test(control.value) ? null : {'invalidDate': true};
  }
}