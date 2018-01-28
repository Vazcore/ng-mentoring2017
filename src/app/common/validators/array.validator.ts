import { AbstractControl } from "@angular/forms";

export class ArrayValidator {
  static isArrayNotEmpty(control: AbstractControl): {[key: string]: boolean} {
    return Array.isArray(control.value) && control.value.length > 0 ? null : {'invalidArray': true};
  }
}