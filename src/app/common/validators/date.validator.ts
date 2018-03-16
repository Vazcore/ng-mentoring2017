import { AbstractControl } from "@angular/forms";

export class DateValidator {
  static isDateValid(control: AbstractControl): {[key: string]: boolean} {
    let regexp = new RegExp("^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$");
    return regexp.test(control.value) ? null : {'invalidDate': true};
  }
}